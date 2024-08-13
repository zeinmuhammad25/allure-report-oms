import BaseLocator from "../../../base/base-locator";

export default class CancelAndVoidLocator extends BaseLocator {

    static orderDateField: string = "//input[@class='filter-calendar ng-untouched ng-valid ng-star-inserted ng-dirty']";
    static datePickerToday: string = "//button[normalize-space()='Hari ini']";
    static datePickerYesterday: string = "//button[normalize-space()='Kemarin']";
    static datePickerLastWeek: string = "//button[normalize-space()='7 Hari terakhir']";
    static datePickerThisWeek: string = "//button[normalize-space()='Minggu ini']";
    static datePickerThisMonth: string = "//button[normalize-space()='Bulan ini']";
    static datePickerLastMonth: string = "//button[normalize-space()='Bulan lalu']";
    static datePickerSelectButton: string = "//button[normalize-space()='Pilih']";
    static datePickerCancelButton: string = "//button[normalize-space()='Batal']";
    static selectCompanyActiveField: string = "//div[@class='ant-select-item-option-content']";
    static optionCompanyActive: string = "//div[@class='ant-select-item-option-content']";
    static selectBrandActiveField: string = "//nz-select-search[@ng-reflect-focus-trigger='true']//input[@class='ant-select-selection-search-input ng-pristine ng-valid ng-touched']";
    static optionBrandActive: string = "//div[@class='ant-select-item-option-content']";
    static selectBranchActiveField: string = "//nz-select-search[@ng-reflect-focus-trigger='true']//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid']";
    static transactionNumberField: string = "//input[@id='salesNum']";
    static cashierNameField: string = "//input[@id='cashierName']";
    static salesTypeField: string = "//nz-select-top-control[@class='ng-tns-c137-70 ant-select-selector']";
    static paymentMethod: string = "//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid']";
    static viewButton: string = "//button[normalize-space()='Tampilkan']";
    static downloadButton: string = "//button[normalize-space()='Unduh']";



}