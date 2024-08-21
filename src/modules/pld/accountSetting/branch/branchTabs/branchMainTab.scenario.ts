import BaseScenario from "../../../../../base/base-scenario";

export default interface BranchMainTabScenario extends BaseScenario {

    performResetBranchName(): Promise<void>;
}
