import BaseScenario from "../../../../base/base-scenario";

export default interface QuickServiceListScenario extends BaseScenario {
    addOrderQuickService(): Promise<void>;

    editOrderQuickService(): Promise<void>;

    fetchSalesNums(): Promise<string[]>;

    clickTopSalesNum(): Promise<void>;

    gotoLastPage(): Promise<void>;

    selectSalesNum(salesNum: string | "first" | "last"): Promise<void>;

    quickServiceHasData(): Promise<boolean>;

    clickLastSalesNum(): Promise<void>;
}