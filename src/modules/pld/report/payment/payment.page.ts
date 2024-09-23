import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PaymentLocator from "./payment.locator";
import PaymentScenario from "./payment.scenario";
import ReportLocator from "../report.locator";
import SalesDetailLocator from "../salesDetail/salesDetail.locator";


export default class PaymentPage extends BasePosLitePage implements PaymentScenario {
    private company = "Test QC 02"
    private brand = "Test QC 02"
    private branch = "Test Cabang Baru"
    private salesMode = "GoFood"
    private paymentType = "Tunai"
    private paymentMethod = "CASH (POS)"
    private reportModeDetail = "Mode Detail"
    private reportModeSimple = "Mode Ringkasan"

    pageUrl = (): string => this.urls.get.report.paymentReportUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PaymentLocator.salesDateField),
            Element.ofSelector(PaymentLocator.salesCompanyField),
            Element.ofSelector(PaymentLocator.salesBrandField),
            Element.ofSelector(PaymentLocator.salesBranchField),
            Element.ofSelector(PaymentLocator.reportMode),
            Element.ofSelector(PaymentLocator.paymentType),
            Element.ofSelector(PaymentLocator.paymentMethod),
        ];
    }

    private async navigateToPaymentReport() {
        await this.expectVisible(ReportLocator.reportSideBar);
        await this.click(ReportLocator.reportSideBar);
        await this.expectVisible(ReportLocator.paymentSideBar);
        await this.click(ReportLocator.paymentSideBar);
    }

    private async inputSalesDate(): Promise<void> {
        await this.click(PaymentLocator.salesDateField);
        await this.expectVisible(PaymentLocator.lastWeekFilter);
        await this.click(PaymentLocator.lastWeekFilter);
        await this.expectVisible(PaymentLocator.chooseDateButton);
        await this.click(PaymentLocator.chooseDateButton);
    }

    private async inputSalesCompany(): Promise<void> {
        await this.expectVisible(PaymentLocator.salesCompanyField);
        await this.click(PaymentLocator.salesCompanyField);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.company));
        await this.click(PaymentLocator.filterOptionItem(this.company));
        await this.wait(300)
    }

    private async inputSalesBrand(): Promise<void> {
        await this.expectVisible(PaymentLocator.salesBrandField);
        await this.click(PaymentLocator.salesBrandField);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.brand));
        await this.click(PaymentLocator.filterOptionItem(this.brand));
        await this.wait(300)
    }

    private async inputSalesBranch(): Promise<void> {
        await this.expectVisible(PaymentLocator.salesBranchField);
        await this.click(PaymentLocator.salesBranchField);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.branch));
        await this.click(PaymentLocator.filterOptionItem(this.branch));
    }

    private async inputReportMode(detailMode: boolean): Promise<void> {
        await this.expectVisible(PaymentLocator.reportMode);
        await this.click(PaymentLocator.reportMode);
        if (detailMode) {
            await this.expectVisible(PaymentLocator.filterOptionItem(this.reportModeDetail));
            await this.click(PaymentLocator.filterOptionItem(this.reportModeDetail));
        } else {
            await this.expectVisible(PaymentLocator.filterOptionItem(this.reportModeSimple));
            await this.click(PaymentLocator.filterOptionItem(this.reportModeSimple));
        }
    }

    private async inputSalesMode(): Promise<void> {
        await this.expectVisible(PaymentLocator.salesMode);
        await this.click(PaymentLocator.salesMode);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.salesMode));
        await this.click(PaymentLocator.filterOptionItem(this.salesMode));
    }

    private async inputPaymentType(): Promise<void> {
        await this.expectVisible(PaymentLocator.paymentType);
        await this.click(PaymentLocator.paymentType);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.paymentType));
        await this.click(PaymentLocator.filterOptionItem(this.paymentType));
    }

    private async inputPaymentMethod(): Promise<void> {
        await this.expectVisible(PaymentLocator.paymentMethod);
        await this.click(PaymentLocator.paymentMethod);
        await this.expectVisible(PaymentLocator.filterOptionItem(this.paymentMethod));
        await this.click(PaymentLocator.filterOptionItem(this.paymentMethod));
    }

    private async fillFilterAndShow(detailMode: boolean): Promise<void> {
        await this.inputSalesDate()
        await this.inputSalesCompany()
        await this.inputSalesBrand()
        await this.inputSalesBranch()
        await this.inputReportMode(detailMode)
        if (detailMode) {
            await this.inputSalesMode()
            await this.inputPaymentType()
            await this.inputPaymentMethod()
        }
        await this.expectVisible(PaymentLocator.salesViewButton);
        await this.click(PaymentLocator.salesViewButton);
    }

    private async downloadFile() {
        await this.click(PaymentLocator.salesDownloadButton);
        await this.expectVisible(PaymentLocator.downloadDialogDownloadButton);
        await this.click(PaymentLocator.downloadDialogDownloadButton);
        await this.expectDownloadFile("LAPORAN_PEMBAYARAN", "xlsx");
    }

    async validateFilterAndShowDataPaymentReport(): Promise<void> {
        await this.navigateToPaymentReport()
        await this.fillFilterAndShow(false)
    }

    async validateFilterAndShowDataDetailPaymentReport(): Promise<void> {
        await this.navigateToPaymentReport()
        await this.fillFilterAndShow(true)
    }

    async validateDownloadDataDetailPayment(): Promise<void> {
        await this.navigateToPaymentReport()
        await this.fillFilterAndShow(true)
        await this.downloadFile()
    }
}