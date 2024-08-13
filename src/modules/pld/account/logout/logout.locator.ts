import BaseLocator from "../../../../base/base-locator";

export default class LogoutLocator extends BaseLocator {
    static accountDropdown: string = "//div[@nzoverlayclassname='dropdown-account']";
    static logoutButton: string = "//span[text()='Keluar']/parent::li";
    static logoutConfirmationPopUp: string = "//app-modal-confirm";
    static cancelLogoutButton: string = "//button[text()=' Keluar ']";
    static logoutConfirmationButton: string = "//button[text()=' Batal ']";
}