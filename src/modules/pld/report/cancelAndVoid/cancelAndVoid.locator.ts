import BaseLocator from "../../../../base/base-locator";

export default class CancelAndVoidLocator extends BaseLocator {

    //datep
    static orderDateField: string = "//input[@ng-reflect-model='[object Object]']";
    static datePickerToday: string = "//button[normalize-space()='Hari ini']";
    static datePickerYesterday: string = "//button[normalize-space()='Kemarin']";
    static datePickerLastWeek: string = "//button[normalize-space()='7 Hari terakhir']";
    static datePickerThisWeek: string = "//button[normalize-space()='Minggu ini']";
    static datePickerThisMonth: string = "//button[normalize-space()='Bulan ini']";
    static datePickerLastMonth: string = "//button[normalize-space()='Bulan lalu']";
    static datePickerSelectButton: string = "//button[normalize-space()='Pilih']";
    static datePickerCancelButton: string = "//button[normalize-space()='Batal']";

    //dropdown
    static cancelAndVoidCompanyDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Perusahaan']//input[@autocomplete='off']";
    static optionCompanyActive: string = "//div[@class='ant-select-item-option-content']";
    static cancelAndVoidBrandDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Brand']//input[@autocomplete='off']";
    static optionBrandActive: string = "//div[@class='ant-select-item-option-content']";
    static cancelAndVoidBranchDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Cabang']//input[@autocomplete='off']";

    //inputField
    static transactionNumberField: string = "//input[@id='salesNum']";
    static cashierNameField: string = "//input[@id='cashierName']";
    static salesTypeField: string = "//nz-select-search[@ng-reflect-mirror-sync='true']//input[@autocomplete='off']";
    static paymentMethod: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Metode Pembay']//input[@autocomplete='off']";
    static viewButton: string = "//button[normalize-space()='Tampilkan']";
    static downloadButton: string = "//button[normalize-space()='Unduh']";
    static filterOptionItem = (filterText:string): string => `//nz-option-item[@title='${filterText}']`

    // Data
    static cancelMenuReport : string = "//strong[text()='Laporan Menu Batal']"

    //Download Dialog
    static downloadDialogDownloadButton: string = "//button[@class='btn btn-block btn-primary'][normalize-space()='Unduh']";
    static downloadDialogCancelButton: string = "//button[@class='btn btn-block'][normalize-space()='Batal']";
}