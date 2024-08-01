import BaseLocator from "../../../base/base-locator";

export default class SalesModeLocator extends BaseLocator {
    static archiveButton: string = "//button[@routerlink='/catalog/sales-mode/archive']";
    static addSalesModeButton: string = "#i-salesmode1";
    static branchNameSearch: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Cabang']";
    static salesModeSearch: string = "//input[@placeholder = 'Cari Berdasarkan Mode Penjualan']";
    static salesModeNameColumn: string = "//nz-table-sorters/span[text() = ' Mode Penjualan ']";
    static salesModeBranchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";

    static addSalesModePopUp: string = "//app-modal-sales-mode-form";
    static cancelButtonPopUp: string = "//app-modal-sales-mode-form//button[text()=' Batal ']";
    static addButtonPopUp: string = "//app-modal-sales-mode-form//button[text()=' Simpan ']";
    static salesModeInputPopUp: string = "#visitPurposeName";

}