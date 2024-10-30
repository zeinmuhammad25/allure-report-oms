import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import TroubleshootScenario from "./troubleshoot.scenario";

export default class TroubleshootComponent extends BaseOmsPage implements TroubleshootScenario {
    pageUrl: () => string;
    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }
}