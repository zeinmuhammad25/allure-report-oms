import {test} from "../../injection";
import Table from "../../../../src/modules/oms/objects/table";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";

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

    const orderSingleMenu = async (order: OrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuExtraAnggur = async (order: OrderScenario, editOrder: EditOrderScenario) => {
        await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await editOrder.actionButtonFooter("Next");
        await editOrder.selectMenuExtraCategory(MenuList.anggur.name);
        await editOrder.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurHijauKawaKawa600ml.shortName, 2);
        await editOrder.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurMerahOT620ml.shortName, 2);
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

    const cancelTable = async (order: OrderScenario) => {
        await order.cancelTable("Cancel");
        await order.confirmationCloseTable("Yes");
    };

    test.beforeEach(async ({terminalID, signPin, tableList, order}) => {
        const testWithAuthentication = [
            "[TC_0205053] Validate Logic when User can Merge Table with same Sales Mode",
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

    test("[TC_0205053] Validate Logic when User can Merge Table with same Sales Mode",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "occupied");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205054] Validate Logic when User can Merge Table with empty table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205055] Validate Logic when User can Merge Table with empty table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac2.name);
            await bookedOrder("AT INCLUSIVE", bookOrder);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac1.name, "occupied");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205056] Validate Logic when User can Merge Table with unordered table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.smokingRoom.name);
            await mergeTable.selectTable(Table.smokingRoom.sr1.name, "occupied");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205057] Validate Logic when User can Merge Table with unordered table and empty table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac3.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
        }
    );

    test("[TC_0205058] Validate Logic when User can Merge Table with unordered table, empty ordered table and filled table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
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
        }
    );

    test("[TC_0205059] Validate Logic when User can cancel the Merge Table action with button Cancel",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );

    test("[TC_0205060] Validate Logic when User can Cancel Merge Table edit/selection",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );

    test("[TC_0205061] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );

    test("[TC_0205062] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );

    test("[TC_0205063] Validate Logic when User cannot Merge Table with different Sales Mode",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await bookedOrder("AT INCLUSIVE", bookOrder);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT EXCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.smokingRoom.name);
            await mergeTable.selectTable(Table.smokingRoom.sr2.name, "disable");
        }
    );

    test("[TC_0205064] Validate Logic when user cannot Merge Table while not having access",
        {tag: tags + "@negative"}, async ({topNavBar, signPin, tableList, bookOrder, order, addOrder}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
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
        }
    );
    test("[TC_0205065] Validate Logic when User cannot Merge Table with the Split Bill table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, addOrder, splitBill}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
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
        }
    );

    test("[TC_0205066] Validate Logic when User cannot Merge Table with the linked Merge Table",
        {tag: tags + "@Negative"}, async ({
                                              tableList,
                                              bookOrder,
                                              order,
                                              mergeTable,
                                              editOrder,
                                              addOrder,
                                              linkTable
                                          }) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await linkTable.singleLinkTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.smokingRoom.name);
            await mergeTable.selectTable(Table.smokingRoom.sr3.name, "disable");
            await mergeTable.selectTable(Table.smokingRoom.sr4.name, "disable");

        }
    );

    test("[TC_0205067] Validate Logic when User cannot Merge Table with other Merged Table",
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
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
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
        }
    );

    test("[TC_0205068] Validate Logic when User can Merge Table with both tables emptied",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );
    test("[TC_0205069] Validate Logic when User cannot Merge Table on different Sales Mode with both tables emptied",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable}) => {
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
        }
    );

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