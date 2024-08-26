import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import UserAccessPOSLocator from "./userAccessPOS.locator";
import UserAccessPOSScenario from "./userAccessPOS.scenario";


export default class UserAccessPOSPage extends BasePosLitePage implements UserAccessPOSScenario {


    pageUrl = (): string => this.urls.get.userAccessControl.userAccessPOSUrl;

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