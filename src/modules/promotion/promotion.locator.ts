import BaseLocator from "../../base/base-locator";

export default class PromotionLocator extends BaseLocator {
    static discPercent: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static discNoteRupiah: string = "(//span[@class='ant-radio-button'])[1]";
    static discMenuRupiah: string = "(//span[@class='ant-radio-button'])[2]";
    static discCustomPercent: string = "(//span[@class='ant-radio-button'])[3]";
    static discSaveButton: string = "(//button[normalize-space()='Lanjut'])[1]";
    static discCancelButton: string = "(//button[normalize-space()='Batal'])[1]";

    //Detail Promo
    static discNameField: string = "(//input[@id='notes'])[1]";
    static discDiscField: string = "(//input[@id='discount'])[1]";
    static discBranchField: string = "(//input[@id='discount'])[1]";
    static discPercentField: string = "(//input[@id='discount'])[1]";
    static minTransField: string = "(//input[@id='minSalesPrice'])[1]";
    static maxDiscField: string = "(//input[@id='maxSalesPrice'])[1]";
    static paymentMethodField: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";


}