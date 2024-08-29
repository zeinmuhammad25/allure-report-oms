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

    //taxAndServiceCharge
    static menuPackageServiceChargeRadioButton: string = "//nz-switch[@formcontrolname='flagOtherTax']//button[@type='button']";
    static menuPackageTaxRadioButton: string = "//nz-switch[@formcontrolname='flagTax']//button[@type='button']";
    static menuPackageFOCRadioButton: string = "//nz-switch[@formcontrolname='openPrice']//button[@type='button']";
    static menuPackageReplacementField: string = "//input[@placeholder='Contoh: Gratis, bonus, hadiah']";



}