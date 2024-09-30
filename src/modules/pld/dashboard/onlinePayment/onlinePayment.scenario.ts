import BaseScenario from "../../../../base/base-scenario";

export default interface OnlinePaymentScenario extends BaseScenario {
    validateSummaryPaymentDataOnDashboardOnlinePayment(): Promise<void>

    validateDetailPaymentDataOnDashboardOnlinePayment(): Promise<void>

    validateDailyPaymentDataOnDashboardOnlinePayment(): Promise<void>

    validateDownloadDataOnDashboardOnlinePayment(): Promise<void>
}
