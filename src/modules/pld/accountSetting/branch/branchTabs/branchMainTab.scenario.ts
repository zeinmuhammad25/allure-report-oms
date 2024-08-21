import BaseScenario from "../../../../../base/base-scenario";

export default interface BranchMainTabScenario extends BaseScenario {

    performEditBranchName(): Promise<void>;
}
