import BaseLocator from "../../../../../base/base-locator";

export default class BranchMainTabLocator extends BaseLocator {

    static branchTabMain: string = "//div[contains(text(),'Utama')]";
    static branchTabNameField: string = "//input[@id='branchName']";
    static branchTabSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTabCancelButton: string = "//button[@class='button button-outline-red button-small ng-star-inserted']";
}