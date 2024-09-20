import BaseScenario from "../../../../base/base-scenario";

export default interface SalesSummaryScenario extends BaseScenario {
    validateSalesStatistic(): Promise<void>

    validateDataSalesPerDay(): Promise<void>

    validateDataSalesPerTime(): Promise<void>

    validateDataSalesFraudControl(): Promise<void>

    validateDataSales(): Promise<void>

    downloadSalesSummary(): Promise<void>

}
