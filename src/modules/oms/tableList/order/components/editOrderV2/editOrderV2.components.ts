import BaseOmsPage from "../../../../base-oms-page";
import EditOrderV2Scenario from "./editOrderV2.scenario";
import Element from "../../../../../../base/objects/Element";


export default class EditOrderV2Components extends BaseOmsPage implements EditOrderV2Scenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }
}