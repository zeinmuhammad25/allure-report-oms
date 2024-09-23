import BaseScenario from "../../../../base/base-scenario";

export default interface PaymentScenario extends BaseScenario {
    validateFilterAndShowDataFromPaymentMethod():Promise<void>
    validateFilterAndShowDataSalesDetail():Promise<void>
    validateDownloadDataPaymentReport():Promise<void>
}

