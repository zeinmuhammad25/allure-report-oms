import BaseScenario from "../../../../base/base-scenario";

export default interface SalesDetailScenario extends BaseScenario {
    validateFilterAndShowData(): Promise<void>
    validateShowDataWithTransactionNumber(): Promise<void>
    validateShowDataAndDownload(): Promise<void>
}
