import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ProfitAndLossScenario from "./profitAndLoss.scenario";
import ProfitAndLossLocator from "./profitAndLoss.locator";
import ReportLocator from "../report.locator";


export default class ProfitAndLossPage extends BasePosLitePage implements ProfitAndLossScenario {
    private company = "Test QC 02";
    private brand = "Test QC 02";
    private branch = "Test Cabang Baru";

    pageUrl = (): string => this.urls.get.report.profitAndLossUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ProfitAndLossLocator.periodFromDateField),
            Element.ofSelector(ProfitAndLossLocator.periodToDateField),
            Element.ofSelector(ProfitAndLossLocator.profitAndLossReportTypeDropdown),
            Element.ofSelector(ProfitAndLossLocator.profitAndLossCompanyDropdown),
            Element.ofSelector(ProfitAndLossLocator.viewButton),

        ];
    }

    private async navigateToProfitAndLost(): Promise<void> {
        await this.expectVisible(ReportLocator.reportSideBar);
        await this.click(ReportLocator.reportSideBar);
        await this.expectVisible(ReportLocator.profitAndLostSideBar);
        await this.click(ReportLocator.profitAndLostSideBar);
    }

    private async inputPeriodFromDateField(): Promise<void> {
        await this.expectVisible(ProfitAndLossLocator.periodFromDateField);
        await this.click(ProfitAndLossLocator.periodFromDateField);
        await this.wait(300)
        await this.click(ProfitAndLossLocator.sepDatePicker);
        await this.wait(300)
    }

    private async inputPeriodToDateField(): Promise<void> {
        await this.expectVisible(ProfitAndLossLocator.periodToDateField);
        await this.click(ProfitAndLossLocator.periodToDateField);
        await this.wait(300)
        await this.click(ProfitAndLossLocator.sepDatePicker);
        await this.wait(300)
    }

    private async inputCompanyType(filterByBranch: boolean): Promise<void> {
        await this.expectVisible(ProfitAndLossLocator.profitAndLossReportTypeDropdown)
        await this.click(ProfitAndLossLocator.profitAndLossReportTypeDropdown)
        await this.wait(300)
        if (filterByBranch) {
            await this.expectVisible(ProfitAndLossLocator.companyTypeBranch)
            await this.click(ProfitAndLossLocator.companyTypeBranch)
            await this.inputBranchName()
        } else {
            await this.expectVisible(ProfitAndLossLocator.companyTypeCompany)
            await this.click(ProfitAndLossLocator.companyTypeCompany)
        }
    }

    private async inputCompanyName(): Promise<void> {
        await this.expectVisible(ProfitAndLossLocator.profitAndLossCompanyDropdown)
        await this.click(ProfitAndLossLocator.profitAndLossCompanyDropdown)
        await this.expectVisible(ProfitAndLossLocator.branchDialogApplyButton)
        await this.click(ProfitAndLossLocator.branchDialogApplyButton)
    }

    private async inputBranchName(): Promise<void> {
        await this.expectVisible(ProfitAndLossLocator.profitAndLossBranchDropdown)
        await this.click(ProfitAndLossLocator.profitAndLossBranchDropdown)
        await this.wait(300)
        await this.expectVisible(ProfitAndLossLocator.branchNameOption(this.branch))
        await this.click(ProfitAndLossLocator.branchNameOption(this.branch))
        await this.click(ProfitAndLossLocator.branchDialogApplyButton)
    }


    private async fillFilterAndShow(filterByBranch: boolean): Promise<void> {
        await this.inputPeriodFromDateField()
        await this.inputPeriodToDateField()
        await this.inputCompanyName()
        await this.inputCompanyType(filterByBranch)
        await this.click(ProfitAndLossLocator.viewButton)
    }


    async validateDataProfitAndLostByCompany(): Promise<void> {
        await this.navigateToProfitAndLost()
        await this.fillFilterAndShow(false)
        await this.expectVisible(ProfitAndLossLocator.profitAndLostCard);
        await this.expectVisible(ProfitAndLossLocator.downloadButton)
        await this.click(ProfitAndLossLocator.downloadButton)
        await this.expectDownloadFile('Laporan Laba Rugi (Company)', 'pdf');
    }

    async validateDataProfitAndLostByBranch(): Promise<void> {
        await this.navigateToProfitAndLost()
        await this.fillFilterAndShow(true)
        await this.expectVisible(ProfitAndLossLocator.profitAndLostCard);
        await this.expectVisible(ProfitAndLossLocator.downloadButton)
        await this.click(ProfitAndLossLocator.downloadButton)
        await this.expectDownloadFile('Laporan Laba Rugi (Cabang)', 'pdf');
    }
}