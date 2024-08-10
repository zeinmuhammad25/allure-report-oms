import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import UserScenario from "./user.scenario";
import UserLocator from "./user.locator";


export default class UserPage extends BasePage implements UserScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/role/user/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(UserLocator.userTab),
            Element.ofSelector(UserLocator.emailSearch),
            Element.ofSelector(UserLocator.fullNameSearch),
            Element.ofSelector(UserLocator.userTypeSearch),
            Element.ofSelector(UserLocator.registrationStatusSearch),
            Element.ofSelector(UserLocator.statusSearch),
            Element.ofSelector(UserLocator.emailColumn),
            Element.ofSelector(UserLocator.fullNameColumn),
            Element.ofSelector(UserLocator.userTypeColumn),
            Element.ofSelector(UserLocator.registrationStatusColumn),
            Element.ofSelector(UserLocator.statusNameColumn),
            Element.ofSelector(UserLocator.addUserButton),

        ];
    }


}