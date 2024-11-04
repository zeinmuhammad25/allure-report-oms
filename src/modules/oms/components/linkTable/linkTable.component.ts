import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
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
            Element.ofSelector(LinkTableLocator.CancelButton),
            Element.ofSelector(LinkTableLocator.selectTableList('AC 1')),
            Element.ofSelector(LinkTableLocator.selectTableList('AC 2')),
            Element.ofSelector(LinkTableLocator.selectTableList('AC 3')),
            Element.ofSelector(LinkTableLocator.selectTableList('AC 4')),
            Element.ofSelector(LinkTableLocator.selectTableList('SR 1')),
            Element.ofSelector(LinkTableLocator.selectTableList('SR 2')),
            Element.ofSelector(LinkTableLocator.selectTableList('SR 3')),
            Element.ofSelector(LinkTableLocator.selectTableList('SR 4')),

        ];

    }

    async userSingleLinkTable(): Promise<void> {
        await this.click(LinkTableLocator.buttonLinkTable);
        await this.expectVisible(LinkTableLocator.popupPage);
        if (await this.isInvisible(LinkTableLocator.selectTableList('AC 1'))) {
            await this.click(LinkTableLocator.selectTableList('AC 1'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('AC 2'))) {
            await this.click(LinkTableLocator.selectTableList('AC 2'));
            await this.click(LinkTableLocator.CancelButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('AC 3'))) {
            await this.click(LinkTableLocator.selectTableList('AC 3'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('AC 4'))) {
            await this.click(LinkTableLocator.selectTableList('AC 4'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('SR 1'))) {
            await this.click(LinkTableLocator.selectTableList('SR 1'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('SR 2'))) {
            await this.click(LinkTableLocator.selectTableList('SR 2'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('SR 3'))) {
            await this.click(LinkTableLocator.selectTableList('SR 3'));
            await this.click(LinkTableLocator.applyButton);
        } else if (await this.isInvisible(LinkTableLocator.selectTableList('SR 4'))) {
            await this.click(LinkTableLocator.selectTableList('SR 4'));
            await this.click(LinkTableLocator.applyButton);
        } else {
            await this.click(LinkTableLocator.CancelButton);
        }

    }

    async userMultiLinkTable(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userUnLinkTable(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userLinkTableMultiData(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}