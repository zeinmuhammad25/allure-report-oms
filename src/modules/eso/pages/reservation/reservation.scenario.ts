import BaseScenario from "../../../../base/base-scenario";

export default interface ReservationScenario extends BaseScenario {
    setDay(): Promise<void>

    setTime(): Promise<void>

    goBack(): Promise<void>
}