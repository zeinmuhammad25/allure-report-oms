import BaseLocator from "../../../../base/base-locator";

export default class PrinterLocator extends BaseLocator {

    //printerSidebar

    static printerSettingSidebar: string = "//div[contains(text(),'Pengaturan Printer')]";
    static printerSidebar: string = "//a[@ng-reflect-router-link='printer-setting/station']";

    //printerPage

    static printerButtonAdd: string = "//button[@id='i-station1']";
    static printerSearchBar: string = "//input[@placeholder='Cari Berdasarkan Printer']";
    static printerSearchDropdown: string = "//nz-select-item[@title='Nama Printer']";
    static printerDeleteButton: string = "//button[@class='button button-red button-x-small button-icon']";
    static printerPopupDelete: string = "//button[@class='button button-orange button-small button-block']";
    static printerPopupCancel: string = "//button[@class='button button-outline-red button-small button-block']";
    static printerEditButton: string = "//button[@class='button button-blue button-x-small button-icon']";
    static printerSearchButton: string = "//i[@class='anticon anticon-search ng-star-inserted']//*[name()='svg']";


}