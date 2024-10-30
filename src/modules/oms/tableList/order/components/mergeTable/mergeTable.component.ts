import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MergeTableScenario from "./mergeTable.scenario";

export default class MergeTableComponent extends BaseOmsPage implements MergeTableScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }
}