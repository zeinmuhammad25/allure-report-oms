import BaseScenario from "../../../base/base-scenario";

export default interface StartDayScenario extends BaseScenario {
    inputStartingCash(): Promise<void>

    confirmStartingCash(): Promise<void>

    notificationSuccessStartDay(): Promise<void>

}