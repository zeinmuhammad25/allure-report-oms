import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";

test.setTimeout(100000);
test.describe.serial("Ordering Dine In Move Item", () => {
    const tags = "@smokeTest @oms @orderingDineIn @moveItem ";

    const selectMenuBiasa = async (order: OrderScenario, qty1: number) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
    };

    const selectMultipleMenuBiasa = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
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
            "[TC_0205182] Validate Logic when User can Move Item to the other table",
            "[TC_0205207] Validate Logic when User cannot Move Item to emptied table after Hold the menu",
            "[TC_0205208] Validate Logic when User cannot Move Item to emptied table after Hold All the menu",
            "[TC_0205209] Validate Logic when User cannot Move Item to filled table after Hold the menu",
            "[TC_0205210] Validate Logic when User cannot Move Item to filled table after Hold All the menu"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            if (test.info().title === testWithAuthentication[0]) {
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
                await sideNavBar.gotoPageTools();
                await sideNavBar.selectStation("KASIR");
                await sideNavBar.gotoPageTableList();
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

    test("[TC_0205182] Validate Logic when User can Move Item to the other table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205183] Validate Logic when User can Move Item to the other table with the same Table Section",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205184] Validate Logic when User can Move Item to the other table with different Table Section",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.smokingRoom.name, Table.smokingRoom.sr1.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205185] Validate Logic when User can Move Item to the other filled table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder.setPax(2);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 2);
            await order.saveOrder();
        }
    );

    test("[TC_0205186] Validate Logic when User can Move Item to the empty table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205187] Validate Logic when User can Move Item to the empty table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.moveSelectAllItemMenu();
            await moveItem.actionApplyMoveItem();
            await order.confirmationCloseTable("Yes");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205189] Validate Logic when User can Move Item to the other filled table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.moveSelectAllItemMenu();
            await moveItem.actionApplyMoveItem();
            await order.confirmationCloseTable("Yes");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaRebus.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205190] Validate Logic when User can Move Item to the empty table with a Menu selected",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205191] Validate Logic when User can Move Item to the filled table with a Menu selected",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205192] Validate Logic when User can Increase an item with ≥ 1 Qty in Move Item to the other table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaRebus.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205193] Validate Logic when User can Decrease an item with ≥ 1 Qty selected in Move Item to the other table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 4);
            await moveItem.moveBackPartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaRebus.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205194] Validate Logic when User can Move All an item with ≥ 1 Qty in Move Item to the other table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.moveSelectAllItemMenu();
            await moveItem.actionApplyMoveItem();
            await order.confirmationCloseTable("Yes");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaRebus.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205195] Validate Logic when User can undo the Move Item action with button Cancel",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.moveSelectAllItemMenu();
            await moveItem.actionCancelMoveItem();
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205196] Validate Logic when User cannot Move Item to the other filled table with different Sales Mode",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeExclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.expectDisabledTable(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205197] Validate Logic when User cannot Move Item to the other filled table with different Sales Mode in different Table Section",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await salesModeExclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.moveItem();
            await moveItem.expectDisabledTable(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205198] Validate Logic when User can Move Item from Dine-In to Quick Service",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionQuickService();
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205199] Validate Logic when User cannot Move Item while not having access",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, topNavBar, signPin}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("0000");
            await signPin.validateShowStarCash("20.000");
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.expectDisabledMoveItem();
            await order.saveOrder();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
    );

    test("[TC_0205200] Validate Logic when User cannot Move Item without ordered item to the other table",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205201] Validate Logic when User can Move Item to emptied table from Parent Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, mergeTable, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 4);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaGoreng.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaGoreng.name, 4);
            await order.saveOrder();
        }
    );

    test("[TC_0205202] Validate Logic when User can Move Item to filled table from Parent Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem, mergeTable}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaBakar.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaBakar.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205203] Validate Logic when User can Move Item to Parent Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem, mergeTable}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205204] Validate Logic when User can Move Item to Child Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem, mergeTable}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205205] Validate Logic when User can Move Item to emptied table from Child Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem, mergeTable}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205206] Validate Logic when User can Move Item to filled table from Child Merge Table",
        {tag: tags + "@positive"}, async ({bookOrder, order, tableList, moveItem, mergeTable}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac2.name, "active");
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.menus.atMenuBiasaRebus.name, 2);
            await moveItem.actionApplyMoveItem();
            await moveItem.verifyCurrentQty(MenuList.menus.atMenuBiasaRebus.name, 3);
            await order.saveOrder();
        }
    );

    test("[TC_0205207] Validate Logic when User cannot Move Item to emptied table after Hold the menu",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.holdMenu(MenuList.menus.atMenuBiasaRebus.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.expectDisabledButtonPlus(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205208] Validate Logic when User cannot Move Item to emptied table after Hold All the menu",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaRebus.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaBakar.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205209] Validate Logic when User cannot Move Item to filled table after Hold the menu",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.expectDisabledButtonPlus(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

    test("[TC_0205210] Validate Logic when User cannot Move Item to filled table after Hold All the menu",
        {tag: tags + "@negative"}, async ({bookOrder, order, tableList, moveItem}) => {
            await selectTable(tableList, bookOrder);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await salesModeInclusive(bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac1.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaGoreng.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaRebus.name);
            await moveItem.expectDisabledButtonMoveAll(MenuList.menus.atMenuBiasaBakar.name);
            await moveItem.actionCancelMoveItem();
            await order.saveOrder();
        }
    );

});
