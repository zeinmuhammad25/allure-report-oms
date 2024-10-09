import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import PaymentScenario from "./payment.scenario";
import PaymentLocator from "./payment.locator";
import {PaymentMethod} from "../../objects/paymentMethod";
import OrderSummaryPage from "../order/orderSummary/orderSummary.page";

export default class PaymentPage extends BaseEsoPage implements PaymentScenario {
    private apiPaymentValidate: string = '/eso-api/web/qsv1/payment/validate';
    private apiPromotion: string = '/eso-api/web/qsv1/promotion';
    private apiChceckItem: string = '/eso-api/web/qsv1/order/check-items';
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentLocator.backButton)
        ]
    }

    async inputFullName(fullName: string): Promise<void> {
        await this.expectVisible(PaymentLocator.fullNameField);
        await this.fill(PaymentLocator.fullNameField, fullName);
    }

    async inputPhone(phone: string): Promise<void> {
        await this.expectVisible(PaymentLocator.phoneField);
        await this.fill(PaymentLocator.phoneField, phone);
    }

    async inputEmail(email: string): Promise<void> {
        await this.expectVisible(PaymentLocator.emailField);
        await this.fill(PaymentLocator.emailField, email);
    }

    async inputTableNumber(tableNumber: string): Promise<void> {
        await this.expectVisible(PaymentLocator.tableNameField);
        await this.fill(PaymentLocator.tableNameField, tableNumber);
    }

    async selectPaymentType(cash: boolean = false): Promise<void> {
        if (cash) {
            await this.expectVisible(PaymentLocator.onlinePaymentButton);
            await this.click(PaymentLocator.onlinePaymentButton);
        } else {
            await this.expectVisible(PaymentLocator.offlinePaymentButton);
            await this.click(PaymentLocator.offlinePaymentButton);
        }
    }

    async selectPaymentMethod(paymentMethod: PaymentMethod): Promise<void> {
        await this.expectVisible(PaymentLocator.paymentMethodRadioButton(paymentMethod));
        await this.click(PaymentLocator.paymentMethodRadioButton(paymentMethod));
    }

    async addPromotion(): Promise<void> {
        await this.expectVisible(PaymentLocator.addPromotionButton);
        await this.click(PaymentLocator.addPromotionButton);
        await this.waitForResponse(this.apiPromotion);
    }

    async expandPaymentTotal(): Promise<void> {
        await this.expectVisible(PaymentLocator.paymentTotalButton);
        await this.click(PaymentLocator.paymentTotalButton);
    }

    async confirmPayment(): Promise<void> {
        await this.expectVisible(PaymentLocator.payButton);
        await this.click(PaymentLocator.payButton);
        await this.expectVisible(PaymentLocator.payConfirmButton);
        await this.click(PaymentLocator.payConfirmButton);
        await this.waitForResponse(this.apiPaymentValidate);
    }

    async confirmPaymentOvo(): Promise<void> {
        await this.expectVisible(PaymentLocator.payButton);
        await this.click(PaymentLocator.payButton);
        await this.expectVisible(PaymentLocator.payConfirmButton);
        await this.click(PaymentLocator.payConfirmButton);
        await this.waitForResponse(this.apiChceckItem);
        await this.expectVisible(PaymentLocator.ovoSendButton);
        await this.click(PaymentLocator.ovoSendButton);
        await this.waitForUrl('/ovo-confirmation');
        await this.click(PaymentLocator.ovoConfirmationOkButton);
        await this.wait(300);
    }
}