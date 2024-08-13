import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import MenuManagementScenario from "./menuManagement.scenario";
import MenuManagementLocator from "./menuManagement.locator";


export default class MenuManagementPage extends BasePage implements MenuManagementScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/esb-order/setting/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(MenuManagementLocator.menuManagementTab),
            Element.ofSelector(MenuManagementLocator.branchSearch),
            Element.ofSelector(MenuManagementLocator.branchColumn),
            Element.ofSelector(MenuManagementLocator.firstBranchEditButton),

        ];
    }


}