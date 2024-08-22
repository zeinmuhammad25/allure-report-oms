import BaseLocator from "../../../../base/base-locator";

export default class CompanyLocator extends BaseLocator {
    static companyGroupNameField: string = "#companyName";
    static companyChangeNameButton: string = "//button[text()=' Ubah ']";
    static companyAddButton: string = "//button[@routerlink='/account-setting/company/create']";
    static companyArchiveButton: string = "//button[@routerlink='/account-setting/company/archive']";
    static companySearchField: string = "//input[@placeholder='Cari berdasarkan nama usaha']";

    static companyNumberColumn: string = "//th[text() = ' No. ']";
    static companyNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Usaha ']";
    static companyAddressColumn: string = "//nz-table-sorters/span[text() = ' Alamat ']";


    // Add Company
    static companyNameField: string = "#companyName";
    static companyCodeField: string = "#companyCode";
    static companyAddressField: string = "#companyAddress";
    static companyLogoUpload: string = "//app-file-uploader";
    static addSalesTime: string = "//button/span[text()='Tambah Data']";
    static mandatoryAttendanceImageSwitch: string = "#flagMandatoryAttendancePhoto";
    static customerNumberSwitch: string = "#flagInputPhoneNum";

    static companySaveButton: string = "//button[text()=' Simpan ']";
    static companyCancelButton: string = "//button[@routerlink='/account-setting/company/index']";


}