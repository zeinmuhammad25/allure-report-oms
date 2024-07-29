import BaseLocator from "../../../base/base-locator";

export default class SalesSummaryLocator extends BaseLocator {
    static salesDateField: string = "(//input[@type='text'])[1]";
    static salesCompanyField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static salesBrandField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static salesBranchField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[3]";
    static salesViewButton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static salesDownloadButton: string = "(//button[normalize-space()='Unduh'])[1]";

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