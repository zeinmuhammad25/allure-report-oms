import BaseLocator from "../../../../base/base-locator";

export default class BrandLocator extends BaseLocator {

    static addBrandButton: string = "(//button[normalize-space()='Tambah Brand'])[1]";
    static searchBrandField: string = "(//nz-input-group[@class='ant-input-affix-wrapper'])[1]";
    static searchBrandDropdown: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static statusBrandDropdown: string = "(//nz-select-item[@title='Aktif'])[1]";
    static statusBrandInactive: string = "(//div[normalize-space()='Tidak Aktif'])[1]";
    static applyBrandButton: string = "(//button[normalize-space()='Terapkan Cabang'])[1]";

    //Add brand page ater clicking brand button

    static brandNameField: string = "(//input[@id='brandName'])[1]";
    static brandCodeField: string = "(//input[@id='brandCode'])[1]";
    static brandCodeRefresh: string = "(//button[@type='button'])[1]";
    static brandCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static brandSaveButton: string = "(//button[normalize-space()='Simpan'])[1]";

}