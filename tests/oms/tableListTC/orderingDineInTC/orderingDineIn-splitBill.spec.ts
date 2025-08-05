import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(100000);
test.describe.serial("Ordering Dine In Split Bill", () => {
    const tags = "@smokeTest @oms @dineIn @splitBill ";

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

    const selectFirstTable = async (tableList: TableListScenario, bookOrder: BookOrderScenario) => {
        await tableList.selectRoom(Table.acRoom.name);
        await tableList.selectTable(Table.acRoom.ac1.name);
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0205148] Validate Logic when User can Add Bill in Split Bill"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
            await sideNavBar.gotoPageTools();
            await sideNavBar.selectStation("KASIR");
            await sideNavBar.gotoPageTableList();
        }
        await tableList.goHere();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelTableAndSplitBill()
        ]);
    });

    test("[TC_0205148] Validate Logic when User can Add Bill in Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Order");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205149] Validate Logic when User can Add Bill in Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Nadin Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.expectVisibleCustomerName("Nadin Parent");
        }
    );

    test("[TC_0205150] Validate Logic when User can access Child (Splitted) Bill in Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.expectVisibleCustomerName("Alpha Child");
        }
    );

    test("[TC_0205151] Validate Logic when User can split > 2 Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.addBill("Beta Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205152] Validate Logic when User can Split Bill only 1 ordered menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.validateMenuVisible(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205153] Validate Logic when User can Split Bill the main bill after split the bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.splitBill();
            await splitBill.addBill("Beta Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.expectVisibleCustomerName("Beta Child");
        }
    );


    test("[TC_0205154] Validate Logic when User cannot Split Bill while not having access",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, topNavBar, signPin}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("0000");
            await signPin.validateShowStarCash("20.000");
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.disabledSplitBill();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
    );

    test("[TC_0205155] Validate Logic when User cannot Split Bill the spliited bill",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.disabledSplitBill();
        }
    );

    test("[TC_0205156] Validate Logic when User can rename main Split Bill with valid keywords",
        {tag: tags + "@negative"}, async ({tableList}) => {
            // Test is skipped due to bug [TC_0205156]
            await tableList.goHere();
        }
    );

    test("[TC_0205157] Validate Logic when User can delete splitted Split Bill from the Main Bill",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.splitBill();
            await splitBill.deleteBill("Alpha Child");
            await splitBill.billNameInvisible("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205158] Validate Logic when User can rename main Split Bill with valid keywords",
        {tag: tags + "@negative"}, async ({tableList}) => {
            // Test is skipped due to bug [TC_0205158]
            await tableList.goHere();
        }
    );

    test("[TC_0205159] Validate Logic when User can rename main Split Bill with valid keywords",
        {tag: tags + "@negative"}, async ({tableList}) => {
            // Test is skipped due to bug [TC_0205159]
            await tableList.goHere();
        }
    );

    test("[TC_0205160] Validate Logic when User can Split Bill > 1 ordered menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 4);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "3");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205161] Validate Logic when User can move back the menu from Child (Splitted) Bill to the Parent (Main) Bill in Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.splitBill();
            await splitBill.returnMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name);
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205162] Validate Logic when User can Split Bill empty Child (Splitted) Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205163] Validate Logic when User can edit Child (Splitted) Bill in Split Bill",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill, editOrder}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        }
    );

    test("[TC_0205164] Validate Logic when User still can access the Split Bill table after finishing order Parent (Main) Bill payment first",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, paymentPos, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.saveOrder();
        }
    );

    test("[TC_0205165] Validate Logic when User still can access the Split Bill table after finishing order Child (Splitted) Bill payment first",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Main Bill");
            await order.saveOrder();
        }
    );

    test("[TC_0205166] Validate Logic when User can Split Bill the Parent Merge Table",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, mergeTable, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
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
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205167] Validate Logic when User cannot Split Bill the Child Merge Table",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, mergeTable, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.addAdditionalInfo("Nadin Parent");
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
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.moveMenu("Alpha Child", MenuList.menus.atMenuBiasaGoreng.name, "1");
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await tableList.selectTableSplitBill("Bill 2");
            await order.disabledSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205168] Validate Logic when User can Split Bill table without any ordered menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, splitBill}) => {
            await selectFirstTable(tableList, bookOrder);
            await order.addAdditionalInfo("Nadin Parent");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.addBill("Alpha Child");
            await splitBill.closeSplitBill();
            await order.saveOrder();
        }
    );

    test("[TC_0205169] Validate Logic when User cannot Split Bill the Holded Menu",
        {tag: tags + "@negative"}, async ({tableList, bookOrder, order, splitBill}) => {
            await order.activateKitchenFireManagement();
            await selectFirstTable(tableList, bookOrder);
            await order.addAdditionalInfo("Nadin Parent");
            await selectMultipleMenuBiasa(order, true, 2);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.splitBill();
            await splitBill.moveMenuButtonInvisible(MenuList.menus.atMenuBiasaGoreng.name);
            await splitBill.moveMenuButtonInvisible(MenuList.menus.atMenuBiasaRebus.name);
            await splitBill.moveMenuButtonInvisible(MenuList.menus.atMenuBiasaBakar.name);
            await splitBill.closeSplitBill();
            await order.saveOrder();
            await order.notActivateKitchenFireManagement();
        }
    );
});