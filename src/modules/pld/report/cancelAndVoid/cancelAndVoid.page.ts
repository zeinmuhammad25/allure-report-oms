import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import CancelAndVoidLocator from "./cancelAndVoid.locator";
import CancelAndVoidScenario from "./cancelAndVoid.scenario";
import ReportLocator from "../report.locator";


export default class CancelAndVoidPage extends BasePosLitePage implements CancelAndVoidScenario {
    private company = this.configs.get.data.company;
    private brand = this.configs.get.data.brand;
    private branch = this.configs.get.data.branch;
    private transactionNumber = "101010101010";
    private cashierName = "Jean Doe";
    private salesTypeVoid = "Void";
    private salesTypeCancel = "Batal";
    private paymentMethod = "CASH (POS)";

    pageUrl = (): string => this.urls.get.report.cancelAndVoidUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(CancelAndVoidLocator.orderDateField),
            Element.ofSelector(CancelAndVoidLocator.cancelAndVoidCompanyDropdown),
            Element.ofSelector(CancelAndVoidLocator.cancelAndVoidBrandDropdown),
            Element.ofSelector(CancelAndVoidLocator.cancelAndVoidBranchDropdown),
            Element.ofSelector(CancelAndVoidLocator.transactionNumberField),
            Element.ofSelector(CancelAndVoidLocator.cashierNameField),
            Element.ofSelector(CancelAndVoidLocator.salesTypeField),
            Element.ofSelector(CancelAndVoidLocator.paymentMethod),
            Element.ofSelector(CancelAndVoidLocator.viewButton),
            Element.ofSelector(CancelAndVoidLocator.downloadButton)
        ];
    }

    private async navigateToCancelAndVoidPage() {
        // await this.expectVisible(ReportLocator.reportSideBar)
        await this.click(ReportLocator.reportSideBar);
        // await this.expectVisible(ReportLocator.cancelAndVoidSideBar)
        await this.click(ReportLocator.cancelAndVoidSideBar);
    }

    private async downloadReportFile() {
        await this.click(CancelAndVoidLocator.downloadButton);
        await this.expectVisible(CancelAndVoidLocator.downloadDialogDownloadButton);
        await this.click(CancelAndVoidLocator.downloadDialogDownloadButton);
        await this.expectDownloadFile("LAPORAN_MENU_BATAL_VOID", "xlsx");
    }

    private async inputOrderDate() {
        await this.click(CancelAndVoidLocator.orderDateField);
        await this.expectVisible(CancelAndVoidLocator.datePickerLastWeek);
        await this.click(CancelAndVoidLocator.datePickerLastWeek);
        await this.expectVisible(CancelAndVoidLocator.datePickerSelectButton);
        await this.click(CancelAndVoidLocator.datePickerSelectButton);
    }

    private async inputCompany() {
        await this.expectVisible(CancelAndVoidLocator.cancelAndVoidCompanyDropdown);
        await this.click(CancelAndVoidLocator.cancelAndVoidCompanyDropdown);
        await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.company));
        await this.click(CancelAndVoidLocator.filterOptionItem(this.company));
        await this.wait(200);
    }

    private async inputBrand() {
        await this.expectVisible(CancelAndVoidLocator.cancelAndVoidBrandDropdown);
        await this.click(CancelAndVoidLocator.cancelAndVoidBrandDropdown);
        await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.brand));
        await this.click(CancelAndVoidLocator.filterOptionItem(this.brand));
    }

    private async inputBranch() {
        await this.expectVisible(CancelAndVoidLocator.cancelAndVoidBranchDropdown);
        await this.click(CancelAndVoidLocator.cancelAndVoidBranchDropdown);
        await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.branch));
        await this.click(CancelAndVoidLocator.filterOptionItem(this.branch));
    }

    private async inputTransactionNumber() {
        await this.expectVisible(CancelAndVoidLocator.transactionNumberField);
        await this.fill(CancelAndVoidLocator.transactionNumberField, this.transactionNumber);
    }

    private async inputCashierName() {
        await this.expectVisible(CancelAndVoidLocator.transactionNumberField);
        await this.fill(CancelAndVoidLocator.cashierNameField, this.cashierName);

    }

    private async inputSalesType(salesVoid: boolean) {
        await this.expectVisible(CancelAndVoidLocator.salesTypeField);
        await this.click(CancelAndVoidLocator.salesTypeField);
        if (salesVoid) {
            await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.salesTypeVoid));
            await this.click(CancelAndVoidLocator.filterOptionItem(this.salesTypeVoid));
        } else {
            await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.salesTypeCancel));
            await this.click(CancelAndVoidLocator.filterOptionItem(this.salesTypeCancel));
        }
    }

    private async inputPaymentMethod() {
        await this.expectVisible(CancelAndVoidLocator.paymentMethod);
        await this.click(CancelAndVoidLocator.paymentMethod);
        await this.expectVisible(CancelAndVoidLocator.filterOptionItem(this.paymentMethod));
        await this.click(CancelAndVoidLocator.filterOptionItem(this.paymentMethod));
    }

    private async fillFilterAndShow(salesVoid: boolean) {
        await this.inputOrderDate();
        await this.inputCompany();
        await this.inputBrand();
        await this.inputBranch();
        await this.inputTransactionNumber();
        await this.inputCashierName();
        await this.inputSalesType(salesVoid);
        await this.inputPaymentMethod();
        await this.expectVisible(CancelAndVoidLocator.viewButton);
        await this.click(CancelAndVoidLocator.viewButton);
    }

    async validateCancelAndVoidWhenCancelTable(): Promise<void> {
        await this.navigateToCancelAndVoidPage();
        await this.fillFilterAndShow(false);
        await this.expectVisible(CancelAndVoidLocator.cancelMenuReport);
    }

    async validateCancelAndVoidWhenVoidTransaction(): Promise<void> {
        await this.navigateToCancelAndVoidPage();
        await this.fillFilterAndShow(true);
        await this.expectVisible(CancelAndVoidLocator.cancelMenuReport);
    }

    async validateDownloadCancelAndVoidReport(): Promise<void> {
        await this.navigateToCancelAndVoidPage();
        await this.fillFilterAndShow(true);
        await this.expectVisible(CancelAndVoidLocator.cancelMenuReport);
        await this.downloadReportFile();
    }
}