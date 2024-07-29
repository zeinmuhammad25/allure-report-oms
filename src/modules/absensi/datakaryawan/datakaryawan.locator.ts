import BaseLocator from "../../../base/base-locator";

export default class DatakaryawanLocator extends BaseLocator {
    static addemployeebtn: string = "(//button[@class='button button-orange button-small tambah-cabang'])[1]";
    static emplodatadropdown: string = "(//div[@class='ant-col ant-col-xs-24 ant-col-md-6'])[1]";
    static emplosearchfield: string = "(//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg'])[1]";
    static emplonameopt: string = "(//nz-option-item[@title='Nama Karyawan'])[1]";
    static emploidopt: string = "(//nz-option-item[@title='ID Karyawan'])[1]";
    static emplodatacount: string = "(//div[@class='page-total-container'])[1]";

    //Tambah Karyawan form
    static emploidinput: string = "(//input[@id='employeeID'])[1]";
    static emplonameinput: string = "(//input[@id='fullName'])[1]";
    static emplobranchdropdown: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static emplocancelbutton: string = "(//button[normalize-space()='Batal'])[1]";
    static emplosavebutton: string = "(//button[normalize-space()='Simpan'])[1]";

}