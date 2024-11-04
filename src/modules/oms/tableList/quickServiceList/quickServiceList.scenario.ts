import BaseScenario from "../../../../base/base-scenario";

export default interface QuickServiceListScenario extends BaseScenario {
    addOrderQuickService(): Promise<void>;

    editOrderQuickService(): Promise<void>;
}