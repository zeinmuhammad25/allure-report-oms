import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(100000);
test.describe.serial("Dine in Cancel Table", () => {
    const tags = "@smokeTest @oms @Cancel_Table";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuExtraWhisky = async (order: OrderScenario, editOrder: EditOrderScenario) => {
        await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await editOrder.actionButtonFooter("Next");
        await editOrder.selectMenuExtraCategory(MenuList.whisky.name);
        await editOrder.selectMenuExtra(MenuList.whisky.minumanWhisky.bataviaBlended700ml.shortName, 3);
        await editOrder.selectMenuExtra(MenuList.whisky.minumanWhisky.gilbeysWhisky700ml.shortName, 4);
        await editOrder.actionButtonFooter("Apply");
    };

    const orderMenuPaketMurah = async (order: OrderScenario, addOrder: AddOrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrder.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 1, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: 2, notes: null}
        ]);
        await addOrder.applyMenuDetailPackage();
    };

    const orderMenuPaketMahal = async (order: OrderScenario, addOrder: AddOrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrder.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: "test notes1"}
        ]);
        await addOrder.applyMenuDetailPackage();
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
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205131] Validate Logic when User can Cancel the order in Link Table with Cancel Table to the main table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await cancelTable(order);
        }
    );

    test("[TC_0205132] Validate Logic when User can Cancel Table after Link Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await cancelTableSelectNotes(order, "Testing B");
        }
    );

    test("[TC_0205133] Validate Logic when User can Cancel Table before saving order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await cancelTableSelectNotes(order, "Testing A");
        }
    );

    test("[TC_0205134] Validate Logic when User can Cancel Table after saving order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await cancelTableSelectNotes(order, "Cancel");
        }
    );

    test("[TC_0205135] Validate Logic when User still can Cancel Table after Move Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, moveTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.moveTable();
            await moveTable.selectRoom(Table.smokingRoom.name);
            await moveTable.selectTable(Table.smokingRoom.sr2.name);
            await cancelTableSelectNotes(order, "Cancel");
        }
    );

    test("[TC_0205137] Validate Logic when User can Cancel Table empty order",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await cancelTable(order);
        }
    );

    test("[TC_0205138] Validate Logic when User cannot Cancel Table before Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.disabledCancelTable();
        }
    );

    test("[TC_0205139] Validate Logic when User cannot Cancel Table after Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await order.cancelTableApplyDisabled();
        }
    );

    test("[TC_0205140] Validate Logic when User can undo Cancel Table before Save Order with button Cancel",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await UndoCancelTable(order, "Cancel");
        }
    );

    test("[TC_0205141] Validate Logic when User can undo Cancel Table after Save Order with button Cancel",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr4.name);
            await UndoCancelTable(order, "Cancel");
        }
    );

    test("[TC_0205142] Validate Logic when User can Cancel Table to Parent (Main) Split Bill",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, editOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT EXCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraWhisky(order, editOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await cancelTable(order);
        }
    );

    test("[TC_0205143] Validate Logic when User can Cancel Table to Child (Splitted) Split Bill",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT EXCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraWhisky(order, editOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await cancelTableSelectNotes(order, "Tidak Jadi");
        }
    );

    test("[TC_0205144] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await cancelTable(order);
        }
    );

    test("[TC_0205145] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await cancelTableSelectNotes(order, "Testing B");
        }
    );

    test("[TC_0205146] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.fireMenu(MenuList.menus.atMenuBiasaBakar.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await cancelTable(order);
        }
    );

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