import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesDetailScenario from "./salesDetail.scenario";
import SalesDetailLocator from "./salesDetail.locator";
import ProfitAndLossLocator from "../profitAndLoss/profitAndLoss.locator";
import SalesSummaryLocator from "../salesSummary/salesSummary.locator";


export default class SalesDetailPage extends BasePosLitePage implements SalesDetailScenario {
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
            Element.ofSelector(SalesDetailLocator.salesDownloadButton),
        ];
    }

    private async inputSalesDate(): Promise<void> {

    }

    private async inputSalesCompany(): Promise<void> {

    }

    private async inputSalesBrand(): Promise<void> {

    }

    private async inputSalesBranch(): Promise<void> {

    }

    private async inputSalesMode(): Promise<void> {

    }

    private async inputSalesType(): Promise<void> {

    }

    private async inputPaymentMethod(): Promise<void> {

    }

    private async inputTransactionNumber(): Promise<void> {

    }

    private async inputCashierName(): Promise<void> {

    }

    private async fillFilterAndShow(withTransactionNo:boolean): Promise<void> {
        await this.inputSalesDate()
        await this.inputSalesCompany()
        await this.inputSalesBrand()
        await this.inputSalesBranch()
        await this.inputSalesMode()
        await this.inputSalesType()
        await this.inputPaymentMethod()
        await this.inputCashierName()
        if(withTransactionNo){
            await this.inputTransactionNumber()
        }
        await this.click(ProfitAndLossLocator.viewButton)
    }

    async validateFilterAndShowData(): Promise<void> {
        await this.fillFilterAndShow(false)
    }

    async validateShowDataWithTransactionNumber(): Promise<void> {
        await this.fillFilterAndShow(true)
    }

    async validateShowDataAndDownload(): Promise<void> {
        await this.fillFilterAndShow(true)
        await this.clickAndExpectDownloadedFile(SalesDetailLocator.salesDownloadButton, "LAPORAN_PROMOSI","xlsx");
    }

}