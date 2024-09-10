import BaseScenario from "../../../../../../base/base-scenario";

export default interface BranchTabSalesModeScenario extends BaseScenario {

    navigateToSalesModeTab(): Promise<void>;

    salesModeAddNew(): Promise<void>;

    salesModeDelete(): Promise<void>;


}
