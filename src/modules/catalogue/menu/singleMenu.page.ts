import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";
import SingleMenuScenario from "./singleMenu.scenario";


export default class SingleMenuPage extends BasePage implements SingleMenuScenario {


    pageUrl = (): string => Urls.singlemenu;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.menunamefield),
            Element.ofSelector(MenuLocator.menucodefield),
            Element.ofSelector(MenuLocator.menucategorybutton),
            Element.ofSelector(MenuLocator.menudescfield),
            Element.ofSelector(MenuLocator.menucategoryfield),
            Element.ofSelector(MenuLocator.addmenubookbutton),
            Element.ofSelector(MenuLocator.menusavebutton),
            Element.ofSelector(MenuLocator.menucancelbutton),

        ];
    }


}