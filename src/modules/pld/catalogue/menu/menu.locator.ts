import BaseLocator from "../../../../base/base-locator";

export default class MenuLocator extends BaseLocator {
    // Locator on Menu Page
    static singleMenuButton: string = "//button[@class='button button-orange button-small']";
    static packageMenuButton: string = "//button[@id='tab-menupackage']";
    static archiveMenuButton: string = "//button[@id='tab-menupackage']";
    static importMenuButton: string = "//button[normalize-space()='Impor Menu']"
    static exportMenuButton: string = "//button[normalize-space()='Ekspor Menu']"
    static addMenuButton: string = "(//button[@id='i-menu1'])[1]";
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