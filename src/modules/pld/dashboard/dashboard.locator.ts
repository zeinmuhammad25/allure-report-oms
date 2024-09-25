import BaseLocator from "../../../base/base-locator";

export default class DashboardLocator extends BaseLocator {
    // Locator for the "Later" button on the dashboard
    static buttonLater: string = "button[class='button-later']";
    static buttonLater2: string = "//button[contains(@class, 'esb-btn-md-outline-secondary')]";
    static dropdownProfile: string = "//div[@nztrigger='click']"; //request dev for better ID
    static buttonProfile: string = "//li[@tabindex='0']"; //request dev for better ID

    //accountDropdown
    static dashboardAccountDropdown: string = "//div[@nzoverlayclassname='dropdown-account']";
    static dashboardProfileDropdown: string = "//span[normalize-space()='Profil']";

    // Dashboard Filter Section
    static companyField: string = "(//nz-select-search)[1]";
    static brandField: string = "(//nz-select-search)[2]";
    static branchField: string = "(//nz-select-search)[3]";
    static buttonDay: string = "//nz-radio-group//span[normalize-space()='Hari']";
    static buttonMonth: string = "//nz-radio-group//span[normalize-space()='Bulan']";
    static buttonSearch: string = "//button[contains(@class, 'btn-search')]";
    static filterOptionItem = (filterText: string): string => `//nz-option-item[@title='${filterText}']`

    //Dashboard Sales Performance
    private static getSalesPerformanceChild = (child: number) => `(//div[contains(@class,'card-body')]//div[@class='card-row-two'])[${child}]`
    static netSalesData: string = this.getSalesPerformanceChild(1)
    static totalBillsData: string = this.getSalesPerformanceChild(2)
    static averageNetSalesPerBillData: string = this.getSalesPerformanceChild(3)
    static totalPaxData: string = this.getSalesPerformanceChild(4)
    static averageNetSalesPerPaxData: string = this.getSalesPerformanceChild(5)
    static pendingSalesData: string = this.getSalesPerformanceChild(6)

    // Dashboard Fraud Control
    static otherCostTransactionButton = "(//div[@class='card-row-one ml-2'])[1]//button"
    static complimentTransactionButton = "(//div[@class='card-row-one ml-2'])[2]//button"
    static nonSalesTransactionButton = "(//div[@class='card-row-one ml-2'])[3]//button"
    static fraudControlDialogCloseButton = "//button[normalize-space()='Tutup']"
    static checkDataEmptyByMessage = (message: string) => `//nz-empty//p[contains(text(),'${message}')]`


    // Dashboard Composition
    static salesBySalesMode: string = "//strong[text()='Penjualan Dari Mode Penjualan']"
    static salesByPaymentMethod: string = "//strong[text()='Penjualan Dari Metode Pembayaran']"
    static salesByCategory: string = "//strong[text()='Penjualan Dari Kategori']"
    //Dashboard Composition
    static compositionSalesBySalesMode: string = "//strong[text()='Penjualan Dari Mode Penjualan']"
    static compositionSalesByPaymentMethod: string = "//strong[text()='Penjualan Dari Metode Pembayaran']"
    static compositionSalesByCategory: string = "//strong[text()='Penjualan Dari Kategori']"
    static compositionSalesTopMenu: string = "//strong[text()='Menu Terlaris']"
    static compositionSalesTopBranch: string = "//strong[text()='Cabang Dengan Penjualan Terbaik']"

    private static getTopSalesFilter = (index:number) => `(//div[@class='mt-2 ant-row']//nz-select-search)[${index}]`
    static compositionTopMenuCategoryField: string = this.getTopSalesFilter(1)
    static compositionTopMenuSubCategoryField: string = this.getTopSalesFilter(2)
    static compositionTopMenuSalesModeField: string = this.getTopSalesFilter(3)
    static compositionTopMenuValueTypeField: string = this.getTopSalesFilter(4)
    static compositionTopMenuLimitField: string = this.getTopSalesFilter(5)
    static compositionTopBranchCompanyField: string = this.getTopSalesFilter(6)
    static compositionTopBranchBrandField: string = this.getTopSalesFilter(7)
    static compositionTopBranchBranchField: string = this.getTopSalesFilter(8)
    static compositionTopBranchValueTypeField: string = this.getTopSalesFilter(9)
    static compositionTopBranchLimitField: string = this.getTopSalesFilter(10)
}