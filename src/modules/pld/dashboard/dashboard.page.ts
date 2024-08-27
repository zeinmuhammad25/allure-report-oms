import Element from "../../../base/objects/Element";
import DashboardScenario from "./dashboard.scenario";
import BasePosLitePage from "../base-pos-lite-page";
import SidebarLocator from "./sidebar.locator";
import BranchPage from "../accountSetting/branch/branch.page";
import BrandPage from "../accountSetting/brand/brand.page";
import CompanyPage from "../accountSetting/company/company.page";
import GenerateOTPPage from "../accountSetting/generateOTP/generateOTP.page";
import NotificationEmailPage from "../accountSetting/notificationEmail/notificationEmail.page";
import PaymentMethodPage from "../accountSetting/paymentMethod/paymentMethod.page";
import TableSettingPage from "../accountSetting/tableSetting/tableSetting.page";
import AttendanceListPage from "../attendance/attendanceList/attendanceList.page";
import EmployeeDataPage from "../attendance/employeeData/employeeData.page";
import BookkeepingCategoryPage from "../bookkeeping/bookkeepingCategory/bookkeepingCategory.page";
import BookkeepingInputPage from "../bookkeeping/bookkeepingInput/bookkeepingInput.page";


export default class DashboardPage extends BasePosLitePage implements DashboardScenario {
    pageUrl = (): string => this.urls.get.dashboard.dashboardIndexUrl

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SidebarLocator.sidebarAccountSettingHead),
        ];
    }

    async goToBranch(): Promise<BranchPage> {

        const isBranchClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingBranch);
        if (!isBranchClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingBranch, BranchPage);
    }

    async goToBrand(): Promise<BrandPage> {

        const isBrandClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingBrand);
        if (!isBrandClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingBrand, BrandPage);

    }

    async goToCompany(): Promise<CompanyPage> {

        const isCompanyClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingCompany);
        if (!isCompanyClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingCompany, CompanyPage);

    }

    async goToGenerateOTP(): Promise<GenerateOTPPage> {

        const isGenerateOTPClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingGenerateOTP);
        if (!isGenerateOTPClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingGenerateOTP, GenerateOTPPage);

    }

    async goToNotificationEmail(): Promise<NotificationEmailPage> {

        const isNotificationClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingEmailNotification);
        if (!isNotificationClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingEmailNotification, NotificationEmailPage);

    }

    async goToPaymentMethod(): Promise<PaymentMethodPage> {

        const isPaymentMethodClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingPayment);
        if (!isPaymentMethodClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingPayment, PaymentMethodPage);

    }

    async goToTableSetting(): Promise<TableSettingPage> {

        const isTableSettingClosed = await this.isInvisible(SidebarLocator.sidebarAccountSettingTableSetting);
        if (!isTableSettingClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingTableSetting, TableSettingPage);

    }

    async goToAttendanceList(): Promise<AttendanceListPage> {

        const isAttendanceListClosed = await this.isInvisible(SidebarLocator.sidebarAttendanceDataChild);
        if (!isAttendanceListClosed) {
            await this.click(SidebarLocator.sidebarAccountSettingHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAttendanceDataChild, AttendanceListPage);

    }

    async goToEmployeeData(): Promise<EmployeeDataPage> {

        const isEmployeeDataClosed = await this.isInvisible(SidebarLocator.sidebarEmployeeDataChild);
        if (!isEmployeeDataClosed) {
            await this.click(SidebarLocator.sidebarAttendanceHead);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarEmployeeDataChild, EmployeeDataPage);

    }

    async goToBookkeepingCategory(): Promise<BookkeepingCategoryPage> {

        const isBookCategoryClosed = await this.isInvisible(SidebarLocator.sidebarBookkeepingCategory);
        if (!isBookCategoryClosed) {
            await this.click(SidebarLocator.sidebarBookkeeping);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarBookkeepingCategory, BookkeepingCategoryPage);

    }

    async goToBookkeepingInput(): Promise<BookkeepingInputPage> {

        const isBookInputClosed = await this.isInvisible(SidebarLocator.sidebarBookkeepingInput);
        if (!isBookInputClosed) {
            await this.click(SidebarLocator.sidebarBookkeeping);
        } else {
            await this.expectVisible(SidebarLocator.sidebarBookkeeping);
            await this.click(SidebarLocator.sidebarBookkeeping);
        }
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarBookkeepingInput, BookkeepingInputPage);

    }


}