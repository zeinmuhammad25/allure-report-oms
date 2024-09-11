import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabNoteLocator extends BaseLocator {

    static branchNoteTab: string = "//div[contains(text(),'Pengaturan Nota')]";
    static branchNoteAlert: string = "//div[@class='alert-catakan mb-3 ng-star-inserted']";
    static branchNoteEditButton: string = "//span[@class='action-edit']";
    static branchNoteFooterTextField: string = "//textarea[@id='printingFooter']";
    static branchNoteSaveButton: string = "//button[@class='button button-orange button-small']";
    static branchNoteFooterUpdateText: string = "//div[normalize-space()='Test Update Footer 01']";
    static branchNoteFooterOriginText: string = "//div[normalize-space()='Powered by ESB']";
    static branchNoteTabSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
}