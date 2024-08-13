import BaseLocator from "../../../base/base-locator";

export default class SalesMenuLocator extends BaseLocator {
    static salesDateField: string = "(//input[@class='filter-calendar ng-untouched ng-valid ng-star-inserted ng-dirty'])[1]";

    //business field
    static businessField: string = "//input[@placeholder='Pilih Usaha']";
    static businessFieldClear: string = "//nz-input-group[@class='ng-tns-c124-61 ant-input-affix-wrapper ant-input-affix-wrapper-lg']//span[@type='suffix']";
    static businessSearchField: string = "//input[@placeholder='Cari Usaha']";
    static businessStatusDropdown: string = "//nz-select-item[@title='Perusahaan Aktif']";
    static businessSaveButton: string = "//nz-select-item[@title='Perusahaan Aktif']";
    static businessCancelButton: string = "//button[@class='btn-md-outline-danger full-width']";
    static viewButton: string = "//button[normalize-space()='Tampilkan']";
    static downloadButton: string = "//button[normalize-space()='Unduh']";

//report type
    static reportTypeDropdown: string = "reportTypeDropdown";
    static menuPeriodReportType: string = "//div[contains(text(),'Menu Per Periode')]";
    static menuReportType: string = "//div[normalize-space()='Menu']";
    static menuInHourReportType: string = "//div[normalize-space()='Menu Per Jam']";
    static menuPackageReportType: string = "//div[contains(text(),'Menu Paket Per Periode')]";

//Date picker locator
    static todayFilter: string = "(//button[normalize-space()='Hari ini'])[1]";
    static yesterdayFilter: string = "(//button[normalize-space()='Kemarin'])[1]";
    static lastWeekFilter: string = "(//button[normalize-space()='7 Hari terakhir'])[1]";
    static thisWeekFilter: string = "(//button[normalize-space()='Minggu ini'])[1]";
    static thirtyDayFilter: string = "(//button[normalize-space()='30 Hari terakhir'])[1]";
    static thisMonthFilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static lastMonthFilter: string = "(//button[normalize-space()='Bulan ini'])[1]";
    static chooseDateButton: string = "(//button[normalize-space()='Pilih'])[1]";
    static cancelDateButton: string = "(//button[normalize-space()='Batal'])[1]";
}