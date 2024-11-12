import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MergeTableScenario from "./mergeTable.scenario";
import MergeTableLocator from "./mergeTable.locator";

export default class MergeTableComponent extends BaseOmsPage implements MergeTableScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectRoom(roomName: string): Promise<void> {
        await this.expectVisible(MergeTableLocator.tableButton(roomName))
        await this.click(MergeTableLocator.tableButton(roomName))
    }

    async selectTable(tableName: string): Promise<void> {
        await this.expectVisible(MergeTableLocator.tableButton(tableName))
        await this.click(MergeTableLocator.tableButton(tableName))
    }

    async applyMergeTable(): Promise<void> {
        await this.expectVisible(MergeTableLocator.applyButton)
        await this.click(MergeTableLocator.applyButton)
    }

    async cancelMergeTable(): Promise<void> {
        await this.expectVisible(MergeTableLocator.applyButton)
        await this.click(MergeTableLocator.applyButton)
    }
}