import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import PaymentMethodScenario from "./paymentMethod.scenario";
import PaymentMethodLocator from "./paymentMethod.locator";


export default class PaymentMethodPage extends BasePage implements PaymentMethodScenario {


    pageUrl = (): string => Urls.accbranch;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/account-setting/payment-method/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentMethodLocator.addPaymentMethodButton),
            Element.ofSelector(PaymentMethodLocator.paymentMethodNameSearch),
            Element.ofSelector(PaymentMethodLocator.paymentMethodTypeSearch),
            Element.ofSelector(PaymentMethodLocator.branchSearch),
            Element.ofSelector(PaymentMethodLocator.statusSearch),
            Element.ofSelector(PaymentMethodLocator.paymentMethodNameColumn),
            Element.ofSelector(PaymentMethodLocator.paymentMethodTypeColumn),
            Element.ofSelector(PaymentMethodLocator.branchColumn),
            Element.ofSelector(PaymentMethodLocator.statusNameColumn),
        ];
    }


}