import BaseLocator from "../../../base/base-locator";

export default class CompanyLocator extends BaseLocator {
    static companyGroupNameField: string = "#companyName";
    static changeCompanyNameButton: string = "//button[text()=' Ubah ']";
    static addCompanyButton: string = "//button[@routerlink='/account-setting/company/create']";
    static archiveCompanyButton: string = "//button[@routerlink='/account-setting/company/archive']";
    static companySearch: string = "//input[@placeholder='Cari berdasarkan nama usaha']";

    static numberColumn: string = "//th[text() = ' No. ']";
    static companyColumn: string = "//nz-table-sorters/span[text() = ' Nama Usaha ']";
    static addressColumn: string = "//nz-table-sorters/span[text() = ' Alamat ']";


    // Add Company
    static companyNameField: string = "#companyName";
    static companyCodeField: string = "#companyCode";
    static companyAddressField: string = "#companyAddress";
    static companyLogoUpload: string = "//app-file-uploader";
    static addSalesTime: string = "//button/span[text()='Tambah Data']";
    static mandatoryAttendanceImageSwitch: string = "#flagMandatoryAttendancePhoto";
    static customerNumberSwitch: string = "#flagInputPhoneNum";

    static saveButton: string = "//button[text()=' Simpan ']";
    static cancelButton: string = "//button[@routerlink='/account-setting/company/index']";


}