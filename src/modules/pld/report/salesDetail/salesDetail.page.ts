import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesDetailScenario from "./salesDetail.scenario";
import SalesDetailLocator from "./salesDetail.locator";
import ProfitAndLossLocator from "../profitAndLoss/profitAndLoss.locator";
import ReportLocator from "../report.locator";


export default class SalesDetailPage extends BasePosLitePage implements SalesDetailScenario {
    private company = "UD Anugerah";
    private brand = "UD Anugerah";
    private branch = "Anugerah Food";
    private salesMode = "GrabFood";
    private salesType = "Penjualan";
    private paymentMethod = "GOPAY (ESO)";
    private transactionNumber = "101010101010";
    private cashierName = "Jean Doe";

    pageUrl = (): string => this.urls.get.report.salesDetailUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesDetailLocator.salesDateField),
            Element.ofSelector(SalesDetailLocator.salesCompanyField),
            Element.ofSelector(SalesDetailLocator.salesBrandField),
            Element.ofSelector(SalesDetailLocator.salesBranchField),
            Element.ofSelector(SalesDetailLocator.salesMode),
            Element.ofSelector(SalesDetailLocator.salesType),
            Element.ofSelector(SalesDetailLocator.paymentMethod),
            Element.ofSelector(SalesDetailLocator.transactionNumber),
            Element.ofSelector(SalesDetailLocator.cashierName),
            Element.ofSelector(SalesDetailLocator.salesViewButton),
            Element.ofSelector(SalesDetailLocator.salesDownloadButton)
        ];
    }


    private async navigateToSalesDetail(): Promise<void> {
        // await this.expectVisible(ReportLocator.reportSideBar);
        await this.click(ReportLocator.reportSideBar);
        // await this.expectVisible(ReportLocator.salesDetailSideBar);
        await this.click(ReportLocator.salesDetailSideBar);
    }

    private async inputSalesDate(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesDateField);
        await this.click(SalesDetailLocator.salesDateField);
        await this.expectVisible(SalesDetailLocator.thisWeekFilter);
        await this.click(SalesDetailLocator.thisWeekFilter);
    }

    private async inputSalesCompany(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesCompanyField);
        await this.click(SalesDetailLocator.salesCompanyField);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.company));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.company));
        await this.wait(300);
    }

    private async inputSalesBrand(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesBrandField);
        await this.click(SalesDetailLocator.salesBrandField);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.brand));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.brand));
        await this.wait(300);
    }

    private async inputSalesBranch(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesBranchField);
        await this.click(SalesDetailLocator.salesBranchField);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.branch));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.branch));
    }

    private async inputSalesMode(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesMode);
        await this.click(SalesDetailLocator.salesMode);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.salesMode));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.salesMode));
    }

    private async inputSalesType(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.salesType);
        await this.click(SalesDetailLocator.salesType);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.salesType));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.salesType));
    }

    private async inputPaymentMethod(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.paymentMethod);
        await this.click(SalesDetailLocator.paymentMethod);
        await this.expectVisible(SalesDetailLocator.salesFilterOptionItem(this.paymentMethod));
        await this.click(SalesDetailLocator.salesFilterOptionItem(this.paymentMethod));
    }

    private async inputTransactionNumber(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.transactionNumber);
        await this.fill(SalesDetailLocator.transactionNumber, this.transactionNumber);
    }

    private async inputCashierName(): Promise<void> {
        await this.expectVisible(SalesDetailLocator.cashierName);
        await this.fill(SalesDetailLocator.cashierName, this.cashierName);
    }

    private async fillFilterAndShow(withTransactionNo: boolean): Promise<void> {
        await this.inputSalesDate();
        await this.inputSalesCompany();
        await this.inputSalesBrand();
        await this.inputSalesBranch();
        await this.inputSalesMode();
        await this.inputSalesType();
        await this.inputPaymentMethod();
        await this.inputCashierName();
        if (withTransactionNo) {
            await this.inputTransactionNumber();
        }
        await this.click(ProfitAndLossLocator.viewButton);
    }


    private async downloadSalesDetailReport() {
        await this.click(SalesDetailLocator.salesDownloadButton);
        await this.expectVisible(SalesDetailLocator.downloadDialogDownloadButton);
        await this.click(SalesDetailLocator.downloadDialogDownloadButton);
        await this.expectDownloadFile("LAPORAN_DETAIL_PENJUALAN", "xlsx");
    }

    async validateFilterAndShowData(): Promise<void> {
        await this.navigateToSalesDetail();
        await this.fillFilterAndShow(false);
    }

    async validateShowDataWithTransactionNumber(): Promise<void> {
        await this.navigateToSalesDetail();
        await this.fillFilterAndShow(true);
    }

    async validateShowDataAndDownload(): Promise<void> {
        await this.navigateToSalesDetail();
        await this.fillFilterAndShow(true);
        await this.downloadSalesDetailReport();
    }
}