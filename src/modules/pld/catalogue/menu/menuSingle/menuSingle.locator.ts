import BaseLocator from "../../../../../base/base-locator";

export default class MenuSingleLocator extends BaseLocator {
    // Locator on Add Menu
    static menuCreateSaveButton: string = "//button[@id='btn-save']";
    static menuCreateCancelButton: string = "//button[@id='btn-cancel']";

    //Buku Menu section
    static menuNameField: string = "//input[@placeholder='Contoh: Nasi Ayam Geprek Pedas']";
    static menuCodeField: string = "//input[@placeholder='Contoh: AYG01']";
    static menuCategoryField: string = "(//input[@placeholder='Isi Kategori Menu'])[1]";
    static menuCategoryButton: string = "//input[@placeholder='Isi Kategori Menu']";
    static menuCategoryOptionOne: string = "//div[contains(@class, 'list-content')]/div[contains(@class, 'list-content__item')][1]";
    static menuSubCategoryOptionOne: string = "//div[contains(@class, 'list-content')]/div[contains(@class, 'list-content__item')][1]";
    static menuCategorySaveButton: string = "//button[@class='button button-orange button-small button-block button-width ng-star-inserted']";
    static menuDescriptionField: string = "//textarea[@placeholder='Deskripsikan menu andalan Anda dengan cara yang menarik untuk menggugah pelanggan memesan menu ini']";
    static menuAddBookButton: string = "//button[normalize-space()='Tambah Buku Menu']";
    static menuNewHeadPackageRadio: string = `//span[text()=' Buat Kepala Paket Baru ']/preceding-sibling::span/input`;
    static menuExistingHeadPackageRadio: string = `//span[text()=' Pakai Menu yang Tersedia ']/preceding-sibling::span/input`;
    static separatePrintYesRadio: string = `//span[text()=' Ya ']/preceding-sibling::span/input`;
    static separatePrintNoRadio: string = `//span[text()=' Tidak ']/preceding-sibling::span/input`;
    static menuPackageNameField: string = `//input[@formcontrolname='menuName']`;
    static menuAddGroupButton: string = `//button[text()=' Tambah Kelompok ']`;

    //Pajak & Service Charge section
    static scRadioButton: string = "//nz-switch[@formcontrolname='flagOtherTax']//button[@type='button']";
    static TaxRadioButton: string = "//nz-switch[@formcontrolname='flagTax']//button[@type='button']";
    static focRadioButton: string = "//nz-switch[@formcontrolname='openPrice']//button[@type='button']";
    static replacementField: string = "//input[@placeholder='Contoh: Gratis, bonus, hadiah']";

    //Informasi Buku Menu pop-up
    static menuNamePopup: string = "//input[@placeholder='Isi Nama Buku Menu']";
    static menuPricePopup: string = "//input[@placeholder='Rp0']";
    static menuCancelPopup: string = "//button[@class='button button-outline-red button-small button-block']";
    static menuSavePopup: string = "//button[@class='button button-orange button-small button-block']";

}