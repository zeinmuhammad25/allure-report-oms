import BaseLocator from "../../../../base/base-locator";

export default class SalesSummaryLocator extends BaseLocator {

    // Navigation Button
    static reportSideBar: string = "//div[contains(text(),'Laporan')]"
    static reportSummarySideBar: string = "//a[normalize-space()='Rangkuman Penjualan']"


    // Filter
    static salesDateField: string = "(//input[@type='text'])[1]";
    static salesCompanyField: string = "(//input[contains(@class,'ant-select-selection-search-input')])[1]";
    static salesBrandField: string = "(//input[contains(@class,'ant-select-selection-search-input')])[2]";
    static salesBranchField: string = "(//input[contains(@class,'ant-select-selection-search-input')])[3]";
    static salesViewButton: string = "(//button[normalize-space()='Tampilkan'])[1]";
    static salesDownloadButton: string = "(//button[normalize-space()='Unduh'])[1]";
    static salesDownloadConfirmButton: string = "//button[@class='btn btn-block btn-primary'][normalize-space()='Unduh']";
    static salesFilterOptionItem = (filterText:string): string => `//nz-option-item[@title='${filterText}']`


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

    private static getTitleOfCard = (title:string):string => `//app-sales-summary-index//div[contains(@class, \"card-body\")]//strong[text() = '${title}']`
    static cardSalesStatistic: string = this.getTitleOfCard('Statistik Penjualan')
    static cardSalesPerDay: string = this.getTitleOfCard('Penjualan Per Hari')
    static cardSalesPerTime: string = this.getTitleOfCard('Penjualan Per Waktu')
    static cardSales: string = this.getTitleOfCard('Penjualan')
    static cardFraudControll: string = this.getTitleOfCard('Kontrol Fraud')
}