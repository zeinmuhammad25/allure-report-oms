import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(100000);
test.describe.serial("Payment Card POS", () => {
    const tags = "@smokeTest @oms @payment @paymentCard ";
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

    const selectTableAndSalesModeExclusive = async (tableList: TableListScenario, bookOrder: BookOrderScenario) => {
        await tableList.goHere();
        await tableList.selectRoom(Table.acRoom.name);
        await tableList.selectTable(Table.acRoom.ac1.name);
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0206013] Validate Logic when user can use Card (Debit BCA) as a payment method"
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
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0206013] Validate Logic when user can use Card (Debit BCA) as a payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentGetOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206014] Validate Logic when user can use Card (Debit BCA) as a payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206015] Validate Logic when user can input Card Amount automatically",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentGetOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206016] Validate Logic when user can input Card Amount in exact outstanding",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206017] Validate Logic when user can input Card Amount in exceed outstanding",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal(1000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206018] Validate Logic when user can input Card Amount in below outstanding",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal(-1000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206019] Validate Logic when user can apply Card Payment",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206020] Validate Logic when user can cancel Card Payment",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal();
            await paymentPos.actionPayment(PaymentObject.CancelPayment);
        }
    );

    test("[TC_0206021] Validate Logic when user cannot apply Card Payment while Card Amount is empty",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.disableApplyPayment();
        }
    );

    test("[TC_0206022] Validate Logic when user cannot directly proceed Card Payment while not having access",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, topNavBar, signPin, order, paymentPos}) => {
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.fillPaymentAmountWithGrandTotal();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentPinUserAuthorization("22");
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        });

});
