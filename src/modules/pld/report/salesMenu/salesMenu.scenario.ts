import BaseScenario from "../../../../base/base-scenario";

export default interface SalesMenuScenario extends BaseScenario {
    validateFilterAndShowDataSalesMenuOnSalesMenu(): Promise<void>

    validateFilterAndDownload(): Promise<void>
}
