import Element from "../../../../base/objects/Element";
import PaymentMethodScenario from "./paymentMethod.scenario";
import PaymentMethodLocator from "./paymentMethod.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class PaymentMethodPage extends BasePosLitePage implements PaymentMethodScenario {


    pageUrl = (): string => this.urls.get.accountSetting.paymentMethodUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentMethodLocator.paymentMethodAddButton),
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