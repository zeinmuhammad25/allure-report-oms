import BaseLocator from "../../../../base/base-locator";

export default class MenuLocator extends BaseLocator {
    // Locator on Menu Page
    static menuSingleTab: string = "//button[@class='button button-orange button-small']";
    static menuPackageTab: string = "//button[@id='tab-menupackage']";
    static menuArchiveButton: string = "//button[@class='button button-outline-grey button-small']";
    static menuImportButton: string = "//button[normalize-space()='Impor Menu']"
    static menuExportButton: string = "//button[normalize-space()='Ekspor Menu']"
    static menuSingleAddButton: string = "//button[@class='button button-orange button-small']";
    static menuPackageAddButton: string = "//button[normalize-space()='Tambah Menu Paket']";
    static menuDropdownField: string = "//body/app-layout/nz-layout/nz-layout/nz-content[@ng-reflect-ng-class='[object Object]']/div[@ng-reflect-ng-class='[object Object]']/app-menu/app-menu-index/div/div/div/div/div/app-tab-menu-index[@ng-reflect-uac-recipe='[object Object]']/div[1]/div[1]"
    static menuSearchField: string = "//input[@placeholder='Cari berdasarkan Menu']";
    static menuTotalCount: string = "//div[@class='page-total-container']";
    static paginationNextButton: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static paginationPreviousButton: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static addRecipeButton: string = "//button[@class='esb-btn-sm-outline-secondary btn-recipe2 ng-star-inserted']";
    static editMenuButton: string = "(//button)[11]";
    static deleteMenuButton: string = "(//button)[12]";
    static instructionButton: string = "(//button[@class='button button-yellow button-small'])[1]";


    //tooltipButton
    static menuTooltipOkeButton: string = "//div[@class='introjs-tooltipbuttons']/a[text()='Oke']"
    static menuTooltipOkeOrangeButton: string = "//div[@class='introjs-tooltip tooltip-menu-recipe introjs-bottom-right-aligned']//div[@class='introjs-tooltipbuttons']//a[@role='button' and text()='Oke']";


}