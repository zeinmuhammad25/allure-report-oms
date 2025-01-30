import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesSummaryScenario from "./salesSummary.scenario";
import SalesSummaryLocator from "./salesSummary.locator";
import ReportLocator from "../report.locator";

export default class SalesSummaryPage extends BasePosLitePage implements SalesSummaryScenario {
    private company = "UD Anugerah";
    private brand = "UD Anugerah";
    private branch = "Anugerah Food";


    pageUrl = (): string => this.urls.get.report.salesSummaryUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesSummaryLocator.salesDateField),
            Element.ofSelector(SalesSummaryLocator.salesCompanyField),
            Element.ofSelector(SalesSummaryLocator.salesBrandField),
            Element.ofSelector(SalesSummaryLocator.salesBranchField),
            Element.ofSelector(SalesSummaryLocator.salesDownloadButton),
            Element.ofSelector(SalesSummaryLocator.salesViewButton)
        ];
    }

    private async navigateToSalesSummary(): Promise<void> {
        // await this.expectVisible(ReportLocator.reportSideBar);
        await this.click(ReportLocator.reportSideBar);
        // await this.expectVisible(ReportLocator.reportSummarySideBar);
        await this.click(ReportLocator.reportSummarySideBar);
    }

    private async inputOrderDateRange(): Promise<void> {
        await this.click(SalesSummaryLocator.salesDateField);
        await this.expectVisible(SalesSummaryLocator.lastWeekFilter);
        await this.click(SalesSummaryLocator.lastWeekFilter);
        await this.expectVisible(SalesSummaryLocator.chooseDateButton);
        await this.click(SalesSummaryLocator.chooseDateButton);
    }

    private async inputCompany(): Promise<void> {
        await this.expectVisible(SalesSummaryLocator.salesCompanyField);
        await this.click(SalesSummaryLocator.salesCompanyField);
        await this.expectVisible(SalesSummaryLocator.salesFilterOptionItem(this.company));
        await this.click(SalesSummaryLocator.salesFilterOptionItem(this.company));
        await this.wait(500);
    }


    private async inputBrand(): Promise<void> {
        await this.expectVisible(SalesSummaryLocator.salesBrandField);
        await this.click(SalesSummaryLocator.salesBrandField);
        await this.expectVisible(SalesSummaryLocator.salesFilterOptionItem(this.brand));
        await this.click(SalesSummaryLocator.salesFilterOptionItem(this.brand));
    }

    private async inputBranch(): Promise<void> {
        await this.expectVisible(SalesSummaryLocator.salesBranchField);
        await this.click(SalesSummaryLocator.salesBranchField);
        await this.expectVisible(SalesSummaryLocator.salesFilterOptionItem(this.branch));
        await this.click(SalesSummaryLocator.salesFilterOptionItem(this.branch));
    }

    private async showReport(): Promise<void> {
        await this.expectVisible(SalesSummaryLocator.salesViewButton);
        await this.click(SalesSummaryLocator.salesViewButton);
    }

    private async fillFilterAndShowReport() {
        await this.inputOrderDateRange();
        await this.inputCompany();
        await this.inputBrand();
        await this.inputBranch();
        await this.showReport();
    }

    async validateSalesStatistic(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.cardSalesStatistic);
    }

    async validateDataSalesPerDay(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.cardSalesPerDay);
    }

    async validateDataSalesPerTime(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.cardSalesPerTime);
    }

    async validateDataSales(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.cardSales);
    }

    async validateDataSalesFraudControl(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.cardFraudControll);
    }

    async downloadSalesSummary(): Promise<void> {
        await this.navigateToSalesSummary();
        await this.fillFilterAndShowReport();
        await this.expectVisible(SalesSummaryLocator.salesDownloadButton);
        await this.click(SalesSummaryLocator.salesDownloadButton);
        await this.expectVisible(SalesSummaryLocator.salesDownloadConfirmButton);
        await this.click(SalesSummaryLocator.salesDownloadConfirmButton);
        await this.expectDownloadFile("LAPORAN_RANGKUMAN_PENJUALAN", "xlsx");
    }

}