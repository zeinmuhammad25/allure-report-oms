import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesMenuScenario from "./salesMenu.scenario";
import SalesMenuLocator from "./salesMenu.locator";
import ReportLocator from "../report.locator";


export default class SalesMenuPage extends BasePosLitePage implements SalesMenuScenario {
    private company = "Test QC 02"
    private branch = "Test Cabang Baru"
    private reportType = "Menu Paket Per Periode"

    pageUrl = (): string => this.urls.get.report.salesMenuUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesMenuLocator.salesMenuOrderDate),
            Element.ofSelector(SalesMenuLocator.salesMenuBranchDropdown),
            Element.ofSelector(SalesMenuLocator.salesMenuViewButton),
            Element.ofSelector(SalesMenuLocator.salesMenuSoldAmount),
            Element.ofSelector(SalesMenuLocator.salesMenuReportTypeDropdown),
            Element.ofSelector(SalesMenuLocator.salesMenuCompanyDropdown),

        ];
    }

    private async navigateToSalesMenuPage() {
        await this.expectVisible(ReportLocator.reportSideBar)
        await this.click(ReportLocator.reportSideBar)
        await this.expectVisible(ReportLocator.salesMenuSideBar)
        await this.click(ReportLocator.salesMenuSideBar)
    }

    private async downloadReportFile() {
        await this.expectVisible(SalesMenuLocator.downloadButton)
        await this.click(SalesMenuLocator.downloadButton)
        await this.expectDownloadFile("Laporan Menu Paket Per Periode", "xlsx");
    }

    private async inputOrderDate() {
        await this.click(SalesMenuLocator.salesMenuOrderDate)
        await this.expectVisible(SalesMenuLocator.lastWeekFilter)
        await this.click(SalesMenuLocator.lastWeekFilter)
        await this.expectVisible(SalesMenuLocator.chooseDateButton)
        await this.click(SalesMenuLocator.chooseDateButton)
    }

    private async inputCompanyField() {
        await this.expectVisible(SalesMenuLocator.salesMenuCompanyDropdown)
        // await this.click(SalesMenuLocator.salesMenuCompanyDropdown)
        // await this.expectVisible(SalesMenuLocator.filterOptionItem(this.company))
        // await this.click(SalesMenuLocator.filterOptionItem(this.company))
    }

    private async inputBranchField() {
        await this.expectVisible(SalesMenuLocator.salesMenuBranchDropdown)
        // await this.click(SalesMenuLocator.salesMenuBranchDropdown)
        // await this.expectVisible(SalesMenuLocator.filterOptionItem(this.branch))
        // await this.click(SalesMenuLocator.filterOptionItem(this.branch))
    }

    private async inputReportType() {
        await this.expectVisible(SalesMenuLocator.salesMenuReportTypeDropdown)
        await this.click(SalesMenuLocator.salesMenuReportTypeDropdown)
        await this.expectVisible(SalesMenuLocator.filterOptionItem(this.reportType))
        await this.click(SalesMenuLocator.filterOptionItem(this.reportType))
    }

    private async fillFilterAndShow() {
        await this.inputOrderDate()
        await this.inputCompanyField()
        await this.inputBranchField()
        await this.inputReportType()
        await this.expectVisible(SalesMenuLocator.viewButton)
        await this.click(SalesMenuLocator.viewButton)
    }

    async validateFilterAndShowDataSalesMenuOnSalesMenu(): Promise<void> {
        await this.navigateToSalesMenuPage()
        await this.fillFilterAndShow()
        await this.expectVisible(SalesMenuLocator.searchResultTotalData)
    }

    async validateFilterAndDownload(): Promise<void> {
        await this.navigateToSalesMenuPage()
        await this.fillFilterAndShow()
        await this.expectVisible(SalesMenuLocator.searchResultTotalData)
        await this.downloadReportFile()
    }
}