import BaseLocator from "../../../../base/base-locator";

export default class ForgotPasswordLocator extends BaseLocator {
    static forgotPasswordButton: string = "//a[text()='Lupa Kata Sandi?']";
    static emailField: string = "#email";
    static backButton: string = "//button[text()=' Kembali ']";
    static sendButton: string = "//button[text()=' Kirim ']";

    static newPasswordField: string = "#password";
    static confirmNewPasswordField: string = "//input[@formcontrolname='cpassword']";
    static backToLoginPageButton: string = "//a[@ng-reflect-router-link='/login']";

}