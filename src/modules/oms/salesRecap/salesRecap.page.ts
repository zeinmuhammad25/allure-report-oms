import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SalesRecapScenario from "./salesRecap.scenario";
import SalesRecapLocator from "./salesRecap.locator";

export default class SalesRecapPage extends BaseOmsPage implements SalesRecapScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async salesRecapTab(tabSection: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.salesRecapTabSection(tabSection));
        await this.click(SalesRecapLocator.salesRecapTabSection(tabSection));
    }

}