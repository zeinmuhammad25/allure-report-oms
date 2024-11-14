import BaseScenario from "../../../../../../base/base-scenario";

export default interface BranchTabNoteScenario extends BaseScenario {

    navigateToBranchNoteTab(): Promise<void>;

    cleanUpBranchNoteData(): Promise<void>;

    editBranchNoteFooter(): Promise<void>;

}
