import BaseScenario from "../../../../base/base-scenario";

export default interface SearchScenario extends BaseScenario {
    inputMenuName(menu: string): Promise<void>

    addMenu(menuID: number): Promise<void>

    increaseQuantity(menuID: number): Promise<void>

    decreaseQuantity(menuID: number): Promise<void>
}