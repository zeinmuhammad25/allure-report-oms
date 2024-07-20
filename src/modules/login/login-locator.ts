import BaseLocator from "../../base/base-locator";

export default class LoginLocator extends BaseLocator {
    static usernameInput: string = '#email';
    static passwordInput: string = '#password';
    static loginButton: string = `//button`;

}