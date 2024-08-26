import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import LogoutScenario from "./logout.scenario";
import LogoutLocator from "./logout.locator";
import BasePosLitePage from "../../base-pos-lite-page";


export default class LogoutPage extends BasePosLitePage implements LogoutScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(LogoutLocator.logoutConfirmationPopUp),
            Element.ofSelector(LogoutLocator.logoutCancelButton),
            Element.ofSelector(LogoutLocator.logoutConfirmationButton),
        ];
    }

    async performLogout(): Promise<void> {
        await this.click(LogoutLocator.accountDropdown);
        await this.click(LogoutLocator.logoutButton);
        await this.expectVisible(LogoutLocator.logoutConfirmationPopUp);
        await this.click(LogoutLocator.logoutConfirmationPopUp);

    }

    async navigateToLogoutPage(): Promise<void> {
        await this.click(LogoutLocator.accountDropdown);
        await this.expectVisible(LogoutLocator.logoutButton);
        console.log('The logout option is present');
        await this.click(LogoutLocator.logoutButton);
        await this.expectVisible(LogoutLocator.logoutConfirmationButton);
        console.log('the logout popup confirmation is present');
        await this.expectVisible(LogoutLocator.logoutConfirmationButton);
        console.log('The logout popup save button is present');
        await this.expectVisible(LogoutLocator.logoutCancelButton);
        console.log('the logout popup cancel button is present');

    }


}