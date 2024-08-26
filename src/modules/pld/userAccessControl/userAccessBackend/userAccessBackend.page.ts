import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import UserAccessBackendScenario from "./userAccessBackend.scenario";
import UserAccessBackendLocator from "./userAccessBackend.locator";


export default class UserAccessBackendPage extends BasePosLitePage implements UserAccessBackendScenario {


    pageUrl = (): string => this.urls.get.userAccessControl.userAccessBackendUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendTab),
            Element.ofSelector(UserAccessBackendLocator.addUserAccessBackendButton),
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendNameSearch),
            Element.ofSelector(UserAccessBackendLocator.userAccessTypeSearch),
            Element.ofSelector(UserAccessBackendLocator.userActiveFeatureSearch),
            Element.ofSelector(UserAccessBackendLocator.statusSearch),
            Element.ofSelector(UserAccessBackendLocator.userAccessBackendNameColumn),
            Element.ofSelector(UserAccessBackendLocator.userAccessTypeColumn),
            Element.ofSelector(UserAccessBackendLocator.userActiveFeatureColumn),
            Element.ofSelector(UserAccessBackendLocator.statusNameColumn),

        ];
    }


}