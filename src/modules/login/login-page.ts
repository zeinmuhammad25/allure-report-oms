import BasePage from "../../base/base-page";
import LoginLocator from "./login-locator";
import Urls from "../../configs/urls";

export default class LoginPage extends BasePage {
    pageUrl = (): string => Urls.login;

    private email = process.env.USEREMAIL;
    private emailWrong = "wrongEmail";
    private emailEmpty = "";
    private password = process.env.PASSWORD;
    private passwordEmpty = "";

    async wrongLogin(): Promise<void> {
        await this.fill(LoginLocator.usernameInput, this.emailWrong);
        await this.expectTextVisible("Kolom ini harus berupa email");
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.usernameInput, this.emailEmpty);
        await this.expectTextVisible("Kolom ini harus diisi");
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.passwordInput, this.passwordEmpty);
        await this.expectTextVisible("Kolom ini harus diisi");
        await this.expectDisabled(LoginLocator.loginButton);

        await this.fill(LoginLocator.usernameInput, this.email);
        await this.fill(LoginLocator.passwordInput, this.password);
        await this.expectEnabled(LoginLocator.loginButton);
    }

    async login(): Promise<void> {
        await this.clear(LoginLocator.usernameInput);
        await this.clear(LoginLocator.passwordInput);
        await this.expectDisabled(LoginLocator.loginButton);

        await this.fill(LoginLocator.usernameInput, this.email);
        await this.fill(LoginLocator.passwordInput, this.password);
        await this.expectEnabled(LoginLocator.loginButton);
        await this.click(LoginLocator.loginButton);
    }
}