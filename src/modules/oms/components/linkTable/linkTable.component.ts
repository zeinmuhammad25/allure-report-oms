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
            Element.ofSelector(LinkTableLocator.applyOrCancelButton("Apply")),
            Element.ofSelector(LinkTableLocator.applyOrCancelButton("Cancel")),
            Element.ofSelector(LinkTableLocator.tableAc1),
            Element.ofSelector(LinkTableLocator.tableAc2),
            Element.ofSelector(LinkTableLocator.tableAc3),
            Element.ofSelector(LinkTableLocator.tableAc4),
            Element.ofSelector(LinkTableLocator.tableSr1),
            Element.ofSelector(LinkTableLocator.tableSr2),
            Element.ofSelector(LinkTableLocator.tableSr3),
            Element.ofSelector(LinkTableLocator.tableSr4)
        ];

    }

    async userSingleLinkTable(): Promise<void> {
        await this.click(LinkTableLocator.buttonLinkTable);
        await this.expectVisible(LinkTableLocator.popupPage);
        if (await this.isInvisible(LinkTableLocator.tableAc1)) {
            await this.click(LinkTableLocator.tableAc1);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableAc2)) {
            await this.click(LinkTableLocator.tableAc2);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableAc3)) {
            await this.click(LinkTableLocator.tableAc3);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableAc4)) {
            await this.click(LinkTableLocator.tableAc4);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableSr1)) {
            await this.click(LinkTableLocator.tableSr1);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableSr2)) {
            await this.click(LinkTableLocator.tableSr2);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableSr3)) {
            await this.click(LinkTableLocator.tableSr3);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else if (await this.isInvisible(LinkTableLocator.tableSr4)) {
            await this.click(LinkTableLocator.tableSr4);
            await this.click(LinkTableLocator.applyOrCancelButton("Apply"));
        } else {
            await this.click(LinkTableLocator.applyOrCancelButton("Cancel"));
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