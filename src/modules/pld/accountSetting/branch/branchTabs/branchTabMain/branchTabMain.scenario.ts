import BaseScenario from "../../../../../../base/base-scenario";

export default interface BranchTabMainScenario extends BaseScenario {

    performResetBranchName(): Promise<void>;

    performEditBranchName(): Promise<void>;
}
