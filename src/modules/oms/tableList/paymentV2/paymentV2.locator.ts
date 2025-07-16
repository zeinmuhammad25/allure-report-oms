import BaseLocator from "../../../../base/base-locator";
import PaymentList from "../../objects/paymentList";


export default class PaymentV2Locator extends BaseLocator {
    static buttonApplyMember: string = "//mat-icon[normalize-space()='account_box']";
    static buttonCheckOnlinePayment: string = "//span[normalize-space()='Check Online Payment']";
    static buttonEmployeeMode: string = "//i[@class='glyphicon glyphicon-credit-card']";
    static buttonAddPromo: string = "//span[contains(text(),'ADD PROMO')]";
    static escapeKeyboard: string = "//div[@class='modal-header bg-primary']";
    static popUpPayment: string = "//app-payment-amount-dialog//mat-card[contains(@class, 'mat-card')]";
    static closePopUpPayment: string = "//img[@src='assets/images/icon-close.png']";
    static inputPaymentAmount: string = "//div[@class='mat-form-field-infix']";
    static buttonClearAmount: string = "//img[@src='assets/images/icon-delete.png']";
    static scanVoucher: string = "//div//span[normalize-space()='Scan Voucher']";
    static cancelVoucher: string = "//button[@class='btn-close ng-star-inserted']//img";
    static saveVoucher: string = "//div[@class='d-flex justify-center align-items-center save-voucher-btn-wrapper']//button[@type='button']";
    static gridSelectCashBord = (selectCash: PaymentList): string => `//div//button//span[@class='numeric-text'][normalize-space()='${selectCash}']`;
    static paymentSection = (sectionName: PaymentList): string => `//div[contains(@class, 'mat-tab-labels')]//div[contains(text(), '${sectionName}')]`;
    static cancelPayment: string = "//button[@class='delete-button mat-stroked-button ng-star-inserted']//span[@class='mat-button-wrapper']";
    static popUpCancelPayment: string = "//app-confirm-dialog//div[contains(@class, 'modal-body')]";
    static buttonValidation = (validation: string): string => `//button[contains(@class, 'btn-action')]//span[normalize-space()='${validation}']`;
    static getLocatorButtonAction = (actionPayment: PaymentList): string => `//span[normalize-space()='${actionPayment}']`;
    static getLocatorButtonArrow = (actionArrow: PaymentList): string => `//i[@class='glyphicon glyphicon-arrow-${actionArrow}']`;
    static getLocatorPaymentType = (paymentType: PaymentList): string => `//span[contains(text(),'${paymentType}')]`;
    static getLocatorPaymentMethod = (paymentMethod: PaymentList): string => `//span[contains(text(),'${paymentMethod}')]`;
    static buttonPayFullAmount: string = "//div[@class='col-sm-4 d-flex flex-column']/div[1]/div[1]";

    //sectionPaymentDebit
    static getLocatorInputPaymentDebit = (inputField: PaymentList): string => `//input[@placeholder='${inputField}']`;
    static buttonAddCardDetails: string = "//button/span[normalize-space()='Add card details']";

    //sectionOtherVoucher&Voucher
    static inputVoucherCode: string = "//div//input[@placeholder='ABCD1234']";
    static inputOtherVoucherValue: string = "//div//input[@placeholder='Enter voucher amount']";

    //sectionCompliment
    static inputComplimentPercentage: string = "//div[contains(@class, 'justify-between')]//input[contains(@class, 'cash-input')]";
    static inputComplimentAmount: string = "//div[contains(@class, 'infix')]//input[contains(@class, 'cash-input')]";
    static inputComplimentNotes: string = "//div//textarea[@placeholder='Inputted the wrong orders']";

    //sectionOtherCost
    static inputOtherCostNotes: string = "//div//textarea[@placeholder='Client launch meeting']";

    //User Authorization POP UP
    static popUpUserAuthorization: string = "//div[@class='modal-header bg-primary']//h4[normalize-space()='User Authorization']";
    static popUpUserAuthorizationPin: string = "//span[normalize-space()='PIN']";
    static popUpUserAuthorizationOtp: string = "//span[normalize-space()='OTP']";
    static inputPinOrOtpField: string = "//app-auth-modal//div[contains(@class, 'mat-form-field-infix')]//input[contains(@class, 'mat-input-element')]";
    static authorizeButton: string = "//div[@class='modal-footer justify-content-center']//span[@class='mat-button-wrapper'][normalize-space()='Authorize']";
    static cancelButton: string = "//div[@class='modal-footer justify-content-center']//span[@class='mat-button-wrapper'][normalize-space()='Cancel']";
    static valueOutstanding: string = "//div[contains(@class, 'd-flex') and contains(@class, 'row-dialog')]//div[label/text()='Outstanding']//input[@class='form-control pos-number'] ";


}