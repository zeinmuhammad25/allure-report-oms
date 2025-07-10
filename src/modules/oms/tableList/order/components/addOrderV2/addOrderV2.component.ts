import BaseOmsPage from "../../../../base-oms-page";
import AddOrderV2Scenario from "./addOrderV2.scenario";
import Element from "../../../../../../base/objects/Element";

export default class AddOrderV2Component extends BaseOmsPage implements AddOrderV2Scenario{
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [

        ];
    }
}