import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ReportPromotionScenario from "./reportPromotion.scenario";
import ReportPromotionLocator from "./reportPromotion.locator";
import ReportLocator from "../report.locator";

export default class ReportPromotionPage extends BasePosLitePage implements ReportPromotionScenario {
    private company = "UD Anugerah";
    private brand = "UD Anugerah";
    private branch = "Anugerah Food";
    private reportMode = "Laporan Per Tanggal";
    private promotionType = "Diskon Nota (%)";
    private promotionName = "BCA";
    private transactionNumber = "101010101010";

    pageUrl = (): string => this.urls.get.report.promotionReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReportPromotionLocator.salesDateField),
            Element.ofSelector(ReportPromotionLocator.salesCompanyField),
            Element.ofSelector(ReportPromotionLocator.salesBrandField),
            Element.ofSelector(ReportPromotionLocator.salesBranchField),
            Element.ofSelector(ReportPromotionLocator.reportMode),
            Element.ofSelector(ReportPromotionLocator.promotionType),
            Element.ofSelector(ReportPromotionLocator.promotionName),
            Element.ofSelector(ReportPromotionLocator.transactionNumber),
            Element.ofSelector(ReportPromotionLocator.salesViewButton)
        ];
    }


    private async navigateToReportPromotion() {
        // await this.expectVisible(ReportLocator.reportSideBar);
        await this.click(ReportLocator.reportSideBar);
        // await this.expectVisible(ReportLocator.promotionSideBar);
        await this.click(ReportLocator.promotionSideBar);
    }

    private async inputSalesDate(): Promise<void> {
        await this.click(ReportPromotionLocator.salesDateField);
        await this.expectVisible(ReportPromotionLocator.lastWeekFilter);
        await this.click(ReportPromotionLocator.lastWeekFilter);
        await this.expectVisible(ReportPromotionLocator.chooseDateButton);
        await this.click(ReportPromotionLocator.chooseDateButton);
    }

    private async inputSalesCompany(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.salesCompanyField);
        await this.click(ReportPromotionLocator.salesCompanyField);
        await this.expectVisible(ReportPromotionLocator.filterOptionItem(this.company));
        await this.click(ReportPromotionLocator.filterOptionItem(this.company));
        await this.wait(200);
    }

    private async inputSalesBrand(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.salesBrandField);
        await this.click(ReportPromotionLocator.salesBrandField);
        await this.expectVisible(ReportPromotionLocator.filterOptionItem(this.brand));
        await this.click(ReportPromotionLocator.filterOptionItem(this.brand));
    }

    private async inputSalesBranch(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.salesBranchField);
        await this.click(ReportPromotionLocator.salesBranchField);
        await this.expectVisible(ReportPromotionLocator.filterOptionItem(this.branch));
        await this.click(ReportPromotionLocator.filterOptionItem(this.branch));
    }

    private async inputReportMode(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.reportMode);
        await this.click(ReportPromotionLocator.reportMode);
        await this.expectVisible(ReportPromotionLocator.filterOptionItem(this.reportMode));
        await this.click(ReportPromotionLocator.filterOptionItem(this.reportMode));
    }

    private async inputPromotionType(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.promotionType);
        await this.click(ReportPromotionLocator.promotionType);
        await this.expectVisible(ReportPromotionLocator.filterOptionItem(this.promotionType));
        await this.click(ReportPromotionLocator.filterOptionItem(this.promotionType));
    }

    private async inputPromotionName(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.promotionName);
        await this.fill(ReportPromotionLocator.promotionName, this.promotionName);
    }

    private async inputTransactionNumber(): Promise<void> {
        await this.expectVisible(ReportPromotionLocator.transactionNumber);
        await this.fill(ReportPromotionLocator.transactionNumber, this.transactionNumber);

    }

    private async fillFilterAndShow(): Promise<void> {
        await this.inputSalesDate();
        await this.inputSalesCompany();
        await this.inputSalesBrand();
        await this.inputSalesBranch();
        await this.inputReportMode();
        await this.inputPromotionType();
        await this.inputPromotionName();
        await this.inputTransactionNumber();
        await this.expectVisible(ReportPromotionLocator.salesViewButton);
        await this.click(ReportPromotionLocator.salesViewButton);
    }

    private async downloadReportFile() {
        await this.click(ReportPromotionLocator.salesDownloadButton);
        await this.expectVisible(ReportPromotionLocator.downloadDialogDownloadButton);
        await this.click(ReportPromotionLocator.downloadDialogDownloadButton);
        await this.expectDownloadFile("LAPORAN_PROMOSI", "xlsx");
    }

    async validateListOfDataPromotion(): Promise<void> {
        await this.navigateToReportPromotion();
        await this.fillFilterAndShow();
        await this.expectVisible(ReportPromotionLocator.cardPromotionReport);
    }

    async validateDetailDataPromotion(): Promise<void> {
        await this.navigateToReportPromotion();
        await this.fillFilterAndShow();
        await this.expectVisible(ReportPromotionLocator.cardPromotionReport);
    }

    async validateDownloadDataPromotion(): Promise<void> {
        await this.navigateToReportPromotion();
        await this.fillFilterAndShow();
        await this.expectVisible(ReportPromotionLocator.cardPromotionReport);
        await this.downloadReportFile();
    }
}