import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import BookkeepingCategoryLocator from "./bookkeepingCategory.locator"
import BookkeepingCategoryScenario from "./bookkeepingCategory.scenario"


export default class BookkeepingCategoryPage extends BasePage implements BookkeepingCategoryScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/finance/charts-of-account/index
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