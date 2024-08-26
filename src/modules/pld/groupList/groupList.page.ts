import Element from "../../../base/objects/Element";
import GroupListScenario from "./groupList.scenario";
import GroupListLocator from "./groupList.locator";
import BasePosLitePage from "../base-pos-lite-page";


export default class GroupListPage extends BasePosLitePage implements GroupListScenario {


    pageUrl = (): string => this.urls.get.groupList.groupListUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(GroupListLocator.groupListPopUp),
            Element.ofSelector(GroupListLocator.titlePopUp),
            Element.ofSelector(GroupListLocator.searchFieldPopUp),

        ];
    }


}