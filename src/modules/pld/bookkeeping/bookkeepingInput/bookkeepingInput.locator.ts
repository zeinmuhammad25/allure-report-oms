import BaseLocator from "../../../../base/base-locator";

export default class BookkeepingInputLocator extends BaseLocator {

    // Index
    static guideButton: string = "//a[@href='https://help.esb.id/content/article/melakukan-input-pembukuan-pada-poslite-dashboard']";
    static addBookkeepingInputButton: string = "//button[@routerlink='/finance/input-finance/create']";
    static archiveBookkeepingInputButton: string = "//button[@routerlink='/finance/input-finance/archive']";

    static bookkeepingDateSearch: string = "//app-date-range-picker-custom//input";
    static bookkeepingOptionSearch: string = "//nz-select-top-control";
    static bookkeepingValueSearch: string = "//input[@placeholder='Cari berdasarkan Cabang']";

    static bookkeepingNoColumn: string = "//th[text() = ' No. ']";
    static bookkeepingBranchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static bookkeepingDateColumn: string = "//nz-table-sorters/span[text() = ' Tanggal ']";
    static bookkeepingNoteColumn: string = "//nz-table-sorters/span[text() = ' Catatan ']";
    static bookkeepingDetailColumn: string = "//th[text() = ' Detail ']";


    // Input
    static bookkeepingInputInfo: string = "//app-info-card[@title='Input Pembukuan']";
    static bookkeepingBranchInput: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Cabang']";
    static bookkeepingDateInput: string = "#journalDate";
    static bookkeepingCategoryInput: string = "#coaNo";
    static bookkeepingAmountInput: string = "//input[@formcontrolname='amount']";
    static bookkeepingNotesInput: string = "#notes";
    static bookkeepingSupplierInput: string = "//input[@formcontrolname='supplierName']";
    static bookkeepingImageInput: string = " //img[@alt='add']/ancestor::app-image-uploader-mini";
    static cancelBookkeepingInputButton: string = "//button[@routerlink='/finance/input-finance/index']";
    static saveBookkeepingInputButton: string = "//button[text()=' Simpan ']";


}