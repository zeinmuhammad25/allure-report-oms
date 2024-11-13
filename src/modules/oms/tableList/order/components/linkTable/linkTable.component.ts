import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import LinkTableScenario from "./linkTable.scenario";
import LinkTableLocator from "./linkTable.locator";

export default class LinkTableComponent extends BaseOmsPage implements LinkTableScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(LinkTableLocator.buttonLinkTable),
            Element.ofSelector(LinkTableLocator.buttonNextPage),
            Element.ofSelector(LinkTableLocator.buttonBackPage),
            Element.ofSelector(LinkTableLocator.applyButton),
            Element.ofSelector(LinkTableLocator.cancelButton),
            Element.ofSelector(LinkTableLocator.selectTableList("AC 1")),
            Element.ofSelector(LinkTableLocator.selectTableList("AC 2")),
            Element.ofSelector(LinkTableLocator.selectTableList("AC 3")),
            Element.ofSelector(LinkTableLocator.selectTableList("AC 4")),
            Element.ofSelector(LinkTableLocator.selectTableList("SR 1")),
            Element.ofSelector(LinkTableLocator.selectTableList("SR 2")),
            Element.ofSelector(LinkTableLocator.selectTableList("SR 3")),
            Element.ofSelector(LinkTableLocator.selectTableList("SR 4"))

        ];

    }

    async singleLinkTable(): Promise<void> {
        await this.click(LinkTableLocator.buttonLinkTable);
        await this.expectVisible(LinkTableLocator.popupPage);
        await this.isVisible(LinkTableLocator.buttonActiveTable);
        await this.click(LinkTableLocator.buttonActiveTable);
        await this.click(LinkTableLocator.applyButton);
    }

    async userMultiLinkTable(): Promise<void> {
        await this.click(LinkTableLocator.buttonLinkTable);
        await this.expectVisible(LinkTableLocator.popupPage);
        let i=0;
        let isElementPresent = true;
        while (isElementPresent){
            const selector = `(//app-table-link//app-grid-table-link//button[not(@disabled)]/span/div)[${i + 1}]`;
            isElementPresent = await this.isVisible(selector)
            if (isElementPresent) {
                await this.click(selector)
                i++;
            }
            await this.wait(500)
        }
        await this.click(LinkTableLocator.applyButton);
    }

    async userCancelLink():Promise<void>{
        await this.click(LinkTableLocator.buttonLinkTable);
        await this.expectVisible(LinkTableLocator.popupPage);
        await this.isVisible(LinkTableLocator.buttonActiveTable);
        await this.click(LinkTableLocator.cancelButton);
    }



}