import BaseLocator from "../../../base/base-locator";

export default class MenuNotesLocator extends BaseLocator {
    static menuNotesTab: string = "//div[@role='tab' and text()='Catatan Menu']";

    // Index Menu Notes
    static notesNameColumn: string = "//nz-table-sorters/span[text() = ' Catatan Menu ']";
    static branchNameColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";
    static notesNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Catatan Menu']";
    static branchNameSearch: string = "//nz-select-top-control[@ng-reflect-place-holder='Cari Berdasarkan Cabang']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static addMenuNotesButton: string = "//button[text()= ' Tambah Catatan Menu ' and @routerlink = '/catalog/notes-category/create']";
    static editButton: string = "//td[text() = 'Catatan Pembelian']/following-sibling::td/button[@nzplacement='bottomRight']";

    // Add Menu Notes
    static notesCategoryField: string = "#notesCategoryDesc";
    static notesBranchField: string = "#branchIDs";
    static addNotesButton: string = "//span[text() = 'Tambah Catatan']/parent::button";

    static notesDetailPopUp: string = "//app-modal-create-group-data";
    static notesDescriptionFieldPopUp: string = "#name";
    static cancelButtonPopUp: string = "//app-modal-create-group-data//button[text()='Batal']";
    static saveButtonPopUp: string = "//app-modal-create-group-data//button[text()=' Tambah ']";


}