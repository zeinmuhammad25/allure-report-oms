import BaseScenario from "../../../base/base-scenario";

export default interface StartDayScenario extends BaseScenario {
    inputStartingCash(inputCash:string): Promise<void>

    confirmStartingCash(): Promise<void>

    notificationSuccessStartDay(): Promise<void>

    popUpShiftInZero(): Promise<void>

}