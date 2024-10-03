import BaseLocator from "../../../../../base/base-locator";

export default class WhatsappLocator extends BaseLocator {
    static countryCode: string = "//input[contains(@class,'form-phone-number')]";
    static phoneField: string = "//input[contains(@class,'form-phone-number')]";
    static sendButton: string = "//span[contains(text(),'Send OTP via WhatsApp')]";
    static otpField: string = "//app-otp-input/input";
    static otpFieldByIndex = (index: any): string => `(${this.otpField})[${index}]`;
}