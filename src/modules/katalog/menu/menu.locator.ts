import BaseLocator from "../../../base/base-locator";

export default class MenuLocator extends BaseLocator {
    // Locator on Menu Page
    static singlemenubutton: string = "//button[@id='tab-menu-satuan']";
    static packagemenubutton: string = "//button[@id='tab-menupackage']";
    static archivemenubutton: string = "//button[@id='tab-menupackage']";
    static importmenubutton: string = "//button[normalize-space()='Impor Menu']"
    static exportmenubutton: string = "//button[normalize-space()='Ekspor Menu']"
    static addmenubutton: string = "(//button[@id='i-menu1'])[1]";
    static menudropdown: string = "//nz-select-top-control[@class='ng-tns-c137-291 ant-select-selector']"//request for better selector name
    static menusearchfield: string = "//input[@placeholder='Cari berdasarkan Menu']";
    static totalmenu: string = "//div[@class='page-total-container']";
    static paginationnextbtn: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static paginationbackbtn: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static addrecipebutton: string = "//button[@class='esb-btn-sm-outline-secondary btn-recipe2 ng-star-inserted']";
    static editmenubutton: string = "(//button)[11]";
    static deletemenubutton: string = "(//button)[12]";
    static instructionbutton: string = "(//button[@class='button button-yellow button-small'])[1]";

    // Locator on Add Menu

    static menusavebutton: string = "(//button[normalize-space()='Simpan'])[1]";
    static menucancelbutton: string = "//button[normalize-space()='Batal']";

    //Buku Menu section

    static menunamefield: string = "//input[@placeholder='Contoh: Nasi Ayam Geprek Pedas']";
    static menucodefield: string = "(//input[@placeholder='Contoh: AYG01'])[1]";
    static menucategoryfield: string = "(//input[@placeholder='Isi Kategori Menu'])[1]";
    static menucategorybutton: string = "(//button[@class='button button-blue button-icon button-x-small ng-tns-c548-65 ng-star-inserted'])[1]";
    static menudescfield: string = "(//textarea[@placeholder='Deskripsikan menu andalan Anda dengan cara yang menarik untuk menggugah pelanggan memesan menu ini'])[1]";
    static addmenubookbutton: string = "//button[normalize-space()='Tambah Buku Menu']";


    //Pajak & Service Charge section

    static scradiobutton: string = "(//button[@type='button'])[17]";
    static taxradiobutton: string = "(//button[@type='button'])[18]";
    static focradiobutton: string = "(//button[@type='button'])[19]";
    static replacementfield: string = "(//input[@placeholder='Contoh: Gratis, bonus, hadiah'])[1]";

    //Informasi Buku Menu pop-up

    static menunamepopup: string = "(//input[@placeholder='Isi Nama Buku Menu'])[1]";
    static menupricepopup: string = "(//input[@placeholder='Rp0'])[1]";
    static menucancelpopup: string = "(//button[@class='button button-outline-red button-small button-block'])[1]";
    static menusavepopup: string = "(//button[@class='button button-orange button-small button-block'])[1]";
    

}