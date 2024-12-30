import {test} from "../../injection";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import TerminalIDScenario from "../../../../src/modules/oms/terminalID/terminalID.scenario";
import SignPinScenario from "../../../../src/modules/oms/signPin/signPin.scenario";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Item", () => {
    const tags = "@smokeTest @oms @payment @paymentOtherVoucher ";

    const selectMenuBiasa = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const salesModeInclusive = async (bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode("AT INCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const loginLimitedAccessUser = async (terminalID: TerminalIDScenario, signPin: SignPinScenario) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("0000");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
    };

    test.beforeEach(async () => {
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllTables()
        ]);
    });

    test("Setup", {}, async ({terminalID, signPin}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
    });

    test("[TC_0206034] Validate Logic when user can use Other Voucher (Fixed) type Grand Total as a payment method",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherGrandTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.paymentInputAmount("200.000");
            await paymentPos.inputOtherVoucherNotes("Test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        });

    test("[TC_0206035] Validate Logic when user can use Other Voucher (Fixed) type Subtotal as a payment method",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.paymentInputAmount("200.000");
            await paymentPos.inputOtherVoucherNotes("Test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        });

    test("[TC_0206036] Validate Logic when user can input Voucher Code",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
        });

    test("[TC_0206037] Validate Logic when user can input > 0 characters Voucher Notes",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.inputOtherVoucherNotes("Test");
        });

    test("[TC_0206038] Validate Logic when user can input max 100 characters Voucher Notes",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.inputOtherVoucherNotes(
                "1111111111" + "1111111111" + "1111111111" + "1111111111" + "1111111111" +
                "1111111111" + "1111111111" + "1111111111" + "1111111111" + "1111111111"
            );
        });

    test("[TC_0206039] Validate Logic when user can cancel Other Voucher Payment",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.paymentInputAmount("200.000");
            await paymentPos.inputOtherVoucherNotes("Test");
            await paymentPos.actionPayment(PaymentObject.CancelPayment);
        });

    test("[TC_0206040] Validate Logic when user cannot input > 100 characters Voucher Notes",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.inputOtherVoucherNotes(
                "1111111111" + "1111111111" + "1111111111" + "1111111111" + "1111111111" +
                "1111111111" + "1111111111" + "1111111111" + "1111111111" + "1111111111"
            );
        });

    test("[TC_0206041] Validate Logic when user cannot apply Other Voucher Payment while Voucher Code is empty",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, paymentPos}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.paymentInputAmount("200.000");
            await paymentPos.inputOtherVoucherNotes("Test");
            await paymentPos.disableApplyPayment();
        });

    test("[TC_0206042] Validate Logic when user can use Other Voucher (Fixed) type Subtotal as a payment method",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentPos, terminalID, signPin}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 3);
            await order.saveOrder();
            await loginLimitedAccessUser(terminalID, signPin);
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.actionPayment(PaymentObject.OtherVoucher);
            await paymentPos.actionPayment(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.inputOtherVoucherCode("Voucher 100%");
            await paymentPos.paymentInputAmount("200.000");
            await paymentPos.inputOtherVoucherNotes("Test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.expectPopUpAuth();
        });
});