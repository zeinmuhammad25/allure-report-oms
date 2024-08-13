import BaseLocator from "../../../base/base-locator";

export default class ReportPromotionLocator extends BaseLocator {
    static salesDateField: string = "(//input[@class='filter-calendar ng-untouched ng-valid ng-star-inserted ng-dirty'])[1]";
    static salesCompanyField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static salesBrandField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static salesBranchField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[3]";
    static reportMode: string = "(//nz-select-item[@title='Laporan Per Nota'])[1]";
    static promotionType: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[4]";
    static promotionName: string = "(//input[@id='promotionName'])[1]";
    static transactionNumber: string = "(//input[@id='salesNum'])[1]";
    static salesViewButton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static salesDownloadButton: string = "(//button[normalize-space()='Unduh'])[1]";
    static scrollUpButton: string = "(//div[@class='ant-back-top-inner ng-star-inserted'])[1]"

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

//Report Mode locator
    static notaReport: string = "(//div[normalize-space()='Laporan Per Nota'])[1]";
    static menuReportByDate: string = "(//div[normalize-space()='Laporan Per Menu Per Tanggal'])[1]";
    static dateReport: string = "(//div[normalize-space()='Laporan Per Tanggal'])[1]";

//Promotion type locator
    static notaDiscountPercent: string = "(//div[normalize-space()='Diskon Nota (%)'])[1]";
    static notaDiscountRp: string = "(//div[normalize-space()='Diskon Nota (Rp)'])[1]";
    static esbOrderMenuDiscount: string = "(//div[normalize-space()='ESB Order Diskon Menu (%)'])[1]";
    static esbOrderMenuDiscountRp: string = "(//div[normalize-space()='ESB Order Diskon Menu (Rp)'])[1]";
    static menuDiscountRp: string = "(//div[normalize-space()='Diskon Menu (Rp)'])[1]";
    static customDiscountPercent: string = "(//div[normalize-space()='Diskon Custom (%)'])[1]";
    static posLiteCustomDiscountPercent: string = "(//div[normalize-space()='POS Lite - Diskon Custom (%)'])[1]";
    static posLiteCustomDiscountRp: string = "(//div[normalize-space()='POS Lite - Diskon Custom (Rp)'])[1]";
    static posLiteFreeItem: string = "(//div[normalize-space()='POS Lite - Item Gratis'])[1]";


}