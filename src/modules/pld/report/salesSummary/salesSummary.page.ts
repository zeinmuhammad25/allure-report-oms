import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import SalesSummaryScenario from "./salesSummary.scenario";
import SalesSummaryLocator from "./salesSummary.locator";

export default class SalesSummaryPage extends BasePosLitePage implements SalesSummaryScenario {
    private company = "Test QC 02";
    private brand = "Test QC 02";
    private branch = "Test Cabang Baru";


    pageUrl = (): string => Urls.salessum;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesSummaryLocator.salesDateField),
            Element.ofSelector(SalesSummaryLocator.salesCompanyField),
            Element.ofSelector(SalesSummaryLocator.salesBrandField),
            Element.ofSelector(SalesSummaryLocator.salesBranchField),
            Element.ofSelector(SalesSummaryLocator.salesDownloadButton),
            Element.ofSelector(SalesSummaryLocator.salesViewButton),
        ];
    }

    private async navigateToSalesSummary(): Promise<void> {
        await this.expectVisible(SalesSummaryLocator.reportSideBar);
        await this.click(SalesSummaryLocator.reportSideBar);
        await this.expectVisible(SalesSummaryLocator.reportSummarySideBar);
        await this.click(SalesSummaryLocator.reportSummarySideBar);
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
        await this.inputOrderDateRange()
        await this.inputCompany()
        await this.inputBrand()
        await this.inputBranch()
        await this.showReport()
    }

    async validateSalesStatistic(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.cardSalesStatistic);
    }

    async validateDataSalesPerDay(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.cardSalesPerDay);
    }

    async validateDataSalesPerTime(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.cardSalesPerTime);
    }

    async validateDataSales(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.cardSales);
    }

    async validateDataSalesFraudControl(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.cardFraudControll);
    }

    async downloadSalesSummary(): Promise<void> {
        await this.navigateToSalesSummary()
        await this.fillFilterAndShowReport()
        await this.expectVisible(SalesSummaryLocator.salesDownloadButton);
        await this.click(SalesSummaryLocator.salesDownloadButton);
        await this.expectVisible(SalesSummaryLocator.salesDownloadConfirmButton);
        await this.clickAndExpectDownloadedFile(SalesSummaryLocator.salesDownloadConfirmButton, "LAPORAN_RANGKUMAN_PENJUALAN","xlsx");
    }

}