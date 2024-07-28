import BaseLocator from "../../../base/base-locator";

export default class MenuLocator extends BaseLocator {
    // Locator on Menu Page
    static singlemenubutton: string = "//button[@id='tab-menu-satuan']";
    static packagemenubutton: string = "//button[@id='tab-menupackage']";
    static archivemenubutton: string = "//button[@id='tab-menupackage']";
    static importmenubutton: string = "//button[normalize-space()='Impor Menu']"
    static exportmenubutton: string = "//button[normalize-space()='Ekspor Menu']"
    static addmenubutton: string = "//button[normalize-space()='Ekspor Menu']";
    static menudropdown: string = "//nz-select-top-control[@class='ng-tns-c137-291 ant-select-selector']"//request for better selector name
    static menusearchfield: string = "//input[@placeholder='Cari berdasarkan Menu']";
    static totalmenu: string = "//div[@class='page-total-container']";
    static paginationnextbtn: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static paginationbackbtn: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static addrecipebutton: string = "//button[@class='esb-btn-sm-outline-secondary btn-recipe2 ng-star-inserted']";
    static editmenubutton: string = "(//button)[11]";
    static deletemenubutton: string = "(//button)[12]";
    static instructionbutton: string = "(//button[@class='button button-yellow button-small'])[1]";

}