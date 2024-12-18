import BaseScenario from "../../../../base/base-scenario";
import {PaymentObject} from "./PaymentObject";

export default interface PaymentPosScenario extends BaseScenario {

    paymentType(paymentType: PaymentObject): Promise<void>;

    paymentMethod(paymentMethod: PaymentObject): Promise<void>;

    actionPayment(actionPayment: PaymentObject): Promise<void>;

    paymentInputAmount(inputAmount: string): Promise<void>;

    paymentGetOutstandingAmount(): Promise<void>;

    paymentCashFullAmount(): Promise<void>;

    inputFieldDebitBCA(inputField: PaymentObject, value: string): Promise<void>;

    paymentQrisShopee(): Promise<void>;

    paymentQrisEsb(): Promise<void>;

    paymentComplimentGetOutstanding(notes: string): Promise<void>;

    paymentComplimentPercentage(percentage: number, notes: string): Promise<void>;

    paymentVoucher(): Promise<void>;

    paymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string, notes: string): Promise<void>;

    paymentMemberDeposit(): Promise<void>;

    paymentOtherCost(notes: string): Promise<void>;

    selectCashBoard(cashBord: PaymentObject, click: number): Promise<void>;

    clearAmount(): Promise<void>;

    paymentPinUserAuthorization(Pin: string): Promise<void>;

    disableApplyPayment(): Promise<void>;

    paymentComplimentAmount(amount: string, notes: string): Promise<void>;

    disableApplyCompliment(): Promise<void>;

    fillPaymentAmountWithGrandTotal(adjustment?: number): Promise<void>;

    paymentInputWithOutstandingAdjustment(operation: "add" | "subtract", adjustmentValue: number): Promise<void>;

    paymentInputWithOutstandingAmount(): Promise<void>;

    inputOtherVoucherNotes(notes: string): Promise<void>;

    inputOtherVoucherCode(voucherCode: string): Promise<void>;
}