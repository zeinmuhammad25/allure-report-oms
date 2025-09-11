import BaseOmsPage from "../base-oms-page";
import BranchMenuScenario from "./branchMenu.scenario";
import Element from "../../../base/objects/Element";

export default class BranchMenuPage extends BaseOmsPage implements BranchMenuScenario{
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }
}