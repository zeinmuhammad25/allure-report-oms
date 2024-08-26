import BaseLocator from "../../../../base/base-locator";

export default class ReasonCancelLocator extends BaseLocator {

    // Index Reason Cancel
    static reasonCancelAddButton: string = "//button[@class='btn btn-primary']";
    static reasonCancelSearchBar: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-18']";
    static reasonCancelStatusDropdown: string = "//div[@class='ant-col ant-col-xs-24 ant-col-md-6']";

    // Add Reason Cancel
    static cancelDescriptionField: string = "#cancelReasonDesc";
    static cancelTypeDescription: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Tipe Alasan Pembatalan']";
    static cancelTypeMenuOption: string = "//nz-option-item[@title='Menu']";
    static cancelTypeOrderOption: string = "//nz-option-item[@title='Order']";
    static cancelTypeVoidOption: string = "//nz-option-item[@title='Void']";
    static cancelInputButton: string = "//button[@ng-reflect-router-link='/catalog/cancel-reason/index']";
    static saveInputButton: string = "//button[text() = ' Simpan ']";

}