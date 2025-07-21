import BaseScenario from "../../../../base/base-scenario";
import PaymentList from "../../objects/paymentList";

    export default interface PaymentV2Scenario extends BaseScenario {
    paymentPinUserAuthorization(Pin: string): Promise<void>;

    PaymentType(paymentType: PaymentList): Promise<void>;

    PaymentMethod(paymentMethod: PaymentList): Promise<void>;

    actionPayment(actionPayment: PaymentList): Promise<void>;

    paymentInputAmount(inputAmount: string): Promise<void>;

    paymentInputAmountByBoard(paymentValue: string): Promise<void>;

    disableSavePayment(): Promise<void>;

    clearManualAmount(): Promise<void>;

    paymentFullAmount(): Promise<void>;

    addCardDetail(inputField: PaymentList, value: string): Promise<void>;

    settlementQrEsb(branchId: number): Promise<void>;

    paymentQrisEsb(branchId: number): Promise<void>;

    printQrisEsb(): Promise<void>;

    paymentComplimentGetOutstanding(notes: string): Promise<void>;

    paymentComplimentPercentage(percentage: number, notes: string): Promise<void>;

    paymentComplimentAmount(amount: string, notes: string): Promise<void>;

    disableSaveCompliment(): Promise<void>;

    paymentVoucher(voucherCode: string): Promise<void>;

    cancelPaymentVoucher(voucherCode: string): Promise<void>;

    paymentVoucherScan(): Promise<void>;

    paymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string): Promise<void>;

    cancelPaymentOtherVoucherSubtotalAndGrandTotal(voucherCode: string, amount: string): Promise<void>;

    inputOtherOrVoucherCode(voucherCode: string): Promise<void>;

    inputOtherVoucherValue(amount: string): Promise<void>;

    paymentMemberDeposit(): Promise<void>;

    paymentOtherCost(notes: string): Promise<void>;

    paymentInputWithOutstandingAmount(): Promise<void>;

    paymentInputWithOutstandingAdjustment(operation: "add" | "subtract", adjustmentValue: number): Promise<void>;

    fillPaymentAmountWithGrandTotal(adjustment?: number): Promise<void>;

}
