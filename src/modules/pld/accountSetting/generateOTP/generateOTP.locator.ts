import BaseLocator from "../../../base/base-locator";

export default class GenerateOTPLocator extends BaseLocator {
    static transactionNumberField: string = "#salesNum";
    static otpTypeField: string = "#otpType";
    static otpField: string = "#otp";
    static copyButton: string = "//strong[text()=' Salin']/parent::div/parent::span";
    static generateOTPButton: string = "//button[text()=' Generate OTP ']";


}