import BaseLocator from "../../../../base/base-locator";

export default class PromoCodeLocator extends BaseLocator {
    static accountDropdown: string = "//div[@nzoverlayclassname='dropdown-account']";
    static promoCodeButton: string = "//span[text()='Kode Promo']/parent::li";
    static promoCodePopUp: string = "//app-modal-applied-promotion-reward";
    static closeButtonPopUp: string = "//img[@alt='icon close']";
    static promoCodeField: string = "//input[@placeholder='Isi kode di sini']";
    static historyPromoCodeButton: string = "//button[@ng-reflect-router-link='/promotion-reward']";
    static applyPromoCodeButton: string = "//button[text()=' Terapkan ']";


}