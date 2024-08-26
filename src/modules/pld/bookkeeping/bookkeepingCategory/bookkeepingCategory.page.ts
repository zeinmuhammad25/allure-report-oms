import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BookkeepingCategoryLocator from "./bookkeepingCategory.locator"
import BookkeepingCategoryScenario from "./bookkeepingCategory.scenario"


export default class BookkeepingCategoryPage extends BasePosLitePage implements BookkeepingCategoryScenario {


    pageUrl = (): string => this.urls.get.bookkeeping.bookkeepingCategoryUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookkeepingCategoryLocator.guideButton),
            Element.ofSelector(BookkeepingCategoryLocator.addBookkeepingCategoryButton),
            Element.ofSelector(BookkeepingCategoryLocator.archiveBookkeepingCategoryButton),
            Element.ofSelector(BookkeepingCategoryLocator.bookkeepingCategorySearch),
            Element.ofSelector(BookkeepingCategoryLocator.bookkeepingTypeSearch),
            Element.ofSelector(BookkeepingCategoryLocator.numberColumn),
            Element.ofSelector(BookkeepingCategoryLocator.bookkeepingNameColumn),
            Element.ofSelector(BookkeepingCategoryLocator.bookkeepingTypeColumn),
        ];
    }


}