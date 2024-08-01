import BaseLocator from "../../../base/base-locator";

export default class OnlinePaymentLocator extends BaseLocator {
    static dataReadGuideButton: string = "(//button[@class='button button-yellow button-small'])[1]";
    static onlinePaymentDropdown: string = "(//nz-select-item[@title='Test QRIS lagi'])[1]";
    static onlinePaymentFilter: string = "(//button[@class='button-mobile button-outline-blue full-width'])[1]";
    static onlinePaymentTransNo: string = "(//input[@placeholder='Cari Berdasarkan No. Transaksi'])[1]";
    static onlinePaymentDayTab: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static onlinePaymentWeekTab: string = "(//label[@class='radio-item mx-1 ant-radio-button-wrapper ng-star-inserted'])[1]";
    static onlinePaymentDateField: string = "(//input[@type='text'])[1]";
    static onlinePaymentDownload: string = "(//button[@class='esb-btn-lg-secondary w-100'])[1]";
    static onlinePaymentCancelDownload: string = "(//button[@class='btn btn-block btn-warning'])[1]";
    static onlinePaymentConfirmDownload: string = "(//button[@class='btn btn-block btn-primary'])[1]";

}
