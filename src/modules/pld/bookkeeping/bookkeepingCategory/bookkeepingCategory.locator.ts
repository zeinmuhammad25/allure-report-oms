import BaseLocator from "../../../../base/base-locator";

export default class BookkeepingCategoryLocator extends BaseLocator {

    // Index
    static guideButton: string = "//a[@href='https://help.esb.id/content/article/mengatur-kategori-pembukuan-pada-poslite-dashboard']";
    static bookkeepingCategoryAddButton: string = "//button[text() = ' Kategori Pembukuan ']";
    static bookkeepingCategoryArchiveButton: string = "//button[@routerlink='/finance/charts-of-account/archive']";

    static bookkeepingCategorySearch: string = "//input[@placeholder='Cari berdasarkan kategori pembukuan']";
    static bookkeepingTypeSearch: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Tipe Pembukuan']";

    static numberColumn: string = "//th[text() = ' No. ']";
    static bookkeepingNameColumn: string = "//th[text() = ' Nama Kategori Pembukuan ']";
    static bookkeepingTypeColumn: string = "//th[text() = ' Tipe ']";

    // Input Pop Up
    static addBookkeepingPopUp: string = "//app-modal-add-charts-of-account-category";
    static incomeTypeRadio: string = "//span[text()=' Pendapatan ']/preceding-sibling::span/input";
    static outcomeTypeRadio: string = "//span[text()=' Pengeluaran ']/preceding-sibling::span/input";
    static bookkeepingNameField: string = "#description";
    static bookkeepingCancelButtonPopUp: string = "//app-modal-add-charts-of-account-category//button[text()='Batal']";
    static bookkeepingSaveButtonPopUp: string = "//app-modal-add-charts-of-account-category//button[text()=' Simpan ']";

}