import BaseScenario from "../../../../base/base-scenario";

export default interface BranchListScenario extends BaseScenario {
    gotoLocationPage():Promise<void>
    changeLanguage(useEnglish:boolean):Promise<void>
    searchBranch(branchName:string):Promise<void>
    selectBranch(branchName:string):Promise<void>
}