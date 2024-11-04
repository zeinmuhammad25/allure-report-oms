import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MergeTableScenario from "./mergeTable.scenario";

export default class MergeTableComponent extends BaseOmsPage implements MergeTableScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectRoom(roomName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectTable(tableName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}