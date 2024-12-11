import BaseScenario from "../../../base/base-scenario";

export default interface TableListScenario extends BaseScenario {
    goHere(): Promise<void>;

    gotoQuickService(): Promise<void>;

    gotoListBook(): Promise<void>;

    gotoSalesList(): Promise<void>;

    nextPage(): Promise<void>;

    previousPage(): Promise<void>;

    selectRoom(roomName: string): Promise<void>;

    selectTable(tableName: string): Promise<void>;

    deleteAllQuickService(): Promise<void>;

    deleteAllDineIn(): Promise<void>;

    cancelAllQuickServices(): Promise<void>;

    cancelAllTables(): Promise<void>;

    deleteSplitBill(splitName: "Main Bill" | "Bill 2" | "Bill 3" | "Bill 4"): Promise<void>;

    selectTableSplitBill(splitName: "Main Bill" | "Bill 2" | "Bill 3" | "Bill 4"): Promise<void>;
}