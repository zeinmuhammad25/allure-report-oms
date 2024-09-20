import BaseScenario from "../../../../../../base/base-scenario";

export default interface BranchTabTransactionScenario extends BaseScenario {

    navigateToBranchTab(): Promise<void>;

    makeSureOnlyCashChecked(): Promise<void>;

}
