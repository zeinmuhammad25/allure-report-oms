import BaseLocator from "../../../../base/base-locator";

export default class RawMaterialLocator extends BaseLocator {

    static addRawButton: string = "(//button[normalize-space()='Bahan Baku'])[1]";
    static importRawButton: string = "(//button[normalize-space()='Impor Data'])[1]";
    static rawMaterialSearch: string = "(//input[@placeholder='Cari berdasarkan kategori, kode atau nama bahan baku'])[1]";

    // Tambah Data

    static rawMaterialName: string = "(//input[@id='productName'])[1]";
    static rawMaterialCode: string = "(//input[@id='productCode'])[1]";
    static rawMaterialCategory: string = "(//input[@placeholder='Pilih Kategori'])[1]";
    static rawCategoryPopup: string = "(//input[@placeholder='Sayuran'])[1]";
    static rawChangesButtonPopup: string = "(//button[@class='esb-btn-sm-secondary ng-star-inserted'])[2]";
    static rawBackArrowPopup: string = "(//img[@alt='arrow-back'])[1]";
    static rawCancelButtonPopup: string = "(//button[@type='button'][normalize-space()='Batal'])[1]";
    static rawBackButtonPopup: string = "(//button[normalize-space()='Kembali'])[1]";
    static rawMaterialCancelButton: string = "(//button[normalize-space()='Batal'])[1]";
    static rawMaterialSaveButton: string = "(//button[normalize-space()='Simpan'])[1]";


}