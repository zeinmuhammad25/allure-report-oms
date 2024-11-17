import BaseScenario from "../../../../base/base-scenario";

export default interface QuickServiceListScenario extends BaseScenario {
    addOrderQuickService(): Promise<void>;

    editOrderQuickService(): Promise<void>;

    fetchSalesNums(): Promise<string[]>;

    clickTopSalesNum(): Promise<void>;

    selectTopSalesNum(): Promise<void>;

    clickLastSalesNum(): Promise<void>;
}