import Element from "../../../base/objects/Element";
import BaseOmsPage from "../base-oms-page";
import {ToolsTabs} from "./ToolsTabs";
import ToolsScenario from "./tools.scenario";

export default class ToolsPage extends BaseOmsPage implements ToolsScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectTab(tabName: ToolsTabs): Promise<void> {
        throw new Error("Method not implemented.");
    }

}