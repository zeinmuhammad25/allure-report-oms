import BaseScenario from "../../../../../base/base-scenario";

export default interface AddMenuScenario extends BaseScenario {
    addQuantity(): Promise<void>

    confirm(): Promise<void>

    goBack(): Promise<void>
}