import BasePage from "../../../base/base-page";
import Element from "../../../base/objects/Element";
import PaymentLocator from "./payment.locator";
import PaymentScenario from "./payment.scenario";


export default class PaymentPage extends BasePage implements PaymentScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentLocator.salesDateField),

        ];
    }


}