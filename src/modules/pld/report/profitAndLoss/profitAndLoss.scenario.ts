import BaseScenario from "../../../../base/base-scenario";

export default interface ProfitAndLossScenario extends BaseScenario {
    validateDataProfitAndLostByCompany(): Promise<void>

    validateDataProfitAndLostByBranch(): Promise<void>
}
