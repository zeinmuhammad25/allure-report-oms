import BaseLocator from "../../../../../base/base-locator";

export default class WhatsappLocator extends BaseLocator {
    static countryCode: string = "//input[contains(@class,'form-phone-number')]";
    static phoneField: string = "//input[contains(@class,'form-phone-number')]";
    static sendButton: string = "//span[contains(text(),'Send OTP via WhatsApp')]";
    static otpField: string = "//app-otp-input/input";
    static otpField1: string = `(${this.otpField})[1]`;
    static otpField2: string = `(${this.otpField})[2]`;
    static otpField3: string = `(${this.otpField})[3]`;
    static otpField4: string = `(${this.otpField})[4]`;
    static otpField5: string = `(${this.otpField})[5]`;
    static otpField6: string = `(${this.otpField})[6]`;
}