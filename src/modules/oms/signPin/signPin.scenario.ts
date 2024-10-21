import BaseScenario from "../../../base/base-scenario";

export default interface signPinScenario extends BaseScenario {
    inputPinByTouch(pin: string): Promise<void>
    inputPinByKeyboard(pin: string): Promise<void>
    clearPin():Promise<void>
}