import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuScenario from "./menu.scenario";
import MenuLocator from "./menu.locator";


export default class MenuPage extends BasePosLitePage implements MenuScenario {


    pageUrl = (): string => this.urls.get.catalogue.menuUrl;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.singleMenuButton),
            Element.ofSelector(MenuLocator.packageMenuButton),
            Element.ofSelector(MenuLocator.archiveMenuButton),
            Element.ofSelector(MenuLocator.importMenuButton),
            Element.ofSelector(MenuLocator.exportMenuButton),
            Element.ofSelector(MenuLocator.addMenuButton),
            Element.ofSelector(MenuLocator.menuDropdownField),
            Element.ofSelector(MenuLocator.menuSearchField),
            Element.ofSelector(MenuLocator.menuTotalCount),
            Element.ofSelector(MenuLocator.paginationNextButton),
            Element.ofSelector(MenuLocator.paginationPreviousButton),
            Element.ofSelector(MenuLocator.addRecipeButton),
            Element.ofSelector(MenuLocator.editMenuButton),
            Element.ofSelector(MenuLocator.deleteMenuButton),
            Element.ofSelector(MenuLocator.instructionButton),
            Element.ofText("Menu Satuan"),
        ];
    }


}