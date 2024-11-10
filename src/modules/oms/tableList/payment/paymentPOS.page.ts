import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import PaymentPosScenario from "./paymentPOS.scenario";
import {PaymentObject} from "./PaymentObject";
import PaymentPOSLocator from "./paymentPOS.locator";

export default class PaymentPOSPage extends BaseOmsPage implements PaymentPosScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentPOSLocator.buttonApplyMember)
        ];
    }

    async paymentType(paymentType: PaymentObject): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentType));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentType));

    }

    async paymentMethod(paymentMethod: PaymentObject): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));

    }

    async actionPayment(actionPayment: PaymentObject): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentMethod(actionPayment));
        await this.click(PaymentPOSLocator.getLocatorPaymentMethod(actionPayment));

    }

    async paymentInputAmount(inputAmount: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.inputPaymentAmount);
        await this.fill(PaymentPOSLocator.inputPaymentAmount, inputAmount);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }

    async paymentGetOutstandingAmount(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.buttonGetOutstandingPayment);
        await this.click(PaymentPOSLocator.buttonGetOutstandingPayment);
    }

    async paymentCashFullAmount(): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.buttonPayCashFullAmount);
        await this.click(PaymentPOSLocator.buttonPayCashFullAmount);
    }

    async paymentDebitBCA(inputField: PaymentObject, value: string): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorInputPaymentDebit(inputField));
        await this.fill(PaymentPOSLocator.getLocatorInputPaymentDebit(inputField), value);
        await this.expectVisible(PaymentPOSLocator.escapeKeyboard);
        await this.click(PaymentPOSLocator.escapeKeyboard);
    }


}