import BaseScenario from "../../../../base/base-scenario";

export default interface PaymentScenario extends BaseScenario {
    validateFilterAndShowDataPaymentReport():Promise<void>
    validateFilterAndShowDataDetailPaymentReport():Promise<void>
    validateDownloadDataDetailPayment():Promise<void>
}

