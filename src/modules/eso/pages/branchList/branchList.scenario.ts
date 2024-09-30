import BaseScenario from "../../../../base/base-scenario";

export default interface BranchListScenario extends BaseScenario {
    gotoLocationPage():Promise<void>
    changeLanguage(useEnglish:boolean):Promise<void>
    searchBranch(branchNmae:string):Promise<void>
    selectBranch(branchNmae:string):Promise<void>
}