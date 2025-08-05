import Element from "../../../../base/objects/Element";
import BaseEsoPage from "../../base/base-eso-page";
import LoginScenario from "./login.scenario";
import LoginLocator from "./login.locator";

export default class LoginPage extends BaseEsoPage implements LoginScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(LoginLocator.loginGoogleButton),
            Element.ofSelector(LoginLocator.loginFacebookButton),
            Element.ofSelector(LoginLocator.loginGuestButton),
        ]
    }

    loginGoogle(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    loginFacebook(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    loginAsGuest(): Promise<void> {
        throw new Error("Method not implemented.");
    }


}