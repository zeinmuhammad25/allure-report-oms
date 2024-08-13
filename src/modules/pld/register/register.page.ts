import BasePage from "../../../base/base-page";
import Element from "../../../base/objects/Element";
import RegisterScenario from "./register.scenario";
import Urls from "../../../configs/urls";
import RegisterLocator from "./register.locator";

export default class RegisterPage extends BasePage implements RegisterScenario {
    pageUrl = (): string => Urls.register;

    shouldHave(): Element[] {
        return [
            Element.ofText("Gabung dengan 20.000+ UMKM lainnya!"),
            Element.ofText("Nama Penanggung Jawab"),
            Element.ofText("Email"),
            Element.ofText("Nomor Ponsel"),
            Element.ofText("Sudah punya akun? Masuk Sekarang"),
            Element.ofSelector(RegisterLocator.picNameField),
            Element.ofSelector(RegisterLocator.emailFieldRegister),
            Element.ofSelector(RegisterLocator.phoneFieldRegister),
            Element.ofSelector(RegisterLocator.buttonRegister),
            Element.ofSelector(RegisterLocator.signInNowButton),
        ];
    }

    performRegister(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async performClickTnC(): Promise<void> {
        await this.clickText('Syarat dan Ketentuan');
    }

    performClickPrivacyPolicy(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    performRegisterWithWrongPhone(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    performRegisterWithWrongEmail(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    performRegisterWithWrongName(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    performRegisterWithWrongPassword(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}