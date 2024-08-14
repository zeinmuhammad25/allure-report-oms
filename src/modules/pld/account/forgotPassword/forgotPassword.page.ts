import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import ForgotPasswordScenario from "./forgotPassword.scenario";
import ForgotPasswordLocator from "./forgotPassword.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class ForgotPasswordPage extends BasePosLitePage implements ForgotPasswordScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(ForgotPasswordLocator.emailField),
            Element.ofSelector(ForgotPasswordLocator.backButton),
            Element.ofSelector(ForgotPasswordLocator.sendButton),

        ];
    }


}