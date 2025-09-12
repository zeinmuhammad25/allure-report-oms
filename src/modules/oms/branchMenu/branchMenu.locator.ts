import BaseLocator from "../../../base/base-locator";

export default class BranchMenuLocator extends BaseLocator {

    static backGroundPage: string = "//app-branch-menu-list//tbody[@role='rowgroup']";
    static escapeKeyboardBranchMenu: string = "//h5[normalize-space()='Branch Menu Management']";
    static btnFilterCategory = (filterCategory: string): string =>
        `//button[contains(@class,'active-filter-type-button')]//span[normalize-space()='${filterCategory}']`;
    static fieldSearchBranchMenu: string = "//app-branch-menu-list//input[@placeholder='Search menu in selected category']";
    static clearSearchBranchMenu: string = "//app-branch-menu-list//i[@class='glyphicon glyphicon-repeat']";
    static menuCategory = (menuCategory: string): string =>
        `//button//span[contains(normalize-space(),'${menuCategory}')]`;
    static paginationMenuCategory = (arrow: string): string =>
        `//app-branch-menu-list//i[@class='glyphicon glyphicon-arrow-${arrow}']`;
    static selectChecker = (checker: string, index: number): string =>
        `(//td[contains(@class,'mat-column-checkerStationID')][normalize-space()='${checker}'])[${index}]`;
    static showFieldQty = (qty: string, index: number): string =>
        `(//td[contains(@class,'mat-column-qty')][normalize-space()='${qty}'])[${index}]`;
    static selectStation = (station: string, index: number): string =>
        `(//td[contains(@class,'mat-column-stationID')][normalize-space()='${station}'])[${index}]`;
    static dropDownCheckerStation = (index: number): string =>
        `(//mat-select//div[@class='mat-select-arrow-wrapper'])[${index}]`;
    static selectCheckerStation = (value: string): string =>
        `//span[@class='mat-option-text' and normalize-space()='${value}']`;
    static fieldQty: string = `//app-branch-menu-list//input[@placeholder='e.g. 9100']`;
    static flagSoldOut = (index: number): string =>
        `(//div[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[${index}]`;
    static paginationBranchMenu = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-branch-menu-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static saveBranchMenu: string = "//app-branch-menu-list//span[normalize-space()='Save']";
    static closePopUpAfterSave: string = "//app-confirm-dialog//span[normalize-space()='Ok']";

}