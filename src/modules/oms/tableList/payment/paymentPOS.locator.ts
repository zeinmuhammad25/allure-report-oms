import BaseLocator from "../../../../base/base-locator";
import {PaymentObject} from "./PaymentObject";


export default class PaymentPOSLocator extends BaseLocator {
    static buttonApplyMember = "//mat-icon[normalize-space()='account_box']";
    static buttonCheckOnlinePayment = "//mat-icon[normalize-space()='money']";
    static buttonEmployeeMode = "//i[@class='glyphicon glyphicon-credit-card']";
    static buttonAddPromo = "//span[contains(text(),'ADD PROMO')]";
    static escapeKeyboard = "//div[@class='modal-header bg-primary']";
    static inputPaymentAmount = "//input[@placeholder='e.g. 200.000']";
    static buttonGetOutstandingPayment = "//span[normalize-space()='Get Outstanding']";

    static getLocatorButtonAction = (actionPayment: PaymentObject): string => `//span[normalize-space()='${actionPayment}']`;
    static getLocatorButtonArrow = (actionArrow: PaymentObject): string => `//i[@class='glyphicon glyphicon-arrow-${actionArrow}']`;
    static getLocatorPaymentType = (paymentType: PaymentObject): string => `//span[contains(text(),'${paymentType}')]`;
    static getLocatorPaymentMethod = (paymentMethod: PaymentObject): string => `//span[contains(text(),'${paymentMethod}')]`;

    //sectionPaymentCash
    static buttonPayCashFullAmount = "//div[@class='d-flex ng-star-inserted']//span[1]//button[1]";
    static buttonClearCashAmount = "//i[@class='glyphicon glyphicon-repeat']";

    //sectionPaymentDebit
    static getLocatorInputPaymentDebit = (inputField: PaymentObject): string => `//input[@placeholder='${inputField}']`;

    //sectionOtherVoucher
    static inputOtherVoucherCode = "//input[@class='form-control pos-number ng-pristine ng-valid ng-touched']";
    static inputOtherVoucherNotes = "//textarea[@class='form-control ng-untouched ng-pristine ng-valid']";

    //sectionVoucher
    static inputVoucherCode = "//input[@class='form-control pos-text ng-pristine ng-valid ng-touched']";
    static buttonOkVoucher = "//i[@class='glyphicon glyphicon-ok']";
    static buttonRemoveVoucher = "//i[@class='glyphicon glyphicon-remove']";

    //sectionCompliment
    static inputComplimentPercentage = "//input[@placeholder='e.g. 50']";
    static inputComplimentNotes = "//textarea[@class='form-control ng-untouched ng-pristine ng-valid']";

    //sectionOtherCost
    static inputOtherCostNotes = "//textarea[@class='form-control input-text-notes ng-pristine ng-valid ng-touched']";

}