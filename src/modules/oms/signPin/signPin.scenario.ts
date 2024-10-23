import BaseScenario from "../../../base/base-scenario";
import {promises} from "node:dns";

export default interface signPinScenario extends BaseScenario {
    inputPinByTouch(pin: string): Promise<void>;

    inputPinByKeyboard(pin: string): Promise<void>;

    clearPin(): Promise<void>;

    submitPinValidateStartDayYes(): Promise<void>;

    submitPinValidateStartDayNo(): Promise<void>;

    submitPinNoUnregisteredUser(): Promise<void>;
}