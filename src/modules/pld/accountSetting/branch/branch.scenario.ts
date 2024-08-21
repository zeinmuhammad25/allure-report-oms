import BaseScenario from "../../../../base/base-scenario";

export default interface BranchScenario extends BaseScenario {

    navigateToBranchSetting(): Promise<void>;

    searchBranchData(): Promise<void>;

    searchBranchDataEdit(): Promise<void>;
}
