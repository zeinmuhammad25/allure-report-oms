import BaseLocator from "../../base/base-locator";

export default class GroupListLocator extends BaseLocator {
    static accountDropdown: string = "//div[@nzoverlayclassname='dropdown-account']";
    static groupListButton: string = "//span[text()='Daftar Grup']/parent::li";
    static groupListPopUp: string = "//app-modal-switch-group";
    static titlePopUp: string = "//app-modal-switch-group//strong[text()='Daftar Grup']";
    static searchFieldPopUp: string = "//app-modal-switch-group//input[@placeholder='Cari']";

    static cancelButton: string = "//button[text()='Batal']";
    static saveButton: string = "//button[text()=' Pilih ']";

}