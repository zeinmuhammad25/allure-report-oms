import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import TroubleshootScenario from "./troubleshoot.scenario";
import TroubleshootLocator from "./troubleshoot.locator";

export default class TroubleshootComponent extends BaseOmsPage implements TroubleshootScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(TroubleshootLocator.testPrintButton)
        ];
    }

    async testPrint(): Promise<void> {
        await this.expectVisible(TroubleshootLocator.testPrintButton);
        await this.click(TroubleshootLocator.testPrintButton);
    }
}