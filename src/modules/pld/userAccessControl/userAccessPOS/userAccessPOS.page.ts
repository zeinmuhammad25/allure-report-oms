import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import UserAccessPOSLocator from "./userAccessPOS.locator";
import UserAccessPOSScenario from "./userAccessPOS.scenario";


export default class UserAccessPOSPage extends BasePosLitePage implements UserAccessPOSScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/role/pos-user-role/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(UserAccessPOSLocator.userAccessPOSTab),
            Element.ofSelector(UserAccessPOSLocator.addUserAccessPOSButton),
            Element.ofSelector(UserAccessPOSLocator.userAccessPOSNameField),
            Element.ofSelector(UserAccessPOSLocator.userAccessPOSNameSearch),
            Element.ofSelector(UserAccessPOSLocator.userActiveFeatureSearch),
            Element.ofSelector(UserAccessPOSLocator.statusSearch),
            Element.ofSelector(UserAccessPOSLocator.userAccessPOSNameColumn),
            Element.ofSelector(UserAccessPOSLocator.userActiveFeatureColumn),
            Element.ofSelector(UserAccessPOSLocator.statusNameColumn),

        ];
    }


}