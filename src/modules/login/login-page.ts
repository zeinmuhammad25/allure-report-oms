import BasePage from "../../base/base-page";
import LoginLocator from "./login-locator";
import Urls from "../../configs/urls";

export default class LoginPage extends BasePage {
    pageUrl = (): string => Urls.login;

    async wrongLogin(): Promise<void> {
        const email: string = "wrongEmail";
        const password: string = "";
        await this.fill(LoginLocator.usernameInput, email);
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.passwordInput, password);
        await this.expectDisabled(LoginLocator.loginButton);
    }

    async login(): Promise<void> {
        const email = process.env.USEREMAIL;
        const password = process.env.PASSWORD;
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.usernameInput, email);
        await this.fill(LoginLocator.passwordInput, password);
        await this.expectEnabled(LoginLocator.loginButton);
        await this.click(LoginLocator.loginButton);
    }
}