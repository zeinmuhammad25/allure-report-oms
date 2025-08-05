import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";

test.setTimeout(100000);
test.describe.serial("Dine in Link Table", () => {
    const tags = "@smokeTest @oms @Link_Table";

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

    test.beforeEach(async ({terminalID, signPin, tableList, order}) => {
        const testWithAuthentication = [
            "[TC_0205210] Validate Logic when User can Link Table to other table with the same Sales Mode",
            "[TC_0205223] Validate Logic when User cannot Link Table while the other table doing Hold",
            "[TC_0205224] Validate Logic when User cannot Link Table after Hold the menu",
            "[TC_0205225] Validate Logic when User cannot Link Table after Hold All the menu"
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
                testWithAuthentication[3]
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

    test("[TC_0205210] Validate Logic when User can Link Table to other table with the same Sales Mode",
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
        }
    );

    test("[TC_0205211] Validate Logic when User can Link Table to other table with different Sales Mode",
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
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205212] Validate Logic when User can access Parent Table after user Link Table",
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
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
        }
    );

    test("[TC_0205213] Validate Logic when User can access Child Table after user Link Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
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
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
        }
    );

    test("[TC_0205214] Validate Logic when User can undo the Link Table action with button Cancel",
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
            await linkTable.userCancelLink();
            await order.saveOrder();
        }
    );

    test("[TC_0205215] Validate Logic when User can Unlink the Link Table from Parent Table",
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
            await linkTable.singleLinkTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205216] Validate Logic when User cannot Link Table while the Link Table on the other table already applied",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
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
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await linkTable.userMultiLinkTable();
        }
    );

    test("[TC_0205217] Validate Logic when User can Link Table with the Parent (Main) Split Bill table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder, splitBill}) => {
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
            await order.splitBill();
            await splitBill.addBill("split");
            await splitBill.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205218] Validate Logic when User can access payment on Link Table with Split Bill table from Link Table",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder, splitBill}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.splitBill();
            await splitBill.addBill("split");
            await splitBill.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205219] Validate Logic when User can access payment on Link Table with Split Bill table from Parent (Main) Split Bill",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder, splitBill}) => {
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
            await order.splitBill();
            await splitBill.addBill("split");
            await splitBill.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205220] Validate Logic when User cannot access payment on Link Table with Split Bill table from Child (Splitted) Split Bill",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, linkTable, addOrder, splitBill}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("split");
            await splitBill.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.expectDisabledPayment();
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205221] Validate Logic when User cannot Link Table while not having access",
        {tag: tags + "@Negative"}, async ({topNavBar, signPin, tableList, bookOrder, order, addOrder}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
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
            await order.disabledLinkTable();
            await order.cancelTable("Cancel");
            await order.confirmationCloseTable("Yes");
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
    );

    test("[TC_02052222] Validate Logic when User cannot Unlink the Link Table from Child/Linked Table",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, linkTable, editOrder}) => {
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
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await linkTable.userMultiLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await linkTable.userMultiLinkTable();
        }
    );

    test("[TC_0205223] Validate Logic when User cannot Link Table while the other table doing Hold",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await linkTable.userMultiLinkTable();
        }
    );

    test("[TC_0205224] Validate Logic when User cannot Link Table after Hold the menu",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await linkTable.userMultiLinkTable();
        }
    );

    test("[TC_0205225] Validate Logic when User cannot Link Table after Hold All the menu",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, linkTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await linkTable.userMultiLinkTable();
        }
    );

});