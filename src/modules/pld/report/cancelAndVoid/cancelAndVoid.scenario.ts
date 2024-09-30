import BaseScenario from "../../../../base/base-scenario";

export default interface CancelAndVoidScenario extends BaseScenario {
    validateCancelAndVoidWhenCancelTable(): Promise<void>

    validateCancelAndVoidWhenVoidTransaction(): Promise<void>

    validateDownloadCancelAndVoidReport(): Promise<void>
}
