import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Ordering Dine In Move Table", () => {
    const tags = "@smokeTest @oms @orderingDineIn @moveTable ";

    const orderSingleMenu = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };

    const salesModeInclusive = async (bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode("AT INCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
        await paymentV2.closePopUpPaymentSuccessFul()
    };

    test.beforeEach(async ({terminalID, signPin, sideNavBar}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
        await sideNavBar.gotoPageTools();
        await sideNavBar.selectStation("KASIR");
        await sideNavBar.gotoPageTableList();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205169] Validate Logic when User can Move Table to the other table",
        async ({order, tableList, bookOrder, moveTable, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, moveTable, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 3, 2, 2);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.moveTable();
                await moveTable.autoMoveTable();
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, moveTable, paymentV2}, testInfo);
        });

    test("[TC_0205170] Validate Logic when User can Move Table to the other table with the same Table Section",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, moveTable, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await salesModeInclusive(bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 3, 2, 2);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.moveTable();
                await moveTable.autoMoveTable();
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, moveTable, paymentV2}, testInfo);
        });

    test("[TC_0205171] Validate Logic when User can Move Table to the other table with different Table Section",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, moveTable, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 3, 2, 2);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.moveTable();
                await moveTable.selectTableAndApplyInSmokingRoom();
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, moveTable, paymentV2}, testInfo);
        });

    test("[TC_0205077] Validate Logic when User cannot Move Table to own child linked table",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, moveTable, linkTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel(Table.acRoom.ac1.name);
        });

    test("[TC_0205078] Validate Logic when User cannot Move Table to own child merged table",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, moveTable, mergeTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectRoom(Table.acRoom.ac2.name);
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel(Table.acRoom.ac2.name);
        });

    test("[TC_0205079] Validate Logic when user cannot Move Table to the other filled table",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel(Table.acRoom.ac2.name);
        });

    test("[TC_0205080] Validate Logic when user cannot Move Table to the other filled table with the same Table Section",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel(Table.acRoom.ac2.name);
        });

    test("[TC_0205081] Validate Logic when user cannot Move Table to the other filled table with different Table Section",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.moveTable();
            await moveTable.selectRoom(Table.smokingRoom.name);
            await moveTable.disableButtonByLabel(Table.smokingRoom.sr1.name);
        });

    test("[TC_0205082] Validate Logic when user cannot Move Table while not having access",
        {tag: tags + "@negative"}, async ({terminalID, signPin, tableList, order, bookOrder}) => {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("0000");
            await signPin.validateShowStarCash("20.000");
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.expectDisabledMoveTable();
        });

    test("[TC_0205083] Validate Logic when User can cancel Move Table action with button Cancel",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectTableAndCancelInSmokingRoom();
        });

    test("[TC_0205084] Validate Logic when User can Move Table after Hold the menu",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await order.activateKitchenFireManagement();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectTableAndApplyInSmokingRoom();
        });

    test("[TC_0205085] Validate Logic when User can Move Table after Hold All the menu",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectTableAndApplyInSmokingRoom();
        });

    test("[TC_0205086] Validate Logic when User can Move Table while having no ordered items",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, moveTable}) => {
            await tableList.goHere();
            await order.notActivateKitchenFireManagement();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveTable();
            await moveTable.selectTableAndApplyInSmokingRoom();
            await order.saveOrder();
            await order.notActivateKitchenFireManagement();
        });
});
