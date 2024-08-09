import BaseLocator from "../../../base/base-locator";

export default class MenuBookLocator extends BaseLocator {

    static userTab: string = "//div[@role='tab' and text()='User']";

    static emailSearch: string = "//input[@placeholder='Cari Berdasarkan Email']";
    static fullNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Lengkap']";
    static userTypeSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Tipe user']";
    static registrationStatusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status Pendaftaran']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static emailColumn: string = "//nz-table-sorters/span[text() = ' Email ']";
    static fullNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Lengkap ']";
    static userTypeColumn: string = "//nz-table-sorters/span[text() = ' Tipe User ']";
    static registrationStatusColumn: string = "//nz-table-sorters/span[text() = ' Status Pendaftaran ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";
    static addUserButton: string = "//button[@routerlink='/role/user/create']";

    // Add User
    static emailField: string = "#email";
    static userNameField: string = "#fullName";
    static branchAccessDropdown: string = "//nz-select-item[@ng-reflect-label='Semua Cabang']";
    static branchDropdown: string = "//nz-select-top-control[@ng-reflect-place-holder='Pilih Cabang']";
    static incomingBranchYesRadio: string = "//nz-radio-group[@formcontrolname='flagFutureBranch']//span[text() = ' Ya ']/preceding-sibling::span/input";
    static incomingBranchNoRadio: string = "//nz-radio-group[@formcontrolname='flagFutureBranch']//span[text() = ' Tidak ']/preceding-sibling::span/input";
    static posAccessYesRadio: string = "//nz-radio-group[@formcontrolname='flagPosAccess']//span[text() = ' Ya ']/preceding-sibling::span/input";
    static posAccessNoRadio: string = "//nz-radio-group[@formcontrolname='flagPosAccess']//span[text() = ' Tidak ']/preceding-sibling::span/input";
    static posAccessDropdown: string = "#posUserRoleID";
    static posPIN: string = "#posUserID";
    static backendAccessYesRadio: string = "//nz-radio-group[@formcontrolname='flagBackendAccess']//span[text() = ' Ya ']/preceding-sibling::span/input";
    static backendAccessNoRadio: string = "//nz-radio-group[@formcontrolname='flagBackendAccess']//span[text() = ' Tidak ']/preceding-sibling::span/input";
    static backendAccessDropdown: string = "#userRoleID";
    static cancelButton: string = "//button[@routerlink='/role/user/index']";
    static saveButton: string = "//button[text()=' Simpan ']";

}