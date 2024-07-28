import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";


export default class MenuPage extends BasePage implements MenuScenario {


    pageUrl = (): string => Urls.menu;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.singlemenubutton),
            Element.ofSelector(MenuLocator.packagemenubutton),
            Element.ofSelector(MenuLocator.archivemenubutton),
            Element.ofSelector(MenuLocator.importmenubutton),
            Element.ofSelector(MenuLocator.exportmenubutton),
            Element.ofSelector(MenuLocator.addmenubutton),
            Element.ofSelector(MenuLocator.menudropdown),
            Element.ofSelector(MenuLocator.menusearchfield),
            Element.ofSelector(MenuLocator.totalmenu),
            Element.ofSelector(MenuLocator.paginationnextbtn),
            Element.ofSelector(MenuLocator.paginationbackbtn),
            Element.ofSelector(MenuLocator.addrecipebutton),
            Element.ofSelector(MenuLocator.editmenubutton),
            Element.ofSelector(MenuLocator.deletemenubutton),
            Element.ofSelector(MenuLocator.instructionbutton),
            Element.ofText("Menu Satuan"),
        ];
    }


}