import BasePage from "../../base/base-page";
import Element from "../../base/objects/Element";
import RegisterScenario from "./register.scenario";
import Urls from "../../configs/urls";

export default class RegisterPage extends BasePage implements RegisterScenario {
    pageUrl = (): string => Urls.register;

    shouldHave(): Element[] {
        return [];
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