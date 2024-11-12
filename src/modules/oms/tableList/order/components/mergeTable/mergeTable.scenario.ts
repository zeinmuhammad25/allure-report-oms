import BaseScenario from "../../../../../../base/base-scenario";

export default interface MergeTableScenario extends BaseScenario {
    selectRoom(roomName: string): Promise<void>;

    selectTable(tableName: string): Promise<void>;

    applyMergeTable(): Promise<void>;

    cancelMergeTable(): Promise<void>;
}