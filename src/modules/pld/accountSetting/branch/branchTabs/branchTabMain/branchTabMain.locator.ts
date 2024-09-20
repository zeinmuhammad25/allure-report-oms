import BaseLocator from "../../../../../../base/base-locator";

export default class BranchTabMainLocator extends BaseLocator {

    static branchTabMain: string = "//div[contains(text(),'Utama')]";
    static branchTabNameField: string = "//input[@id='branchName']";
    static branchTabSaveButton: string = "//button[@class='button button-orange button-small ng-star-inserted']";
    static branchTabCancelButton: string = "//button[@class='button button-outline-red button-small ng-star-inserted']";
    static branchMainTabCodeField: string = "//input[@id='branchCode']";
    static branchMainTabPhoneField: string = "//input[@id='phone']";
    static branchMainTabAddressField: string = "//textarea[@id='address']";
    static branchMainTabProvinceField: string = "//input[@placeholder='Provinsi, Kota, Kecamatan, Kelurahan']";
    static branchMainTabPostalCodeField: string = "//input[@id='postalCode']";
    static branchMainTabTimeZoneDropdown: string = "//nz-select-top-control[@class='ng-tns-c137-741 ant-select-selector']";

}