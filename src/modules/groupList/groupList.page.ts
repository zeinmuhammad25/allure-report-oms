import BasePage from "../../base/base-page";
import Urls from "../../configs/urls";
import Element from "../../base/objects/Element";
import GroupListScenario from "./groupList.scenario";
import GroupListLocator from "./groupList.locator";


export default class GroupListPage extends BasePage implements GroupListScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/role/user/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(GroupListLocator.groupListPopUp),
            Element.ofSelector(GroupListLocator.titlePopUp),
            Element.ofSelector(GroupListLocator.searchFieldPopUp),

        ];
    }


}