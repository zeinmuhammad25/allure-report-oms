import BasePosLitePage from "../../../base-pos-lite-page";
import Urls from "../../../../../configs/urls";
import Element from "../../../../../base/objects/Element";
import MenuLocator from "../menu.locator";
import SingleMenuScenario from "./singleMenu.scenario";


export default class SingleMenuPage extends BasePosLitePage implements SingleMenuScenario {


    pageUrl = (): string => Urls.singlemenu;

    shouldHave(): Element[] {
        return [

            Element.ofSelector(MenuLocator.menuNameField),
            Element.ofSelector(MenuLocator.menuCodeField),
            Element.ofSelector(MenuLocator.menuCategoryButton),
            Element.ofSelector(MenuLocator.menuDesciptionField),
            Element.ofSelector(MenuLocator.menuCategoryField),
            Element.ofSelector(MenuLocator.addMenuBookButton),
            Element.ofSelector(MenuLocator.saveMenuButton),
            Element.ofSelector(MenuLocator.cancelMenuButton),

        ];
    }


}