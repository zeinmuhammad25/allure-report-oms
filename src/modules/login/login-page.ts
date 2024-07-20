import BasePage from "../../base/base-page";
import LoginLocator from "./login-locator";
import Urls from "../../configs/urls";
import Element from "../../base/objects/Element";


export default class LoginPage extends BasePage {
    pageUrl = (): string => Urls.login;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(LoginLocator.suggestConfirmEmail),
            Element.ofSelector(LoginLocator.suggestRegister),
            Element.ofText("Cek email untuk verifikasi atau"),
            Element.ofText("Kirim ulang link verifikasi"),
            Element.ofText("Belum punya akun? "),
            Element.ofText("Daftar Sekarang"),
        ];
    }

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