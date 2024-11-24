import BaseScenario from "../../../base/base-scenario";

export default interface TableListScenario extends BaseScenario {
    gotoQuickService(): Promise<void>;

    gotoListBook(): Promise<void>;

    gotoSalesList(): Promise<void>;

    nextPage(): Promise<void>;

    previousPage(): Promise<void>;

    selectRoom(roomName: string): Promise<void>;

    selectTable(tableName: string): Promise<void>;

    deleteAllQuickService(): Promise<void>;

    deleteAllDineIn(): Promise<void>;
}