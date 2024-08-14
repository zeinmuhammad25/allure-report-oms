import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BookkeepingReportLocator from "./bookkeepingReport.locator"
import BookkeepingReportScenario from "./bookkeepingReport.scenario"

export default class BookkeepingReportPage extends BasePosLitePage implements BookkeepingReportScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/finance/profit-loss-report/index
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