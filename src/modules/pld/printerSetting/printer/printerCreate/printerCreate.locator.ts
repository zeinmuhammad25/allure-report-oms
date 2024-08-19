import BaseLocator from "../../../../../base/base-locator";

export default class PrinterCreateLocator extends BaseLocator {

    static printerNameField: string = "//input[@id='stationName']";
    static printerNameSuggestion1: string = "//button[normalize-space()='Dapur']";
    static printerNameSuggestion2: string = "//button[normalize-space()='Kasir']";
    static printerNameSuggestion3: string = "//button[normalize-space()='Checker']";
    static printerBranchDropdown: string = "//nz-select-search[@class='ant-select-selection-search ng-star-inserted']";
    static printerBranchOption1: string = "//nz-option-item[@title][1]";
    static printerBranchOption2: string = "//nz-option-item[@title][1]";
    static printerViewDropdown: string = "//nz-select-item[@title='Standar']";
    static printerViewType1: string = "//nz-option-item[1]";
    static printerViewType2: string = "//nz-option-item[2]";
    static printerSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";


}