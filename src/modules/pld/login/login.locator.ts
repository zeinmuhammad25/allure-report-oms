import BaseLocator from "../../../base/base-locator";

export default class LoginLocator extends BaseLocator {
    static inputUsername: string = '#email';
    static inputPassword: string = '#password';
    static loginButton: string = `//button`;

    static suggestConfirmEmail: string = '.suggest-confirm-email';
    static suggestRegister: string = '.suggest-register';

    static resetPasswordHeadline = ".headline";
    static resetPasswordSubHeadline = ".subheadline";
    static inputResetPassword: string = '#email';
    static buttonResetPasswordBack: string = `[type=button]`;
    static buttonResetPasswordSubmit: string = `[type=submit]`;
}