import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(100000);
test.describe("Payment Mix POS", () => {
    const tags = "@smokeTest @oms @payment @paymentMix ";
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
            "[TC_0206043] Validate Logic when user can mix Cash and Card payment method"
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


    test("[TC_0206043] Validate Logic when user can mix Cash and Card payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.fillPaymentAmountWithGrandTotal(-20000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentGetOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206044] Validate Logic when user can mix Cash and Compliment payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.fillPaymentAmountWithGrandTotal(-20000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );


    test("[TC_0206045] Validate Logic when user can mix Other Voucher (Fixed) and Cash payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 20000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206046] Validate Logic when user can mix Other Voucher (Custom) and Cash payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 20000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher SubTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206047] Validate Logic when user can mix Other Voucher (Fixed) and Other Voucher (Custom) payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 20000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher SubTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB321");
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206048] Validate Logic when user can mix Card and Compliment payment method",
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
            await paymentPos.fillPaymentAmountWithGrandTotal(-20000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206049] Validate Logic when user can mix Other Voucher and Card payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 20000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206050] Validate Logic when user can mix Cash, Card, and Compliment payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 50000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 10000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206051] Validate Logic when user mix Other Voucher, Compliment and Card payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 60000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 10000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206052] Validate Logic when user mix Other Voucher, Cash and Card payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 60000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 10000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206053] Validate Logic when user mix Other Voucher, Cash, Compliment and Card payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 70000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 20000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 10000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206054] Validate Logic when user can mix Other Voucher and Compliment payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 70000);
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206055] Validate Logic when user apply Cash first and Other Voucher (Fixed) payment method, " +
        "Other Voucher replaced total payment",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 70000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206056] Validate Logic when user apply Cash first and Other Voucher (Custom) payment method, " +
        "Other Voucher replaced total payment",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 70000);
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.inputOtherVoucherNotes("Other Voucher SubTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0206057] Validate Logic when user apply Compliment first and Other Voucher payment method, " +
        "Other Voucher replaced total payment",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await selectTableAndSalesModeExclusive(tableList, bookOrder);
            await selectMultipleMenuBiasa(order, true, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentInputWithOutstandingAdjustment("subtract", 70000);
            await paymentPos.inputOtherVoucherNotes("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("ESB123");
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.inputOtherVoucherNotes("Other Voucher GrandTotal");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentInputWithOutstandingAmount();
            await paymentPos.inputOtherVoucherNotes("Compliment Payment");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );


})
;

