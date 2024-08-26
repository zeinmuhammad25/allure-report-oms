import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import CategoryScenario from "./category.scenario";
import CategoryLocator from "./category.locator";


export default class CategoryPage extends BasePosLitePage implements CategoryScenario {


    pageUrl = (): string => this.urls.get.catalogue.categoryUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(CategoryLocator.categoryTab),
            Element.ofSelector(CategoryLocator.subCategoryTab),
            Element.ofSelector(CategoryLocator.categoryNameColumn),
            Element.ofSelector(CategoryLocator.statusNameColumn),
            Element.ofSelector(CategoryLocator.categoryNameSearch),
            Element.ofSelector(CategoryLocator.statusSearch),
            Element.ofSelector(CategoryLocator.addCategoryButton),
        ];
    }


}