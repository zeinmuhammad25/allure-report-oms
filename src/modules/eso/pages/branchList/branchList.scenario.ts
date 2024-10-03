import BaseScenario from "../../../../base/base-scenario";
import {Language} from "../../objects/language";

export default interface BranchListScenario extends BaseScenario {
    gotoLocationPage(): Promise<void>

    gotoHistoryPage(): Promise<void>

    changeLanguage(language: Language): Promise<void>

    searchBranch(branchName: string): Promise<void>

    selectBranch(branchName: string): Promise<void>
}