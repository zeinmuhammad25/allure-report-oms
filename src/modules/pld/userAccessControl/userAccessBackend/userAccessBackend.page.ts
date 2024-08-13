import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import UserAccessBackendScenario from "./userAccessBackend.scenario";
import UserAccessBackendLocator from "./userAccessBackend.locator";


export default class UserAccessBackendPage extends BasePage implements UserAccessBackendScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/role/user-role/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendTab),
            Element.ofSelector(UserAccessBackendLocator.addUserAccessBackendButton),
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendNameField),
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendNameSearch),
            Element.ofSelector(UserAccessBackendLocator.userAccessTypeSearch),
            Element.ofSelector(UserAccessBackendLocator.userActiveFeatureSearch),
            Element.ofSelector(UserAccessBackendLocator.statusSearch),
            Element.ofSelector(UserAccessBackendLocator.statusSearch),
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendNameColumn),
            Element.ofSelector(UserAccessBackendLocator.userAccessTypeColumn),
            Element.ofSelector(UserAccessBackendLocator.userActiveFeatureColumn),
            Element.ofSelector(UserAccessBackendLocator.statusNameColumn),

        ];
    }


}