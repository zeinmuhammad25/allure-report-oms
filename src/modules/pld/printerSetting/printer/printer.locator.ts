import BaseLocator from "../../../../base/base-locator";

export default class PrinterLocator extends BaseLocator {
    static printerFilter: string = "(//nz-select-item[@title='Nama Printer'])[1]";
    static printerName: string = "(//div[normalize-space()='Nama Printer'])[1]";
    static printerMode: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static printerBranch: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static findPrinterField: string = "(//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg'])[1]";
    static printerArchiveButton: string = "(//button[@class='button button-outline-grey button-small'])[1]";
    static addPrinterButton: string = "(//button[normalize-space()='Printer'])[1]";
    static printerButtonSidebar: string = "//a[@ng-reflect-router-link='printer-setting/station']";
    static emptyValidationErrorStation: string = "//div[contains(@class, 'ng-trigger-helpMotion') and contains(text(), 'Kolom ini harus diisi')]";
    static emptyValidationErrorBranch: string = "//div[@class='ng-tns-c124-247 ng-trigger ng-trigger-helpMotion']";
    static successDeletePrinter: string = "#cdk-overlay-4 div";

    // Add Printer Locator

    static stationNameField: string = "(//input[@id='stationName'])[1]";
    static suggestionStationName: string = "//button[normalize-space()='Dapur']";
    static printerBranchField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static printerViewDropdown: string = "(//nz-select-item[@title='Standar'])[1]";
    static printerViewOption1: string = "//div[normalize-space()='Ini Cabang 6 Bulan']";
    static printerDeleteButton: string = "//button[@class='button button-red button-x-small button-icon']";
    static printerConfirmDeleteButton: string = "//div[@class='cdk-overlay-container']//div[@class='ant-row']//div[1]";
    static printerViewOption2: string = "//div[normalize-space()='Test Cabang Baru']";
    static printerView: string = "(//div[contains(text(),'Standar')])[1]";
    static printerCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static printerSaveButton: string = "//button[normalize-space()='Simpan']";
    static printerBranchFilled: string = "//nz-select-item[@title='Ini Cabang 6 Bulan']";
    static printerEditButton: string = "//button[@class='button button-blue button-x-small button-icon']";
}