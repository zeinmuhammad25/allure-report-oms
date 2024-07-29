import BaseLocator from "../../../base/base-locator";

export default class PrinterLocator extends BaseLocator {
    static printerfilter: string = "(//nz-select-item[@title='Nama Printer'])[1]";
    static printername: string = "(//div[normalize-space()='Nama Printer'])[1]";
    static printermode: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static printerbranch: string = "(//nz-option-item[@title='Mode Catakan'])[1]";
    static findprinterfield: string = "(//nz-input-group[@class='ant-input-affix-wrapper ant-input-affix-wrapper-lg'])[1]";
    static printerarchivebtn: string = "(//button[@class='button button-outline-grey button-small'])[1]";
    static addprinterbtn: string = "(//button[normalize-space()='Printer'])[1]";


    // Add Printer Locator

    static stationnamefield: string = "(//input[@id='stationName'])[1]";
    static printerbranchfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static printerviewdropdown: string = "(//nz-select-item[@title='Standar'])[1]";
    static printerviewops1: string = "(//div[normalize-space()='Per Jumlah Menu'])[1]";
    static printerviewops2: string = "(//nz-option-item[@title='Per Menu'])[1]";
    static printerview: string = "(//div[contains(text(),'Standar')])[1]";
    static printercancelbtn: string = "(//button[normalize-space()='Batal'])[1]";
    static printersavebtn: string = "(//button[normalize-space()='Batal'])[1]";
}