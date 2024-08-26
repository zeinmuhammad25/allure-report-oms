import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import MenuBookScenario from "./menuBook.scenario";
import MenuBookLocator from "./menuBook.locator";


export default class MenuBookPage extends BasePosLitePage implements MenuBookScenario {


    pageUrl = (): string => this.urls.get.catalogue.menuBookUrl;


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