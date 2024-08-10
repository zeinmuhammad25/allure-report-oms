import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import LogoutScenario from "./logout.scenario";
import LogoutLocator from "./logout.locator";


export default class LogoutPage extends BasePage implements LogoutScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(LogoutLocator.logoutConfirmationPopUp),
            Element.ofSelector(LogoutLocator.cancelLogoutButton),
            Element.ofSelector(LogoutLocator.logoutConfirmationButton),
        ];
    }


}