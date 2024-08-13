import BaseLocator from "../../../../base/base-locator";

export default class EmployeeDataLocator extends BaseLocator {
    static addEmployeeButton: string = "(//button[@class='button button-orange button-small tambah-cabang'])[1]";
    static employeeDataDropdown: string = "(//div[@class='ant-col ant-col-xs-24 ant-col-md-6'])[1]";
    static employeeSearchField: string = "(//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg'])[1]";
    static employeeNameOption: string = "(//nz-option-item[@title='Nama Karyawan'])[1]";
    static employeeIdOption: string = "(//nz-option-item[@title='ID Karyawan'])[1]";
    static employeeDataCount: string = "(//div[@class='page-total-container'])[1]";

    //Tambah Karyawan form
    static employeeIdInput: string = "(//input[@id='employeeID'])[1]";
    static employeeNameInput: string = "(//input[@id='fullName'])[1]";
    static employeeBranchDropdown: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static employeeCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static employeeSaveButton: string = "(//button[normalize-space()='Simpan'])[1]";

}