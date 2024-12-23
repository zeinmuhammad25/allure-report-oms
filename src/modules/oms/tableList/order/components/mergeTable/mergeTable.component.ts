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
        await this.expectVisible(MergeTableLocator.tableButton(roomName));
        await this.click(MergeTableLocator.tableButton(roomName));
    }

    async selectTable(tableName: string,status: "active" | "disable" | "occupied" = "active"): Promise<void> {
        await this.expectVisible(MergeTableLocator.tableButton(tableName,status));
        if (status!="disable"){
            await this.click(MergeTableLocator.tableButton(tableName,status));
        }
    }

    async applyMergeTable(actionOccupied: boolean = true): Promise<void> {
        await this.expectVisible(MergeTableLocator.applyButton);
        await this.click(MergeTableLocator.applyButton);
        if (await this.isVisible(MergeTableLocator.popUpOccupied)) {
            const actionLocator = actionOccupied ? MergeTableLocator.yesOccupied : MergeTableLocator.noOccupied;
            await this.expectVisible(actionLocator);
            await this.click(actionLocator);
        }
    }

    async cancelMergeTable(): Promise<void> {
        await this.expectVisible(MergeTableLocator.cancelButton);
        await this.click(MergeTableLocator.cancelButton);
    }


}
