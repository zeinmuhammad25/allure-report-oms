import BaseScenario from "../../../../../base/base-scenario";

export default interface MenuManagementEditScenario extends BaseScenario {

    setOutOfStockTrue(): Promise<void>;

    setOutOfStockFalse(): Promise<void>;
}