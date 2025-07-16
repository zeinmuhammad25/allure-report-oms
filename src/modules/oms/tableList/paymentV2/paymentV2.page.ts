import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import PaymentV2Scenario from "./paymentV2.scenario";

export default class PaymentV2Page extends BaseOmsPage implements PaymentV2Scenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

}