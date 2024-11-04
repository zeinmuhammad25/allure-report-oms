import BaseOmsPage from "../../base-oms-page";
import Element from "../../../../base/objects/Element";
import QuickServiceListScenario from "./quickServiceList.scenario";
import QuickServiceListLocator from "./quickServiceList.locator";

export default class QuickServiceListPage extends BaseOmsPage implements QuickServiceListScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(QuickServiceListLocator.buttonAddQuickService)
        ];
    }

    async addOrderQuickService(): Promise<void> {
        throw new Error("Method not implemented");
    }

    async EditOrderQuickService(): Promise<void> {
        throw new Error("Method not implemented");
    }
}