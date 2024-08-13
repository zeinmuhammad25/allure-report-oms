import BaseLocator from "../../../../base/base-locator";

export default class StockMenuLocator extends BaseLocator {
    static branchFilter: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Cabang']";
    static inputFilter: string = "//input[@placeholder='Cari berdasarkan nama menu atau kategori']";
    static advancedFilter: string = "//button/span[text()='Filter']";

    static numberColumn: string = "//th[text() = ' No. ']";
    static menuColumn: string = "//nz-table-sorters/span[text() = ' Menu ']";
    static categoryColumn: string = "//nz-table-sorters/span[text() = ' Kategori ']";
    static statusColumn: string = "//nz-table-sorters/span[text() = ' Status ']";
    static availabilityColumn: string = "//nz-table-sorters/span[text() = ' Ketersediaan ']";
    static remainingStockColumn: string = "//nz-table-sorters/span[text() = ' Jumlah Stok ']";

    static advancedFilterPopUp: string = "//app-modal-filter-menu-stock";
    static menuStatusActiveOption: string = "//span[text()='Status Menu']/following-sibling::nz-radio-group//span[text()='Aktif']";
    static menuStatusNotActiveOption: string = "//span[text()='Status Menu']/following-sibling::nz-radio-group//span[text()='Tidak Aktif']";
    static limitedStockOption: string = "(//span[text()='Ketersediaan']/following-sibling::nz-radio-group//span[text()='Stok Terbatas'])[2]";
    static unlimitedStockOption: string = "(//span[text()='Ketersediaan']/following-sibling::nz-radio-group//span[text()='Stok Tidak Terbatas'])[2]";
    static outOfStockOption: string = "(//span[text()='Ketersediaan']/following-sibling::nz-radio-group//span[text()='Stok Habis'])[2]";
    static stockQuantity1to10Option: string = "(//span[text()='Jumlah Stok']/following-sibling::nz-radio-group//span[text()='0 - 10'])[2]";
    static stockQuantity11to50Option: string = "(//span[text()='Jumlah Stok']/following-sibling::nz-radio-group//span[text()='11 - 50'])[2]";
    static stockQuantity51to100Option: string = "(//span[text()='Jumlah Stok']/following-sibling::nz-radio-group//span[text()='51 - 100'])[2]";
    static stockQuantityMoreThan100Option: string = "(//span[text()='Jumlah Stok']/following-sibling::nz-radio-group//span[text()='>100'])[2]";
    static applyButton: string = "(//button[text()='Terapkan'])[2]";
    static resetButton: string = "(//button[text()='Reset'])[2]";

}