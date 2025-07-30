import {test} from "../../injection";
import Table from "../../../../src/modules/oms/objects/table";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";

test.setTimeout(100000);
test.describe.serial("Dine in Merge Table", () => {
    const tags = "@smokeTest @oms @Merge_Table";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const bookedOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookTable();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };

    const selectMenuExtra = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await addOrderV2.selectPackageGroup("Menu Extra");
        await addOrderV2.extraCategory(MenuList.atCategory.name);
        await addOrderV2.modifyExtraPackage([
            {menuName: MenuList.menus.atMenuExtraAlpha.shortName, qty: quantity, notes: null}
        ]);
    };

    const orderMenuPaketMurah = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const orderMenuPaketMahal = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
    };


    const cancelTable = async (order: OrderScenario) => {
        await order.cancelTable("Cancel");
        await order.confirmationCloseTable("Yes");
    };

    test.beforeEach(async ({terminalID, signPin, tableList, order, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0205148] Validate Logic when User can Merge Table with same Sales Mode",
            "[TC_0205071] Validate Logic when User can Merge Table with filled table after Hold menu",
            "[TC_0205072] Validate Logic when User cannot Merge Table with filled table after Hold All menu",
            "[TC_0205073] Validate Logic when User can Merge Table with emptied table after Hold All menu"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            if (test.info().title === testWithAuthentication[0]) {
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();

            } else if ([
                testWithAuthentication[1],
                testWithAuthentication[2],
                testWithAuthentication[3],
                testWithAuthentication[4]
            ].includes(test.info().title)) {
                await order.activateKitchenFireManagement();
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
            console.log("jalan apa ngga ")
            await order.notActivateKitchenFireManagement();
            await tableList.goHere();
        }
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205148] Validate Logic when User can Merge Table with same Sales Mode",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectTable(Table.acRoom.ac2.name, "occupied");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205149] Validate Logic when User can Merge Table with empty table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205150] Validate Logic when User can Merge Table with empty table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(order, addOrderV2, 4);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectTable(Table.acRoom.ac1.name, "occupied");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205151] Validate Logic when User can Merge Table with unordered table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2})=>{
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr1.name, "occupied");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            },{tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2},testInfo);
        });

    test("[TC_0205152] Validate Logic when User can Merge Table with unordered table and empty table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, paymentV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectTable(Table.acRoom.ac3.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, mergeTable, paymentV2}, testInfo);
        });

    test("[TC_0205153] Validate Logic when User can Merge Table with unordered table, empty ordered table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectTable(Table.acRoom.ac2.name, "occupied");
                await mergeTable.selectRoom(Table.acRoom.name);
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205154] Validate Logic when User can cancel the Merge Table action with button Cancel",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await cancelTable(order);
            }, {tableList, bookOrder, order, mergeTable}, testInfo);
        });

    test("[TC_0205155] Validate Logic when User can Cancel Merge Table edit/selection",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "occupied");
                await mergeTable.cancelMergeTable();
                await order.saveOrder();
            }, {tableList, bookOrder, order, mergeTable}, testInfo);
        });

    test("[TC_0205156] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "occupied");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
            }, {tableList, bookOrder, order, mergeTable}, testInfo);
        });

    test("[TC_0205157] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr1.name, "occupied");
            }, {tableList, bookOrder, order, mergeTable}, testInfo);
        });

    test("[TC_0205158] Validate Logic when User cannot Merge Table with different Sales Mode",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "disable");
            }, {tableList, bookOrder, order, mergeTable, addOrderV2}, testInfo);
        });

    test("[TC_0205159] Validate Logic when user cannot Merge Table while not having access",
        {tag: tags + "@negative"}, async ({topNavBar, signPin, tableList, bookOrder, order, addOrderV2},testInfo) => {
            await safeTest(async ({topNavBar, signPin, tableList, bookOrder, order, addOrderV2}) => {
                await topNavBar.userSignOut();
                await signPin.inputPinByTouch("6");
                await signPin.validateShowStarCash("20.000");
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.disabledMergeTable();
                await order.cancelTable("Cancel");
                await order.confirmationCloseTable("Yes");
                await topNavBar.userSignOut();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
            }, {topNavBar, signPin, tableList, bookOrder, order, addOrderV2}, testInfo);
        });
    test("[TC_0205160] Validate Logic when User cannot Merge Table with the Split Bill table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, splitBill},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, splitBill}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order,2,3,3);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr3.name, "occupied");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.splitBill();
                await splitBill.addBill("child");
                await splitBill.moveMenu("child", MenuList.menus.atMenuBiasaBakar.name, "2");
                await splitBill.closeSplitBill();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await tableList.selectTableSplitBill("Bill 2");
                await order.cancelTable("Cancel");
                await order.confirmationCloseTable("Yes");
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, splitBill}, testInfo);

        });

    test("[TC_0205161] Validate Logic when User cannot Merge Table with the linked Merge Table",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2, linkTable},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2, linkTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order,2,2,2);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await linkTable.singleLinkTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr3.name, "disable");
                await mergeTable.selectTable(Table.smokingRoom.sr4.name, "disable");
            }, {tableList, bookOrder, order, mergeTable, addOrderV2, linkTable}, testInfo);
        });

    test("[TC_0205162] Validate Logic when User cannot Merge Table with other Merged Table",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable, addOrderV2},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order,2,2,2);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr4.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr3.name, "disable");
                await mergeTable.selectTable(Table.smokingRoom.sr4.name, "disable");
            }, {tableList, bookOrder, order, mergeTable, addOrderV2}, testInfo);
        });

    test("[TC_0205163] Validate Logic when User can Merge Table with both tables emptied",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, mergeTable},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.selectTable(Table.smokingRoom.sr3.name, "active");
                await mergeTable.selectTable(Table.smokingRoom.sr4.name, "active");
                await mergeTable.applyMergeTable();
                await order.saveOrder();
            }, {tableList, bookOrder, order, mergeTable}, testInfo);

        });

    test("[TC_0205164] Validate Logic when User cannot Merge Table on different Sales Mode with both tables emptied",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, mergeTable}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await bookedOrder("AT INCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await bookedOrder("AT EXCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await bookedOrder("AT EXCLUSIVE", bookOrder);
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.mergeTable();
                await mergeTable.selectRoom(Table.smokingRoom.name);
                await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
                await mergeTable.selectTable(Table.smokingRoom.sr3.name, "disable");
                await mergeTable.selectTable(Table.smokingRoom.sr4.name, "disable");
            }, {tableList, bookOrder, order, mergeTable}, testInfo);
        });

    test("[TC_0205070] Validate Logic when User can open Child Merge Table and redirect to Parent Merge Table",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await bookedOrder("AT INCLUSIVE", bookOrder);
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.smokingRoom.name);
            await mergeTable.selectTable(Table.smokingRoom.sr2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
        }
    );

    test("[TC_0205071] Validate Logic when User can Merge Table with filled table after Hold menu",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, mergeTable, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.holdMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "occupied");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205072] Validate Logic when User cannot Merge Table with filled table after Hold All menu",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, mergeTable, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "occupied");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205073] Validate Logic when User can Merge Table with emptied table after Hold All menu",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, mergeTable, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

});