import BaseScenario from "../../../../base/base-scenario";

export default interface BookKeepingScenario extends BaseScenario {
    validateStatisticalIncomeDataOnDashboardBookKeeping(): Promise<void>

    validateStatisticalExpenditureDataOnDashboardBookKeeping(): Promise<void>

    validateStatisticalProfitDataOnDashboardBookKeeping(): Promise<void>

    validateTransactionIncomeChartOnDashboardBookKeeping(): Promise<void>

    validateTransactionExpenditureChartOnDashboardBookKeeping(): Promise<void>

    validateTransactionProfitChartOnDashboardBookKeeping(): Promise<void>

    validateSupplierChartOnDashboardBookKeeping(): Promise<void>
}