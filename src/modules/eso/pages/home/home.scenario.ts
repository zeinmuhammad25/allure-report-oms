import BaseScenario from "../../../../base/base-scenario";
import {EsoMode} from "../../objects/esoMode";
import {Language} from "../../objects/language";

export default interface HomeScenario extends BaseScenario {
    inputTableNumber(table: string): Promise<void>

    changeMode(mode: EsoMode): Promise<void>

    changeLanguage(language: Language): Promise<void>

    selectCategory(categoryName: string): Promise<void>

    goToSearch(): Promise<void>

    goToBranchDetail(): Promise<void>

    goToOrderHistory(): Promise<void>

    goToPrivacyPolicy(): Promise<void>

    goToLoginPage(): Promise<void>

    goBack(): Promise<void>
}