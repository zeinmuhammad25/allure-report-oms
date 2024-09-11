import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import Element from "../../../../../../base/objects/Element";
import BranchTabNoteScenario from "./branchTabNote.scenario";
import BranchTabNoteLocator from "./branchTabNote.locator";


export default class BranchTabNotePage extends BasePosLitePage implements BranchTabNoteScenario {
    private noteFooterOriginText = "Powered by ESB";
    private noteFooterUpdateText = "Test Update Footer 01";



    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [];
    }

    async navigateToBranchNoteTab(): Promise<void> {
        await this.click(BranchTabNoteLocator.branchNoteTab);
        await this.expectVisible(BranchTabNoteLocator.branchNoteAlert);
    }


    async cleanUpBranchNoteData(): Promise<void> {
        await this.click(BranchTabNoteLocator.branchNoteEditButton);
        await this.clear(BranchTabNoteLocator.branchNoteFooterTextField);
        await this.fill(BranchTabNoteLocator.branchNoteFooterTextField, this.noteFooterOriginText);
        await this.click(BranchTabNoteLocator.branchNoteSaveButton);
        await this.expectVisible(BranchTabNoteLocator.branchNoteFooterOriginText);
        await this.wait(5000);
        await this.click(BranchTabNoteLocator.branchNoteTabSaveButton);

    }

    async editBranchNoteFooter(): Promise<void> {
        await this.expectVisible(BranchTabNoteLocator.branchNoteFooterOriginText);
        await this.click(BranchTabNoteLocator.branchNoteEditButton);
        await this.clear(BranchTabNoteLocator.branchNoteFooterTextField);
        await this.fill(BranchTabNoteLocator.branchNoteFooterTextField, this.noteFooterUpdateText);
        await this.click(BranchTabNoteLocator.branchNoteSaveButton);
        await this.expectVisible(BranchTabNoteLocator.branchNoteFooterUpdateText);
        await this.wait(5000);
        await this.click(BranchTabNoteLocator.branchNoteTabSaveButton);

    }




}