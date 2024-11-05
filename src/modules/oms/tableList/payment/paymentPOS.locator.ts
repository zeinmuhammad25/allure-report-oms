import BaseLocator from "../../../../base/base-locator";
import {PaymentList} from "./PaymentList";

export default class PaymentPOSLocator extends BaseLocator {
    static buttonApplyMember = "//mat-icon[normalize-space()='account_box']";
    static buttonCheckOnlinePayment = "//mat-icon[normalize-space()='money']";
    static buttonEmployeeMode = "//i[@class='glyphicon glyphicon-credit-card']";
    static buttonAddPromo = "//span[contains(text(),'ADD PROMO')]";
    static buttonPurchaseVoucher = "//span[normalize-space()='Purchase Voucher']";
    static buttonSavePayment = "//span[normalize-space()='Save Payment']";
    static buttonCancelPayment = "//span[normalize-space()='Cancel']";
    static buttonApplyPayment = "//span[normalize-space()='Apply']";
    static getLocatorButtonArrow = (label: string): string => `//i[@class='glyphicon glyphicon-arrow-${label}']`;
    static getLocatorPaymentType = (paymentType: PaymentList): string => `//span[contains(text(),'${paymentType}')]`;
    static getLocatorPaymentMethod = (paymentMethod: PaymentList): string => `//span[contains(text(),'${paymentMethod}')]`;

    //sectionPaymentCash
    static buttonPayCashFullAmount = "//div[@class='d-flex ng-star-inserted']//span[1]//button[1]";
    static inputCashAmount = "//input[@placeholder='e.g. 200.000']";
    static buttonClearCashAmount = "//i[@class='glyphicon glyphicon-repeat']";

    //sectionOtherVoucher
    static inputOtherVoucherCode = "//input[@class='form-control pos-number ng-pristine ng-valid ng-touched']";
    static inputOtherVoucherAmount = "//input[@placeholder='e.g. 200.000']";
    static inputOtherVoucherNotes = "//textarea[@class='form-control ng-untouched ng-pristine ng-valid']";

    //sectionVoucher
    static inputVoucherCode = "//input[@class='form-control pos-text ng-pristine ng-valid ng-touched']";
    static buttonOkVoucher = "//i[@class='glyphicon glyphicon-ok']";
    static buttonRemoveVoucher = "//i[@class='glyphicon glyphicon-remove']";

    //sectionCompliment
    static inputComplimentPercentage = "//input[@placeholder='e.g. 50']";
    static inputComplimentAmount = "//input[@placeholder='e.g. 200.000']";
    static inputComplimentNotes = "//textarea[@class='form-control ng-untouched ng-pristine ng-valid']";
    static buttonGetOutstandingCompliment = "//span[normalize-space()='Get Outstanding']";

    //sectionOtherCost
    static inputOtherCostNotes = "//textarea[@class='form-control input-text-notes ng-pristine ng-valid ng-touched']";

}