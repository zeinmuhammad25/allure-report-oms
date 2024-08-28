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
import CategoryPage from "../catalogue/category/category.page";
import MenuPage from "../catalogue/menu/menu.page";
import MenuBookPage from "../catalogue/menuBook/menuBook.page";
import MenuNotesPage from "../catalogue/menuNotes/menuNotes.page";
import ReasonCancelPage from "../catalogue/reasonCancel/reasonCancel.page";
import MenuLocator from "../catalogue/menu/menu.locator";
import BookkeepingReportPage from "../bookkeeping/bookkeepingReport/bookkeepingReport.page";
import SalesModePage from "../catalogue/salesMode/salesMode.page";
import SpecialPricePage from "../catalogue/specialPrice/specialPrice.page";


export default class DashboardPage extends BasePosLitePage implements DashboardScenario {
    pageUrl = (): string => this.urls.get.dashboard.dashboardIndexUrl

    shouldHave(): Element[] {
        return [];
    }

    async accountSettingAccordionCheck(): Promise<void> {
        const isAccountSettingVisible = await this.isVisible(SidebarLocator.sidebarAccountSettingHeadClosed);
        if (isAccountSettingVisible) {
            await this.click(SidebarLocator.sidebarAccountSettingHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarAccountSettingHeadOpen);
        }
    }

    async printerSettingAccordionCheck(): Promise<void> {
        const isPrinterSettingVisible = await this.isVisible(SidebarLocator.printerSettingHeadClosed);
        if (isPrinterSettingVisible) {
            await this.click(SidebarLocator.printerSettingHeadClosed);
            await this.expectVisible(SidebarLocator.printerSettingHeadOpen);
        }
    }

    async attendanceAccordionCheck(): Promise<void> {
        const isAttendanceVisible = await this.isVisible(SidebarLocator.sidebarAttendanceHeadClosed);
        if (isAttendanceVisible) {
            await this.click(SidebarLocator.sidebarAttendanceHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarAttendanceHeadOpen);
        }
    }

    async bookkeepingAccordionCheck(): Promise<void> {
        const isBookkeepingVisible = await this.isVisible(SidebarLocator.sidebarBookkeepingClosed);
        if (isBookkeepingVisible) {
            await this.click(SidebarLocator.sidebarBookkeepingClosed);
            await this.expectVisible(SidebarLocator.sidebarBookkeepingOpen);
        }
    }

    async catalogueAccordionCheck(): Promise<void> {
        const isCatalogueVisible = await this.isVisible(SidebarLocator.sidebarCatalogueHeadClosed);
        if (isCatalogueVisible) {
            await this.click(SidebarLocator.sidebarCatalogueHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarCatalogueHeadOpen);
        }
    }

    async goToBranch(): Promise<BranchPage> {
        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingBranch, BranchPage);
    }

    async goToBrand(): Promise<BrandPage> {
        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingBrand, BrandPage);
    }

    async goToCompany(): Promise<CompanyPage> {

        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingCompany, CompanyPage);

    }

    async goToGenerateOTP(): Promise<GenerateOTPPage> {

        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingGenerateOTP, GenerateOTPPage);
    }

    async goToNotificationEmail(): Promise<NotificationEmailPage> {

        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingEmailNotification, NotificationEmailPage);
    }

    async goToPaymentMethod(): Promise<PaymentMethodPage> {

        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingPayment, PaymentMethodPage);
    }

    async goToTableSetting(): Promise<TableSettingPage> {

        await this.accountSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAccountSettingTableSetting, TableSettingPage);
    }

    async goToAttendanceList(): Promise<AttendanceListPage> {

        await this.attendanceAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarAttendanceDataChild, AttendanceListPage);
    }

    async goToEmployeeData(): Promise<EmployeeDataPage> {

        await this.attendanceAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarEmployeeDataChild, EmployeeDataPage);

    }

    async goToBookkeepingCategory(): Promise<BookkeepingCategoryPage> {

        await this.bookkeepingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarBookkeepingCategory, BookkeepingCategoryPage);

    }

    async goToBookkeepingInput(): Promise<BookkeepingInputPage> {

        await this.bookkeepingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarBookkeepingInput, BookkeepingInputPage);

    }

    async goToBookkeepingReport(): Promise<BookkeepingReportPage> {

        await this.bookkeepingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarBookkeepingReport, BookkeepingReportPage);

    }


    async goToCategory(): Promise<CategoryPage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarChildCategory, CategoryPage);

    }

    async goToMenu(): Promise<MenuPage> {

        await this.catalogueAccordionCheck();
        await this.click(SidebarLocator.sidebarChildMenu);
        await this.expectVisible(MenuLocator.menuTooltipOkeButton);
        await this.click(MenuLocator.menuTooltipOkeButton);
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarChildMenu, MenuPage);


    }

    async goToMenuBook(): Promise<MenuBookPage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarMenuBook, MenuBookPage);

    }

    async goToMenuNotes(): Promise<MenuNotesPage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarMenuNote, MenuNotesPage);

    }

    async goToReasonCancel(): Promise<ReasonCancelPage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarCancelReason, ReasonCancelPage);

    }

    async goToSalesMode(): Promise<SalesModePage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarSalesMode, SalesModePage);

    }


    async goToSpecialPrice(): Promise<SpecialPricePage> {

        await this.catalogueAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarSpecialPrice, SpecialPricePage);

    }


}