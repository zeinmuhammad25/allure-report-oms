import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabNoteLocator extends BaseLocator {

    static branchNoteTab: string = "//div[contains(text(),'Pengaturan Nota')]";
    static branchNoteAlert: string = "//div[@class='alert-catakan mb-3 ng-star-inserted']";
    static branchNoteEditButton: string = "//span[@class='action-edit']";
    static branchNoteFooterTextField: string = "//textarea[@id='printingFooter']";
    static branchNoteSaveButton: string = "//button[@class='button button-orange button-small']";




}