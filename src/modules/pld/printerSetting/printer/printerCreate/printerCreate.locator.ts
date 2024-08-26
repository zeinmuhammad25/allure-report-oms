import BaseLocator from "../../../../../base/base-locator";

export default class PrinterCreateLocator extends BaseLocator {

    static printerCreatePageTitle: string = "//h2[normalize-space()='Pengaturan Printer']";
    static printerNameField: string = "//input[@id='stationName']";

    //printerNameSuggestion
    static printerNameSuggestionFirst: string = "//div[contains(@class, 'd-flex')]//button[contains(text(), 'Dapur')]";
    static printerNameSuggestionSecond: string = "//div[contains(@class, 'd-flex')]//button[contains(text(), 'Kasir')]";
    static printerNameSuggestionThird: string = "//div[contains(@class, 'd-flex')]//button[contains(text(), 'Checker')]";

    //branchDropdown
    static printerBranchDropdown: string = "//div[contains(@class, 'ant-form-item-control-input-content')]//nz-select[@formcontrolname='branchID' and @id='branchID']//nz-select-top-control";
    static printerBranchOption1: string = "//nz-option-item[@title][1]";
    static printerBranchOption2: string = "//nz-option-item[@title][1]";
    static printerViewDropdown: string = "//nz-select-item[@title='Standar']";
    static printerViewType1: string = "//nz-option-item[1]";
    static printerViewType2: string = "//nz-option-item[2]";

    //printerSettingButton
    static printerButtonSave: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static printerButtonCancel: string = "//button[normalize-space()='Batal']";


}