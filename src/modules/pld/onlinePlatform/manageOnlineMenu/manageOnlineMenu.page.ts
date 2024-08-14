import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import ManageOnlineMenuScenario from "./manageOnlineMenu.scenario";
import ManageOnlineMenuLocator from "./manageOnlineMenu.locator";


export default class ManageOnlineMenuPage extends BasePosLitePage implements ManageOnlineMenuScenario {


    pageUrl = (): string => Urls.menu;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(ManageOnlineMenuLocator.grabFoodButton),
            Element.ofSelector(ManageOnlineMenuLocator.grabFoodCoachMark),
            Element.ofSelector(ManageOnlineMenuLocator.brachSearchField),
            Element.ofText("Daftar Cabang"),

        ];
    }


}