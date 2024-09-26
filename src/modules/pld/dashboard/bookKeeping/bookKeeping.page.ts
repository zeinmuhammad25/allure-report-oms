import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BookKeepingScenario from "./bookKeeping.scenario";
import BookKeepingLocator from "./bookKeeping.locator";


export default class BookKeepingPage extends BasePosLitePage implements BookKeepingScenario {
    validateStatisticalIncomeDataOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateStatisticalExpenditureDataOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateStatisticalProfitDataOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateStatisticalMainSupplierDataOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateTransactionIncomeChartOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateTransactionExpenditureChartOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateTransactionProfitChartOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    validateSupplierChartOnDashboardBookKeeping(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    pageUrl = (): string => this.urls.get.dashboard.bookKeepingUrl;

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