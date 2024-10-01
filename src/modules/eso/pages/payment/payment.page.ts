import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import PaymentScenario from "./payment.scenario";
import PaymentLocator from "./payment.locator";

export default class PaymentPage extends BaseEsoPage implements PaymentScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentLocator.backButton)
        ]
    }

}