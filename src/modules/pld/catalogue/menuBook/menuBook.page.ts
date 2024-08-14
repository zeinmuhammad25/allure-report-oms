import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import MenuBookScenario from "./menuBook.scenario";
import MenuBookLocator from "./menuBook.locator";


export default class MenuBookPage extends BasePosLitePage implements MenuBookScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/menu-template/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(MenuBookLocator.menuBookTab),
            Element.ofSelector(MenuBookLocator.bookNameColumn),
            Element.ofSelector(MenuBookLocator.inclusivePriceColumn),
            Element.ofSelector(MenuBookLocator.statusNameColumn),
            Element.ofSelector(MenuBookLocator.bookNameSearch),
            Element.ofSelector(MenuBookLocator.inclusivePriceSearch),
            Element.ofSelector(MenuBookLocator.statusSearch),
            Element.ofSelector(MenuBookLocator.addCategoryButton),

        ];
    }


}