import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SalesRecapScenario from "./salesRecap.scenario";

export default class SalesRecapPage extends BaseOmsPage implements SalesRecapScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }
}