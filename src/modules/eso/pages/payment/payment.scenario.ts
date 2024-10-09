import BaseScenario from "../../../../base/base-scenario";
import {PaymentMethod} from "../../objects/paymentMethod";

export default interface PaymentScenario extends BaseScenario {
    inputFullName(fullName: string): Promise<void>

    inputPhone(phone: string): Promise<void>

    inputEmail(email: string): Promise<void>

    inputTableNumber(tableNumber: string): Promise<void>

    selectPaymentType(cash: boolean): Promise<void>

    selectPaymentMethod(paymentMethod: PaymentMethod): Promise<void>

    confirmPayment(): Promise<void>

    addPromotion(): Promise<void>

    expandPaymentTotal(): Promise<void>
}