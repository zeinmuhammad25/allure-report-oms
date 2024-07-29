import BaseLocator from "../../../base/base-locator";

export default class RawMaterialLocator extends BaseLocator {

    static addrawbutton: string = "(//button[normalize-space()='Bahan Baku'])[1]";
    static importrawbutton: string = "(//button[normalize-space()='Impor Data'])[1]";
    static rawmaterialsearch: string = "(//input[@placeholder='Cari berdasarkan kategori, kode atau nama bahan baku'])[1]";

    // Tambah Data

    static rawmaterialname: string = "(//input[@id='productName'])[1]";
    static rawmaterialcode: string = "(//input[@id='productCode'])[1]";
    static rawmaterialcategory: string = "(//input[@placeholder='Pilih Kategori'])[1]";
    static rawmcategorypopup: string = "(//input[@placeholder='Sayuran'])[1]";
    static rawchangesbtnpopup: string = "(//button[@class='esb-btn-sm-secondary ng-star-inserted'])[2]";
    static rawbackarrowpopup: string = "(//img[@alt='arrow-back'])[1]";
    static rawcancelbtnpopup: string = "(//button[@type='button'][normalize-space()='Batal'])[1]";
    static rawbackbtnpopup: string = "(//button[normalize-space()='Kembali'])[1]";
    static rawmaterialcancelbtn: string = "(//button[normalize-space()='Batal'])[1]";
    static rawmaterialsavebtn: string = "(//button[normalize-space()='Simpan'])[1]";


}