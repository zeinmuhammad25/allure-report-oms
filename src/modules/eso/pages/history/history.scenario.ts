import BaseScenario from "../../../../base/base-scenario";

export default interface HistoryScenario extends BaseScenario {
    showOrderHistory(): Promise<void>

    showReservationHistory(): Promise<void>

    selectItem(): Promise<void>

    reorder(): Promise<void>
}