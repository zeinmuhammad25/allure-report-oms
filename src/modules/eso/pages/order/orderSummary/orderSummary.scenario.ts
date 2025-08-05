import BaseScenario from "../../../../../base/base-scenario";

export default interface OrderSummaryScenario extends BaseScenario {
    goToHistory(): Promise<void>

    goToNewOrder(): Promise<void>

    goBack(): Promise<void>
}