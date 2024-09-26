import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BookKeepingScenario from "./bookKeeping.scenario";
import BookKeepingLocator from "./bookKeeping.locator";
import SidebarLocator from "../sidebar.locator";


export default class BookKeepingPage extends BasePosLitePage implements BookKeepingScenario {

    private apiBookKeeping = 'accounting-dashboard/summary';
    private branch = 'Test Cabang Edit';

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
            Element.ofSelector(BookKeepingLocator.profitTab),
        ];
    }

    async validateStatisticalIncomeDataOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.summaryIncome)
    }

    async validateStatisticalExpenditureDataOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.summaryExpense)
    }

    async validateStatisticalProfitDataOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.summaryProfit)
    }

    async validateStatisticalMainSupplierDataOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.summarySupplier)
    }

    async validateTransactionIncomeChartOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.incomeTab)
        await this.click(BookKeepingLocator.incomeTab)
        await this.expectVisible(BookKeepingLocator.chartTransaction)
    }

    async validateTransactionExpenditureChartOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.expenseTab)
        await this.click(BookKeepingLocator.expenseTab)
        await this.expectVisible(BookKeepingLocator.chartTransaction)
    }

    async validateTransactionProfitChartOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.profitTab)
        await this.click(BookKeepingLocator.profitTab)
        await this.expectVisible(BookKeepingLocator.chartTransaction)
    }

    async validateSupplierChartOnDashboardBookKeeping(): Promise<void> {
        await this.navigateToBookKeepingPage()
        await this.fillFilterAndShow()
        await this.expectVisible(BookKeepingLocator.chartSupplier)
    }

    private async fillFilterAndShow() {
        await this.inputBranch()
        await this.chosePeriod()
    }

    private async navigateToBookKeepingPage() {
        await this.expectVisible(SidebarLocator.sidebarDashboardBookkeeping);
        await this.click(SidebarLocator.sidebarDashboardBookkeeping);
    }

    private async inputBranch() {
        await this.click(BookKeepingLocator.bookKeepingDropdown);
        await this.expectVisible(BookKeepingLocator.filterOptionItem(this.branch));
        await this.click(BookKeepingLocator.filterOptionItem(this.branch));
        await this.waitForResponse(this.apiBookKeeping)
    }


    private async chosePeriod() {
        await this.click(BookKeepingLocator.thisWeekTab)
        await this.click(BookKeepingLocator.thisMonthTab)
        await this.click(BookKeepingLocator.threeMonthTab)
        await this.click(BookKeepingLocator.sixMonthTab)
        await this.click(BookKeepingLocator.oneYearTab)
    }
}