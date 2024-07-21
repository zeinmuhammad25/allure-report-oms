import BasePage from "../../base/base-page";
import LoginLocator from "./login.locator";
import Urls from "../../configs/urls";
import Element from "../../base/objects/Element";
import LoginScenario from "./login.scenario";


export default class LoginPage extends BasePage implements LoginScenario {
    pageUrl = (): string => Urls.login;

    shouldHave(): Element[] {
        return [
            Element.of(LoginLocator.inputUsername, ''),
            Element.of(LoginLocator.inputPassword, ''),
            Element.ofButton("Masuk", false),
            Element.ofSelector(LoginLocator.suggestConfirmEmail),
            Element.ofSelector(LoginLocator.suggestRegister),
            Element.ofText("Cek email untuk verifikasi atau "),
            Element.ofText("Kirim ulang link verifikasi"),
            Element.ofText("Belum punya akun? "),
            Element.ofText("Daftar Sekarang"),
            Element.ofText("Lupa Kata Sandi?"),
        ];
    }

    private email = process.env.USEREMAIL;
    private emailWrong = "wrongEmail";
    private emailEmpty = "";
    private password = process.env.PASSWORD;
    private passwordEmpty = "";

    async performWrongLogin(): Promise<void> {
        await this.fill(LoginLocator.inputUsername, this.emailWrong);
        await this.expectTextVisible("Kolom ini harus berupa email");
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.inputUsername, this.emailEmpty);
        await this.expectTextVisible("Kolom ini harus diisi");
        await this.expectDisabled(LoginLocator.loginButton);
        await this.fill(LoginLocator.inputPassword, this.passwordEmpty);
        await this.expectTextVisible("Kolom ini harus diisi");
        await this.expectDisabled(LoginLocator.loginButton);

        await this.fill(LoginLocator.inputUsername, this.email);
        await this.fill(LoginLocator.inputPassword, this.password);
        await this.expectEnabled(LoginLocator.loginButton);
    }

    async performForgetPassword() {
        await this.clickText("Lupa Kata Sandi?");
        await this.expectTextVisible("Reset Kata Sandi", true);
        await this.expectTextVisible("Masukkan email yang Anda gunakan saat proses pendaftaran ESB POSLite. Link reset kata sandi akan dikirimkan ke email ini.", true);
        await this.expectHasButton(LoginLocator.buttonResetPasswordBack, " Kembali ");
        await this.expectHasButton(LoginLocator.buttonResetPasswordSubmit, "Kirim", false);

        await this.expectHasValue(LoginLocator.inputResetPassword, '')
        await this.expectDisabled(LoginLocator.buttonResetPasswordSubmit);

        await this.fill(LoginLocator.inputResetPassword, this.emailWrong);
        // bug
        // await this.expectTextVisible("Kolom ini harus berupa email", true);
        await this.expectDisabled(LoginLocator.buttonResetPasswordSubmit);

        await this.fill(LoginLocator.inputResetPassword, this.emailEmpty);
        await this.expectTextVisible("Kolom ini harus diisi", true);
        await this.expectDisabled(LoginLocator.buttonResetPasswordSubmit);

        await this.fill(LoginLocator.inputResetPassword, this.email);
        await this.expectEnabled(LoginLocator.buttonResetPasswordSubmit);
        await this.click(LoginLocator.buttonResetPasswordSubmit);
        await this.waitForResponse("auth/forgot-password");
        await this.expectTextVisible(`Link reset kata sandi telah dikirim ke email ${this.email}`);
    }

    async performLogin(): Promise<void> {
        await this.clear(LoginLocator.inputUsername);
        await this.clear(LoginLocator.inputPassword);
        await this.expectDisabled(LoginLocator.loginButton);

        await this.fill(LoginLocator.inputUsername, this.email);
        await this.fill(LoginLocator.inputPassword, this.password);
        await this.expectEnabled(LoginLocator.loginButton);
        await this.click(LoginLocator.loginButton);
    }
}