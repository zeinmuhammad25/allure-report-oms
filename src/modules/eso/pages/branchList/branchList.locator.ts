import BaseLocator from "../../../../base/base-locator";

export default class BranchListLocator extends BaseLocator {
    static locationSection: string = "//button[@id='bl-current-location']";
    static languageButton: string = "//button[@class='change-language']//i[@class='icon-svg ic-caret-down-fill ms-1']";
    static historyButton: string = "//button[@class='change-language']/i[@class='icon-svg ic-order-history']";
    static companyInfo: string = "//section[@id='company-info']";
    static inputField: string = "//input[@id='bl-search-branch']";
    static branchItems: string = "//app-branch-card";

    static getBranchByName = (branchName: string): string => `//app-branch-card//h4[contains(text(),'${branchName}')]`;
    static nearestBranch: string = "//section[@id='branch-list']";
    static nonNearestBranch: string = "//section[@id='branch-list-non-nearest']";

    //Language Dialog
    static idLanguage: string = "//app-language-dialog//div[text()='Indonesia']";
    static enLanguage: string = "//app-language-dialog//div[text()='English']";
    static languageCloseButton: string = "//app-language-dialog//i[@class='icon-svg ic-close close-dialog bg-grey-800 scale-2x']";


}