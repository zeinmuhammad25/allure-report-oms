import BaseLocator from "../../../base/base-locator";

export default class MenuLocator extends BaseLocator {
    // Locator on Menu Page
    static singleMenuButton: string = "//button[@id='tab-menu-satuan']";
    static packageMenuButton: string = "//button[@id='tab-menupackage']";
    static archiveMenuButton: string = "//button[@id='tab-menupackage']";
    static importMenuButton: string = "//button[normalize-space()='Impor Menu']"
    static exportMenuButton: string = "//button[normalize-space()='Ekspor Menu']"
    static addMenuButton: string = "(//button[@id='i-menu1'])[1]";
    static menuDropdownField: string = "//nz-select-top-control[@class='ng-tns-c137-291 ant-select-selector']"//request for better selector name
    static menuSearchField: string = "//input[@placeholder='Cari berdasarkan Menu']";
    static menuTotalCount: string = "//div[@class='page-total-container']";
    static paginationNextButton: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static paginationPreviousButton: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static addRecipeButton: string = "//button[@class='esb-btn-sm-outline-secondary btn-recipe2 ng-star-inserted']";
    static editMenuButton: string = "(//button)[11]";
    static deleteMenuButton: string = "(//button)[12]";
    static instructionButton: string = "(//button[@class='button button-yellow button-small'])[1]";

    // Locator on Add Menu

    static saveMenuButton: string = "(//button[normalize-space()='Simpan'])[1]";
    static cancelMenuButton: string = "//button[normalize-space()='Batal']";

    //Buku Menu section

    static menuNameField: string = "//input[@placeholder='Contoh: Nasi Ayam Geprek Pedas']";
    static menuCodeField: string = "(//input[@placeholder='Contoh: AYG01'])[1]";
    static menuCategoryField: string = "(//input[@placeholder='Isi Kategori Menu'])[1]";
    static menuCategoryButton: string = "(//button[@class='button button-blue button-icon button-x-small ng-tns-c548-65 ng-star-inserted'])[1]";
    static menuDesciptionField: string = "(//textarea[@placeholder='Deskripsikan menu andalan Anda dengan cara yang menarik untuk menggugah pelanggan memesan menu ini'])[1]";
    static addMenuBookButton: string = "//button[normalize-space()='Tambah Buku Menu']";
    static newHeadPackageMenuRadio: string = `//span[text()=' Buat Kepala Paket Baru ']/preceding-sibling::span/input`;             //request better Selector Name
    static existingHeadPackageMenuRadio: string = `//span[text()=' Pakai Menu yang Tersedia ']/preceding-sibling::span/input`;      //request better Selector Name
    static separatePrintYesRadio: string = `//span[text()=' Ya ']/preceding-sibling::span/input`;                                  //request better Selector Name
    static separatePrintNoRadio: string = `//span[text()=' Tidak ']/preceding-sibling::span/input`;                                //request better Selector Name
    static menuPackageNameField: string = `//input[@formcontrolname='menuName']`;
    static addGroupMenuButton: string = `//button[text()=' Tambah Kelompok ']`;

    //Pajak & Service Charge section

    static scRadioButton: string = "(//button[@type='button'])[17]";
    static TaxRadioButton: string = "(//button[@type='button'])[18]";
    static focRadioButton: string = "(//button[@type='button'])[19]";
    static replacementField: string = "(//input[@placeholder='Contoh: Gratis, bonus, hadiah'])[1]";

    //Informasi Buku Menu pop-up

    static menuNamePopup: string = "(//input[@placeholder='Isi Nama Buku Menu'])[1]";
    static menuPricePopup: string = "(//input[@placeholder='Rp0'])[1]";
    static menuCancelPopup: string = "(//button[@class='button button-outline-red button-small button-block'])[1]";
    static menuSavePopup: string = "(//button[@class='button button-orange button-small button-block'])[1]";


}