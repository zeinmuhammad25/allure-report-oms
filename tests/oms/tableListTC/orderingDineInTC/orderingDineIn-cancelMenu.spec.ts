import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(60000);
test.describe.serial("Ordering Dine In Cancel Menu", () => {
    const tags = "@smokeTest @oms @orderingDineIn @cancelMenu ";
    const selectMenuBiasa = async (order: OrderScenario, isWithQuantity = false, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        if (isWithQuantity) {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
        } else {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
        }
    };

    const selectMultipleMenuBiasa = async (order: OrderScenario, isWithQuantity = false, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        if (isWithQuantity) {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
            await order.selectMenu(MenuList.menus.atMenuBiasaRebus.name, quantity);
            await order.selectMenu(MenuList.menus.atMenuBiasaBakar.name, quantity);
        } else {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.selectMenu(MenuList.menus.atMenuBiasaRebus.name);
            await order.selectMenu(MenuList.menus.atMenuBiasaBakar.name);
        }
    };

    const deleteMultipleMenuBeforeSave = async (order: OrderScenario) => {
        await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
        await order.deleteMenu(MenuList.menus.atMenuBiasaRebus.name);
        await order.deleteMenu(MenuList.menus.atMenuBiasaBakar.name);
    };

    const deleteMultipleMenuAfterSave = async (order: OrderScenario, editOrder: EditOrderScenario) => {
        await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
        await order.cancelMenuAfterSave("Cancel Menu Before Fire all");
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Apply");
        await order.deleteMenu(MenuList.menus.atMenuBiasaRebus.name);
        await order.cancelMenuAfterSave("Cancel Menu Before Fire all");
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Apply");
        await order.deleteMenu(MenuList.menus.atMenuBiasaBakar.name);
        await order.cancelMenuAfterSave("Cancel Menu Before Fire all");
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Apply");
    };

    const selectTable = async (tableList: TableListScenario, bookOrder: BookOrderScenario) => {
        await tableList.selectRoom(Table.smokingRoom.name);
        await tableList.selectTable(Table.smokingRoom.sr1.name);
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    test.beforeEach(async ({order, terminalID, signPin, tableList}) => {
        await order.activateKitchenFireManagement();
        const testWithAuthentication = [
            "[TC_0205170] Validate Logic when User already Hold menu, user can Cancel Menu"
        ];
        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
        await tableList.goHere();

    });

    test.afterEach(async ({tableList}) => {
        const excludedTests = [
            "[TC_0205183] Validate Logic when User can Cancel Menu the splitted Split Bill",
            "[TC_0205184] Validate Logic when User cannot Cancel Menu the splitted Split Bill without input Cancel Notes",
            "[TC_0205185] Validate Logic when User can undo the Cancel Menu of the splitted Split Bill with button Cancel",
            "[TC_0205186] Validate Logic when User can Cancel Menu the Parent (Main) Split Bill",
            "[TC_0205187] Validate Logic when User cannot Cancel Menu the main Split Bill without input Cancel Notes"
        ];
        const testTitle = test.info().title;
        if (!excludedTests.includes(testTitle)) {
            await Promise.all([
                tableList.cancelAllQuickServices(),
                tableList.cancelAllTables()
            ]);
        }
    });

    test("[TC_0205170] Validate Logic when User already Hold menu, user can Cancel Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.validateMenuNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205171] Validate Logic when User already Hold all menu, user can Cancel Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await deleteMultipleMenuBeforeSave(order);
            await order.validateMenuNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205172] Validate Logic when User already Fire menu, user can Cancel Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("CANCEL HOLD MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205173] Validate Logic when User already Fire all menu, user can Cancel Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireAllMenu();
            await order.confirmationCloseTable("Yes");
            await deleteMultipleMenuAfterSave(order, editOrder);
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205174] Validate Logic when User already Fire menu, user cannot Cancel Menu without Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205175] Validate Logic when User already Fire all menu, user cannot Cancel Menu without Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205176] Validate Logic when User can Cancel Menu before Fire menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Cancel Menu Before Fire");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205177] Validate Logic when User can Cancel Menu before Fire All menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await deleteMultipleMenuAfterSave(order, editOrder);
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205178] Validate before User Fire menu, user cannot Cancel Menu without Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205179] Validate before User Fire all menu, user cannot Cancel Menu without Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205180] Validate Logic when User can Cancel Menu before Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.validateMenuNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205181] Validate Logic when User can Cancel Menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Cancel Menu After Save");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205182] Validate Logic when User cannot Cancel Menu while not having access",
        {tag: tags + "@positive"}, async ({topNavBar, signPin, tableList, bookOrder, order}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("0000");
            await signPin.validateShowStarCash("20.000");
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.bookAndOrder();
            await bookOrder.skipCustomerPhoneNumber();
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.cancelMenuButtonIsNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
    );

    test("[TC_0205183] Validate Logic when User can Cancel Menu the splitted Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.moveMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name, "1");
            await splitBill.returnMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name);
            await splitBill.deleteBill("Nadin Order");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.deleteSplitBill("Main Bill");
            await tableList.deleteSplitBill("Bill 2");
        }
    );

    test("[TC_0205184] Validate Logic when User cannot Cancel Menu the splitted Split Bill without input Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.moveMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.deleteSplitBill("Main Bill");
            await tableList.deleteSplitBill("Bill 2");
        }
    );

    test("[TC_0205185] Validate Logic when User can undo the Cancel Menu of the splitted Split Bill with button Cancel",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.moveMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Gk Jadi");
            await editOrder.escapeKeyboard();
            await editOrder.actionCancel();
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.deleteSplitBill("Main Bill");
            await tableList.deleteSplitBill("Bill 2");
        }
    );

    test("[TC_0205186] Validate Logic when User can Cancel Menu the Parent (Main) Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.moveMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Gk Jadi");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.deleteSplitBill("Main Bill");
            await tableList.deleteSplitBill("Bill 2");
        }
    );

    test("[TC_0205187] Validate Logic when User cannot Cancel Menu the main Split Bill without input Cancel Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.moveMenu("Nadin Order", MenuList.menus.atMenuBiasaRebus.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.deleteSplitBill("Main Bill");
            await tableList.deleteSplitBill("Bill 2");
        }
    );

    test("[TC_0205188] Validate Logic when User can Cancel Menu in previous table after Move Item",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, moveItem, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Cancel Menu");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();

        }
    );

    test("[TC_0205189] Validate Logic when User can Cancel Menu in new table after Move Item",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, moveItem, editOrder}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("Cancel Menu");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        }
    );

});
