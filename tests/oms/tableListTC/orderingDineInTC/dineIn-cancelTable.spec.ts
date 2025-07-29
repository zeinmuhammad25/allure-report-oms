import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Dine in Cancel Table", () => {
    const tags = "@smokeTest @oms @Cancel_Table";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
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

    const cancelTableSelectNotes = async (order: OrderScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await order.cancelTableSelectNotes(reason);
        await order.confirmationCloseTable("Yes");
    };

    const cancelTable = async (order: OrderScenario) => {
        await order.cancelTable("Cancel");
        await order.confirmationCloseTable("Yes");
    };

    const UndoCancelTable = async (order: OrderScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await order.UndoCancelTable(reason);
    };

    test.beforeEach(async ({terminalID, signPin, tableList, order}) => {
        const testWithAuthentication = [
            "[TC_0205131] Validate Logic when User can Cancel the order in Link Table with Cancel Table to the main table",
            "[TC_0205144] Validate Logic when User already Hold menu, user can Cancel Table",
            "[TC_0205145] Validate Logic when User already Hold menu, user can Cancel Table",
            "[TC_0205146] Validate Logic when User already Hold menu, user can Cancel Table",
            "[TC_0205147] Validate Logic when User already Fire all menu, user can Cancel Table"
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
            }
        } else {
            await order.notActivateKitchenFireManagement();
            await tableList.goHere();
        }
    });

    test.afterEach(async ({tableList}) => {
        // await Promise.all([
        //     tableList.cancelAllQuickServices(),
        //     tableList.cancelAllTables()
        // ]);
    });

    test("[TC_0205131] Validate Logic when User can Cancel the order in Link Table with Cancel Table to the main table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, linkTable, addOrderV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
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
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await linkTable.singleLinkTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await cancelTable(order);
            }, {tableList, bookOrder, order, linkTable, addOrderV2}, testInfo);
        });

    test("[TC_0205132] Validate Logic when User can Cancel Table after Link Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, linkTable, addOrderV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
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
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await linkTable.singleLinkTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await cancelTableSelectNotes(order, "Testing B");
            }, {tableList, bookOrder, order, linkTable, addOrderV2}, testInfo);
        });

    test("[TC_0205133] Validate Logic when User can Cancel Table before saving order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await cancelTableSelectNotes(order, "Testing A");
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205134] Validate Logic when User can Cancel Table after saving order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await cancelTableSelectNotes(order, "Cancel");
            }, {tableList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205135] Validate Logic when User still can Cancel Table after Move Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, moveTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.moveTable();
                await moveTable.selectRoom(Table.smokingRoom.name);
                await moveTable.selectTable(Table.smokingRoom.sr2.name);
                await cancelTableSelectNotes(order, "Cancel");
            }, {tableList, bookOrder, order, moveTable, addOrderV2}, testInfo);
        });

    test("[TC_0205137] Validate Logic when User can Cancel Table empty order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await cancelTable(order);
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205138] Validate Logic when User cannot Cancel Table before Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.disabledCancelTable();
            }, {tableList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205139] Validate Logic when User cannot Cancel Table after Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.cancelTableApplyDisabled();
            }, {tableList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205140] Validate Logic when User can undo Cancel Table before Save Order with button Cancel",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await UndoCancelTable(order, "Cancel");
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205141] Validate Logic when User can undo Cancel Table after Save Order with button Cancel",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await UndoCancelTable(order, "Cancel");
            }, {tableList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205142] Validate Logic when User can Cancel Table to Parent (Main) Split Bill",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, linkTable, addOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(order, addOrderV2, 4);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await linkTable.userMultiLinkTable();
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await cancelTable(order);
            }, {tableList, bookOrder, order, linkTable, addOrderV2}, testInfo);
        });

    test("[TC_0205143] Validate Logic when User can Cancel Table to Child (Splitted) Split Bill",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, linkTable, addOrderV2}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(order, addOrderV2, 4);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac1.name);
                await linkTable.userMultiLinkTable();
                await order.saveOrder();
                await tableList.selectTable(Table.acRoom.ac3.name);
                await cancelTableSelectNotes(order, "Tidak Jadi");
            }, {tableList, bookOrder, order, linkTable, addOrderV2}, testInfo);
        });

    test("[TC_0205144] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 5, 7);
                await order.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await cancelTable(order);
            }, {tableList, bookOrder, order},testInfo);
        });

    test("[TC_0205145] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order},testInfo) => {
            await safeTest(async ({tableList, bookOrder, order})=>{
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2, 2, 2);
                await order.holdAllMenu();
                await order.confirmationCloseTable("Yes");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await cancelTableSelectNotes(order, "Testing B");
            },{tableList, bookOrder, order},testInfo)
        });

    test("[TC_0205146] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 6, 6, 8);
                await order.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.fireMenu(MenuList.menus.atMenuBiasaBakar.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await cancelTable(order);
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205147] Validate Logic when User already Fire all menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.fireAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await cancelTableSelectNotes(order, "Testing B");
        }
    );

});