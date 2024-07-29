import BaseLocator from "../../../base/base-locator";

export default class PrinterLocator extends BaseLocator {
    static printerFilter: string = "(//nz-select-item[@title='Nama Printer'])[1]";
    static printerName: string = "(//div[normalize-space()='Nama Printer'])[1]";
    static printerMode: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static printerBranch: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static findPrinterField: string = "(//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg'])[1]";
    static printerArchiveButton: string = "(//button[@class='button button-outline-grey button-small'])[1]";
    static addPrinterButton: string = "(//button[normalize-space()='Printer'])[1]";


    // Add Printer Locator

    static stationNameField: string = "(//input[@id='stationName'])[1]";
    static printerBranchField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static printerViewDropdown: string = "(//nz-select-item[@title='Standar'])[1]";
    static printerViewOption1: string = "(//div[normalize-space()='Per Jumlah Menu'])[1]";
    static printerViewOption2: string = "(//nz-option-item[@title='Per Menu'])[1]";
    static printerView: string = "(//div[contains(text(),'Standar')])[1]";
    static printerCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static printerSaveButton: string = "(//button[normalize-space()='Batal'])[1]";
}