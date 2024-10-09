import BaseLocator from "../../../../base/base-locator";
import {PaymentMethod} from "../../objects/paymentMethod";


export default class PaymentLocator extends BaseLocator {
    static backButton: string = "//button[contains(@class, 'back-button')]";
    static payButton: string = "//button[@id='p-payment']";
    static payConfirmButton: string = "//button[@id='selection-botton-1']";
    static payCancelButton: string = "//button[@id='selection-botton-0']";
    static fullNameField: string = "//input[@id='full-name-input']";
    static phoneField: string = "//input[@id='phone-number-input']";
    static emailField: string = "//input[@id='email-input']";
    static tableNameField: string = "//input[@id='table-name-input']";
    static onlinePaymentButton: string = "(//input[@id='table-name-input'])[1]";
    static offlinePaymentButton: string = "(//input[@id='table-name-input'])[2]";
    static paymentMethodRadioButton = (paymentMethod:PaymentMethod) : string => `//mat-radio-button[@id='payment-method-list-radio-${paymentMethod}']`;
    static paymentTotalButton: string = "mat-icon";
    static addPromotionButton: string = "//button[@id='p-promo-voucher']";
    static ovoSendButton: string = "//button[@type='submit']";
    static ovoConfirmationOkButton: string = "//button//*[contains(text(),'Ok')]";

}