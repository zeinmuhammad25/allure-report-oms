import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(60000);
test.describe.serial("Ordering Dine In Hold Menu", () => {
    const tags = "@smokeTest @oms @orderingDineIn @holdMenu ";

    const selectMenuBiasa = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const selectMultipleMenuBiasa = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
        await paymentV2.closePopUpPaymentSuccessFul();
    };


    test.beforeEach(async ({terminalID, signPin, tableList, order, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0205226] Validate Logic when User can Hold menu before Save Order",
            "[TC_0205234] Validate Logic when User cannot Hold/Hold all and/or Fire/Fire all the menu while not having access"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            if (test.info().title === testWithAuthentication[0]) {
                await order.activateKitchenFireManagement();
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
                await sideNavBar.gotoPageTools();
                await sideNavBar.selectStation("KASIR");
                await sideNavBar.gotoPageTableList();

            } else if ([
                testWithAuthentication[1]
            ].includes(test.info().title)) {
                await order.notActivateKitchenFireManagement();
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
                await sideNavBar.gotoPageTools();
                await sideNavBar.selectStation("KASIR");
                await sideNavBar.gotoPageTableList();

            }
        } else {
            await tableList.goHere();
        }
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205226] Validate Logic when User can Hold menu before Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMenuBiasa(order);
                await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205227] Validate Logic when User can Hold all menu before Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMultipleMenuBiasa(order,3,4,5);
                await order.holdAllMenu();
                await order.confirmationCloseTable("Yes");
                await order.saveOrder();
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205228] Validate Logic when User can Fire menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMenuBiasa(order);
                await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.fireMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205229] Validate Logic when User can Fire all menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMultipleMenuBiasa(order, 3, 4, 5);
                await order.holdAllMenu();
                await order.confirmationCloseTable("Yes");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.fireAllMenu();
                await order.confirmationCloseTable("Yes");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205230] Validate Logic when User cannot Hold menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, paymentV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMenuBiasa(order);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.holdMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205231] Validate Logic when User cannot Hold all menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, paymentV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMultipleMenuBiasa(order, 3, 4, 5);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.holdAllMenuButtonNotDisplayed();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205232] Validate Logic when User cannot Fire menu before user Hold and Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMenuBiasa(order);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.fireMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205233] Validate Logic when User cannot Fire all before user Hold and Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await selectMultipleMenuBiasa(order, 4, 4, 4);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.fireAllMenuButtonNotDisplayed();
                await order.saveOrder();
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205234] Validate Logic when User cannot Hold/Hold all and/or Fire/Fire all the menu while not having access",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.holdAllMenuButtonNotDisplayed();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.fireAllMenuButtonNotDisplayed();
            await order.saveOrder();
        }
    );

    test("[TC_0205235] Validate Logic when User can check table info for Holded menu that already ordered in menu Table List",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await order.tableInfo();
            await order.detailInfoHoldTable("SR 1");
            await order.validateMenuInHoldTable("SR 1", MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205236] Validate Logic when User cannot proceed to payment before Fire the menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.expectDisabledPayment();
            await order.saveOrder();
        }
    );

    test("[TC_0205237] Validate Logic when User cannot proceed to payment before Fire All the menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.expectDisabledPayment();
            await order.saveOrder();
        }
    );

});
