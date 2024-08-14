import BasePage from "../../../../base/base-page";
import Element from "../../../../base/objects/Element";
import Urls from "../../../../configs/urls";
import BookKeepingScenario from "./bookKeeping.scenario";
import BookKeepingLocator from "./bookKeeping.locator";


export default class BookKeepingPage extends BasePosLitePage implements BookKeepingScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookKeepingLocator.bookKeepingDropdown),
            Element.ofSelector(BookKeepingLocator.thisWeekTab),
            Element.ofSelector(BookKeepingLocator.thisMonthTab),
            Element.ofSelector(BookKeepingLocator.threeMonthTab),
            Element.ofSelector(BookKeepingLocator.sixMonthTab),
            Element.ofSelector(BookKeepingLocator.oneYearTab),
            Element.ofSelector(BookKeepingLocator.incomeTab),
            Element.ofSelector(BookKeepingLocator.expenseTab),
            Element.ofSelector(BookKeepingLocator.profiTab),
        ];
    }


}