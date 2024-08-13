import BaseLocator from "../../../base/base-locator";

export default class BusinessLocator extends BaseLocator {

    static infoButtonBusiness: string = "//span[normalize-space()='Informasi Usaha']";
    static groupFieldBusiness: string = "//div[@class='ant-form-item-control-input-content ng-tns-c124-163']//input[@id='companyName']";
    static searchFieldBusiness: string = "//input[@placeholder='Cari berdasarkan nama usaha']";
    static addButtonBusiness: string = "//button[@class='button button-orange button-small tambah-usaha']";
    //change name
    static changeNameBusinessButton: string = "//button[@class='btn btn-warning ml-2']";
    static changeNameField: string = "//div[@class='ant-form-item-control-input-content ng-tns-c124-204']//input[@id='companyName']";
    static changeNameCloseButton: string = "//div[@class='ant-form-item-control-input-content ng-tns-c124-204']//input[@id='companyName']";
    static changeNameSaveButton: string = "//form[@class='ant-form ng-pristine ng-valid ant-form-vertical ng-touched']//button[@type='button'][normalize-space()='Simpan']";


}