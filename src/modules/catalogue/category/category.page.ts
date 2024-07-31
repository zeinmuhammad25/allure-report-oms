import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import CategoryScenario from "./category.scenario";
import CategoryLocator from "./category.locator";


export default class CategoryPage extends BasePage implements CategoryScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/menu-category/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(CategoryLocator.categoryTab),
            Element.ofSelector(CategoryLocator.subCategoryTab),
            Element.ofSelector(CategoryLocator.categoryNameColumn),
            Element.ofSelector(CategoryLocator.statusNameColumn),
            Element.ofSelector(CategoryLocator.categoryNameSearch),
            Element.ofSelector(CategoryLocator.statusSearch),
            Element.ofSelector(CategoryLocator.addCategoryButton)
        ];
    }


}