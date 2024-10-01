import BaseScenario from "../../../../base/base-scenario";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default interface ModeScenario extends BaseScenario {
    selectMode(mode: EsoMode): Promise<void>

    changeLanguage(language: Language): Promise<void>

    openCompanyBusinessHour(): Promise<void>

    contactUs(): Promise<void>

    visitUs(): Promise<void>
}