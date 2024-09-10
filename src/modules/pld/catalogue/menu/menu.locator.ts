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
    static menuSearchMenuPackageField: string = "//input[@placeholder='Cari berdasarkan kata kunci']";
    static menuSearchButton: string = "//span[@type='suffix']";
    static menuTotalCount: string = "//div[@class='page-total-container']";

    //dataTableLocator
    static paginationNextButton: string = "//li[@title='Halaman Berikutnya']//button[@type='button']";
    static paginationPreviousButton: string = "//li[@title='Halaman Sebelumnya']//button[@type='button']";
    static menuPackageDeleteButton: string = "//tr[@class='ant-table-row ng-star-inserted']/td[@class='ant-table-cell']/div[@class='d-flex align-items-center justify-content-center gap-6']/button[@class='button button-red button-x-small button-icon']";
    static menuDeletePopupImage: string = "//img[@class='img-fluid ng-star-inserted']";
    static menuDeleteConfirmationButton: string = "//button[@id='btn-modal-confirm']";
    static menuDeleteSuccessNotification: string = "//body//div//nz-notification-container//div//div[2]";
    static addRecipeButton: string = "//button[@class='esb-btn-sm-outline-secondary btn-recipe2 ng-star-inserted']";

    static instructionButton: string = "(//button[@class='button button-yellow button-small'])[1]";

    //testDataMenuSingle
    static menuSingleTestDataFirstRow: string = "//tr[td[@class='ant-table-cell' and text()='1.']]/td[@class='ant-table-cell'][2][text()='Test Menu 01']";
    static menuSingleUpdateDataFirstRow: string = "//tr[td[@class='ant-table-cell' and text()='1.']]/td[@class='ant-table-cell'][2][text()='Test Menu Edit 01']";
    static menuSingleDeleteButton: string = "//tr[td[@class='ant-table-cell' and text()='1.']]//button[@id='btn-delete']";
    static menuSingleEditButton: string = "//tr[td[@class='ant-table-cell' and text()='1.']]//button[@id='btn-update']";

    //testDataMenuPackage
    static menuPackageTestDataFirstRow: string = "//tr[td[@class='ant-table-cell' and text()='1.']]/td[@class='ant-table-cell'][2][text()='Test Menu Package 01']";
    static menuPackageDeleteTestDataButton: string = "//tr[td[@class='ant-table-cell' and text()='1.']]//button[@id='btn-delete']";


    //tooltipButton
    static menuTooltipOkeButton: string = "//div[@class='introjs-tooltipbuttons']/a[text()='Oke']"
    static menuTooltipOkeOrangeButton: string = "//div[@class='introjs-tooltip tooltip-menu-recipe introjs-bottom-right-aligned']//div[@class='introjs-tooltipbuttons']//a[@role='button' and text()='Oke']";


}