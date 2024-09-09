import BaseLocator from "../../../../../base/base-locator";

export default class MenuPackageLocator extends BaseLocator {
    // Locator on Add Menu
    static menuPackageCreateSaveButton: string = "//button[normalize-space()='Simpan']";
    static menuPackageCreateCancelButton: string = "//button[normalize-space()='Batal']";


    //radioButton
    static menuPackageNewHeadRadioButton: string = "//span[normalize-space()='Buat Kepala Paket Baru']";
    static menuPackageExistingHeadRadioButton: string = "//span[normalize-space()='Pakai Menu yang Tersedia']";

    //menuCategoryInfo
    static menuPackageCategoryField: string = "//input[@placeholder='Isi Kategori Menu']";
    static menuPackageNameField: string = "//input[@placeholder='Isi Nama Menu']";
    static menuPackageCodeField: string = "//input[@placeholder='Isi Kode Menu']";
    static menuPackageDescField: string = "//textarea[@placeholder='Deskripsi']";
    static menuPackageCategoryOptionOne: string = "//div[contains(@class, 'list-content')]/div[contains(@class, 'list-content__item')][1]";
    static menuPackageSubCategoryOptionOne: string = "//div[contains(@class, 'list-content')]/div[contains(@class, 'list-content__item')][1]";
    static menuPackageCategorySaveButton: string = "//button[@class='button button-orange button-small button-block button-width ng-star-inserted']";

    //taxAndServiceCharge
    static menuPackageServiceChargeRadioButton: string = "//nz-switch[@formcontrolname='flagOtherTax']//button[@type='button']";
    static menuPackageTaxRadioButton: string = "//nz-switch[@formcontrolname='flagTax']//button[@type='button']";
    static menuPackageFOCRadioButton: string = "//nz-switch[@formcontrolname='openPrice']//button[@type='button']";
    static menuPackageReplacementField: string = "//input[@placeholder='Contoh: Gratis, bonus, hadiah']";

    //tooltip
    static menuPackageTooltipButton: string = "//div[@class='introjs-tooltipbuttons']/a[@role='button' and contains(@class, 'introjs-button')]"

    //menuPackageGroup
    static menuPackageGroupAddButton: string = "//button[normalize-space()='Tambah Kelompok']";
    static menuPackageGroupNameField: string = "//input[@placeholder='Contoh: Jenis Sambal']";
    static menuPackageGroupMinQty: string = "//input[@placeholder='0']";
    static menuPackageGroupMaxQty: string = "//input[@placeholder='5']";
    static menuPackageGroupSelectAllBtn: string = "//div[@class='checked-all ng-star-inserted']";
    static menuPackageGroupSaveButton: string = "//button[@class='button button-small button-orange button-width']";
    static menuPackagePopUpZeroPriceSetNowButton: string = "//button[@class='button button-orange button-small button-block']";
    static menuPackagePopUpZeroPriceLaterButton: string = "//button[@class='button button-outline-blue button-small button-block']";


}