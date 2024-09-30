import BaseScenario from "../../../../base/base-scenario";
import {EsoMode} from "../../objects/esoMode";

export default interface ModeScenario extends BaseScenario {
    selectMode(mode: EsoMode): Promise<void>

    changeLanguage(useEnglish: boolean): Promise<void>

    openCompanyBusinessHour(): Promise<void>

    contactUs(): Promise<void>

    visitUs(): Promise<void>
}