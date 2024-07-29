import BaseLocator from "../../base/base-locator";

export default class PromotionLocator extends BaseLocator {
    static discnotepercent: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static discnoterupiah: string = "(//span[@class='ant-radio-button'])[1]";
    static discmenurupiah: string = "(//span[@class='ant-radio-button'])[2]";
    static disccustompercent: string = "(//span[@class='ant-radio-button'])[3]";
    static discsavebutton: string = "(//button[normalize-space()='Lanjut'])[1]";
    static disccancelbutton: string = "(//button[normalize-space()='Batal'])[1]";

    //Detail Promo
    static discnamefield: string = "(//input[@id='notes'])[1]";
    static discdiscfield: string = "(//input[@id='discount'])[1]";
    static discbranchfield: string = "(//input[@id='discount'])[1]";
    static discpercentfield: string = "(//input[@id='discount'])[1]";
    static mintransfield: string = "(//input[@id='minSalesPrice'])[1]";
    static maxdiscfield: string = "(//input[@id='maxSalesPrice'])[1]";
    static paymentmethodfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";


}