import Element from "../../../base/objects/Element";
import BaseOmsPage from "../base-oms-page";
import {ToolsTabs} from "./ToolsTabs";
import ToolsScenario from "./tools.scenario";
import ToolsLocator from "./tools.locator";

export default class ToolsPage extends BaseOmsPage implements ToolsScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ToolsLocator.nextButton),
            Element.ofSelector(ToolsLocator.previousButton)
        ];
    }

    async selectTab(tabName: ToolsTabs): Promise<void> {
        await this.expectVisible(ToolsLocator.tabButton(tabName));
        await this.click(ToolsLocator.tabButton(tabName));
    }

    async nextTab(): Promise<void> {
        await this.expectVisible(ToolsLocator.nextButton);
        await this.click(ToolsLocator.nextButton);
    }

    async previousTab(): Promise<void> {
        await this.expectVisible(ToolsLocator.previousButton);
        await this.click(ToolsLocator.previousButton);
    }

}