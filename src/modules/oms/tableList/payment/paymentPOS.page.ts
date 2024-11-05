import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import PaymentPosScenario from "./paymentPOS.scenario";
import {PaymentList} from "./PaymentList";
import PaymentPOSLocator from "./paymentPOS.locator";

export default class PaymentPOSPage extends BaseOmsPage implements PaymentPosScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentPOSLocator.buttonApplyMember)
        ];
    }

    async paymentType(paymentType: PaymentList): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentType));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentType));

    }

    async paymentMethod(paymentMethod: PaymentList): Promise<void> {
        await this.expectVisible(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));
        await this.click(PaymentPOSLocator.getLocatorPaymentType(paymentMethod));

    }

}