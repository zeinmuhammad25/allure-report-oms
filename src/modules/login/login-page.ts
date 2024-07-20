import BasePage from "../../base/base-page";
import LoginLocator from "./login-locator";
import Urls from "../../configs/urls";

export default class LoginPage extends BasePage {
    pageUrl = (): string => Urls.login;

    async login() {
        const email = process.env.USEREMAIL;
        const password = process.env.PASSWORD;
        await this.fill(LoginLocator.usernameInput, email);
        await this.fill(LoginLocator.passwordInput, password);
        await this.click(LoginLocator.loginButton);
    }
}