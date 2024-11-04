import BaseScenario from "../../../../base/base-scenario";

export default interface QuickServiceListScenario extends BaseScenario {
    addOrderQuickService(): Promise<void>;

    EditOrderQuickService(): Promise<void>;
}