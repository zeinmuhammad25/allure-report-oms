import BaseLocator from "../../../../base/base-locator";

export default class ReasonCancelLocator extends BaseLocator {

    // Index Reason Cancel
    static cancelDescriptionTab: string = "//div[@role='tab' and text()='Alasan Pembatalan']";
    static addCancelDescriptionButton: string = "//button[@routerlink='/catalog/cancel-reason/create']";
    static cancelDescriptionColumn: string = "//nz-table-sorters/span[text() = ' Deskripsi Pembatalan ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";
    static cancelDescriptionSearch: string = "//input[@placeholder = 'Cari Berdasarkan Deskripsi Pembatalan']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    // Add Reason Cancel
    static cancelDescriptionField: string = "#cancelReasonDesc";
    static cancelTypeDescription: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Tipe Alasan Pembatalan']";
    static cancelTypeMenuOption: string = "//nz-option-item[@title='Menu']";
    static cancelTypeOrderOption: string = "//nz-option-item[@title='Order']";
    static cancelTypeVoidOption: string = "//nz-option-item[@title='Void']";
    static cancelInputButton: string = "//button[@ng-reflect-router-link='/catalog/cancel-reason/index']";
    static saveInputButton: string = "//button[text() = ' Simpan ']";

}