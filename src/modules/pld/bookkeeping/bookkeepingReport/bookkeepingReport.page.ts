import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BookkeepingReportLocator from "./bookkeepingReport.locator"
import BookkeepingReportScenario from "./bookkeepingReport.scenario"

export default class BookkeepingReportPage extends BasePosLitePage implements BookkeepingReportScenario {


    pageUrl = (): string => this.urls.get.bookkeeping.bookkeepingReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookkeepingReportLocator.startMonthSearch),
            Element.ofSelector(BookkeepingReportLocator.endMonthSearch),
            Element.ofSelector(BookkeepingReportLocator.reportTypeSearch),
            Element.ofSelector(BookkeepingReportLocator.businessNameSearch),
            Element.ofSelector(BookkeepingReportLocator.branchNameSearch),
            Element.ofSelector(BookkeepingReportLocator.showReportButton),
        ];
    }


}