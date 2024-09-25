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
import BannerMarketingPage from "../esbOrder/bannerMarketing/bannerMarketing.page";
import SettingPage from "../esbOrder/setting/setting.page";
import RawMaterialPage from "../inventory/rawMaterial/rawMaterial.page";
import RawMaterialReportPage from "../inventory/rawMaterialReport/rawMaterialReport.page";
import RawMaterialStockPage from "../inventory/rawMaterialStock/rawMaterialStock.page";
import RawMaterialTransactionPage from "../inventory/rawMaterialTransaction/rawMaterialTransaction.page";
import ManageOnlineMenuPage from "../onlinePlatform/manageOnlineMenu/manageOnlineMenu.page";
import PlatformIntegrationPage from "../onlinePlatform/platformIntegration/platformIntegration.page";
import PrinterPage from "../printerSetting/printer/printer.page";
import MenuManagementPage from "../printerSetting/menuManagement/menuManagement.page";
import CancelAndVoidPage from "../report/cancelAndVoid/cancelAndVoid.page";
import PaymentPage from "../report/payment/payment.page";
import ProfitAndLossPage from "../report/profitAndLoss/profitAndLoss.page";
import ReportPromotionPage from "../report/promotion/reportPromotion.page";
import SalesDetailPage from "../report/salesDetail/salesDetail.page";
import SalesMenuPage from "../report/salesMenu/salesMenu.page";
import SalesSummaryPage from "../report/salesSummary/salesSummary.page";
import UserPage from "../userAccessControl/user/user.page";
import UserAccessBackendPage from "../userAccessControl/userAccessBackend/userAccessBackend.page";
import UserAccessPOSPage from "../userAccessControl/userAccessPOS/userAccessPOS.page";
import StockMenuPage from "./stockMenu/stockMenu.page";
import BookKeepingPage from "./bookKeeping/bookKeeping.page";
import OnlinePaymentPage from "./onlinePayment/onlinePayment.page";
import PromotionPage from "../promotion/promotion.page";
import RemainingFundsPage from "../withdrawFunds/remainingFunds/remainingFunds.page";
import HistoryPage from "../withdrawFunds/history/history.page";
import ProfilePage from "../profile/profile.page";
import DashboardLocator from "./dashboard.locator";

export default class DashboardPage extends BasePosLitePage implements DashboardScenario {
    private company = "Test QC 02"
    private brand = "Test QC 02"
    private branch = "Test Cabang Baru"
    private emptyMessageOtherTransaction = "Anda belum memiliki daftar transaksi untuk other cost"
    private emptyMessageComplimentTransaction = "Anda belum memiliki daftar transaksi untuk komplimen"
    private emptyMessageNonSalesTransaction = "Anda belum memiliki daftar transaksi untuk pembatalan"


    private category = 'Kategori Baru'
    private subCategory = 'Sub Kategori Baru'
    private salesMode = 'Dine In'
    private valueType = 'Jumlah'
    private limit = '20 Teratas'

    private apiSalesPerformance = "dashboard/sales-performance"
    private apiSalesComposition = "dashboard/sales-composition"
    private apiFraudControl = "dashboard/sales-fraud-control"
    private apiSalesTopData = "dashboard/sales-top-data"

    pageUrl = (): string => this.urls.get.dashboard.dashboardIndexUrl

    shouldHave(): Element[] {
        return [
            Element.ofSelector(DashboardLocator.companyField),
            Element.ofSelector(DashboardLocator.brandField),
            Element.ofSelector(DashboardLocator.branchField),
            Element.ofSelector(DashboardLocator.buttonDay),
            Element.ofSelector(DashboardLocator.buttonMonth),
        ];
    }

    private async filterByMonth() {
        await this.click(DashboardLocator.buttonMonth)
        await Promise.all([
            this.waitForResponse(this.apiSalesPerformance),
            this.waitForResponse(this.apiFraudControl),
            this.waitForResponse(this.apiSalesComposition)
        ])
    }

    private async filterByDay() {
        await this.click(DashboardLocator.buttonDay)
        await Promise.all([
            this.waitForResponse(this.apiSalesPerformance),
            this.waitForResponse(this.apiFraudControl),
            this.waitForResponse(this.apiSalesComposition)
        ])
    }

    private async search() {
        await this.click(DashboardLocator.buttonSearch)
        await Promise.all([
            this.waitForResponse(this.apiSalesPerformance),
            this.waitForResponse(this.apiFraudControl),
            this.waitForResponse(this.apiSalesComposition)
        ])
    }

    private async inputCompany() {
        await this.click(DashboardLocator.companyField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.company))
        await this.click(DashboardLocator.filterOptionItem(this.company))
        await this.wait(300)
    }

    private async inputBrand() {
        await this.click(DashboardLocator.brandField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.brand))
        await this.click(DashboardLocator.filterOptionItem(this.brand))
    }

    private async inputBranch() {
        await this.click(DashboardLocator.branchField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.branch))
        await this.click(DashboardLocator.filterOptionItem(this.branch))
    }

    private async fillFilterAndShowData() {
        await this.filterByMonth()
        await this.filterByDay()
        await this.inputCompany()
        await this.inputBrand()
        await this.inputBranch()
        await this.search()
    }

    async validateOtherCostTransactionDataOnDashboardFraudControl(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.otherCostTransactionButton)
        await this.click(DashboardLocator.otherCostTransactionButton)
        let isListEmpty = await this.isVisible(
            DashboardLocator.checkDataEmptyByMessage(this.emptyMessageOtherTransaction)
        )
        if (!isListEmpty) {
            // TODO : search an item
        }
        await this.expectVisible(DashboardLocator.fraudControlDialogCloseButton)
        await this.click(DashboardLocator.fraudControlDialogCloseButton)
    }

    async validateComplimentTransactionDataOnDashboardFraudControl(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.complimentTransactionButton)
        await this.click(DashboardLocator.complimentTransactionButton)
        let isListEmpty = await this.isVisible(
            DashboardLocator.checkDataEmptyByMessage(this.emptyMessageComplimentTransaction)
        )
        if (!isListEmpty) {
            // TODO : search an item
        }
        await this.expectVisible(DashboardLocator.fraudControlDialogCloseButton)
        await this.click(DashboardLocator.fraudControlDialogCloseButton)
    }

    async validateNonSalesTransactionDataOnDashboardFraudControl(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.nonSalesTransactionButton)
        await this.click(DashboardLocator.nonSalesTransactionButton)
        let isListEmpty = await this.isVisible(
            DashboardLocator.checkDataEmptyByMessage(this.emptyMessageNonSalesTransaction)
        )
        if (!isListEmpty) {
            // TODO : search an item
        }
        await this.expectVisible(DashboardLocator.fraudControlDialogCloseButton)
        await this.click(DashboardLocator.fraudControlDialogCloseButton)
    }

    private async inputCompositionTopMenuCategoryField() {
        await this.expectVisible(DashboardLocator.compositionTopMenuCategoryField)
        await this.click(DashboardLocator.compositionTopMenuCategoryField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.category))
        await this.click(DashboardLocator.filterOptionItem(this.category))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopMenuSubCategoryField() {
        await this.expectVisible(DashboardLocator.compositionTopMenuSubCategoryField)
        await this.click(DashboardLocator.compositionTopMenuSubCategoryField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.subCategory))
        await this.click(DashboardLocator.filterOptionItem(this.subCategory))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopMenuSalesModeField() {
        await this.expectVisible(DashboardLocator.compositionTopMenuSalesModeField)
        await this.click(DashboardLocator.compositionTopMenuSalesModeField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.salesMode))
        await this.click(DashboardLocator.filterOptionItem(this.salesMode))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopMenuValueTypeField() {
        await this.expectVisible(DashboardLocator.compositionTopMenuValueTypeField)
        await this.click(DashboardLocator.compositionTopMenuValueTypeField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.valueType))
        await this.click(DashboardLocator.filterOptionItem(this.valueType))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopMenuLimitField() {
        await this.expectVisible(DashboardLocator.compositionTopMenuLimitField)
        await this.click(DashboardLocator.compositionTopMenuLimitField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.limit))
        await this.click(DashboardLocator.filterOptionItem(this.limit))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async fillFilterCompositionTopMenu() {
        await this.inputCompositionTopMenuCategoryField()
        await this.inputCompositionTopMenuSubCategoryField()
    }


    private async inputCompositionTopBranchCompanyField() {
        await this.expectVisible(DashboardLocator.compositionTopBranchCompanyField)
        await this.click(DashboardLocator.compositionTopBranchCompanyField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.company))
        await this.click(DashboardLocator.filterOptionItem(this.company))
        await this.waitForResponse(this.apiSalesTopData)
        await this.wait(200)
    }

    private async inputCompositionTopBranchBrandField() {
        await this.expectVisible(DashboardLocator.compositionTopBranchBrandField)
        await this.click(DashboardLocator.compositionTopBranchBrandField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.brand))
        await this.click(DashboardLocator.filterOptionItem(this.brand))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopBranchBranchField() {
        await this.expectVisible(DashboardLocator.compositionTopBranchBranchField)
        await this.click(DashboardLocator.compositionTopBranchBranchField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.branch))
        await this.click(DashboardLocator.filterOptionItem(this.branch))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopBranchValueTypeField() {
        await this.expectVisible(DashboardLocator.compositionTopBranchValueTypeField)
        await this.click(DashboardLocator.compositionTopBranchValueTypeField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.valueType))
        await this.click(DashboardLocator.filterOptionItem(this.valueType))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async inputCompositionTopBranchLimitField() {
        await this.expectVisible(DashboardLocator.compositionTopBranchLimitField)
        await this.click(DashboardLocator.compositionTopBranchLimitField)
        await this.expectVisible(DashboardLocator.filterOptionItem(this.limit))
        await this.click(DashboardLocator.filterOptionItem(this.limit))
        await this.waitForResponse(this.apiSalesTopData)
    }

    private async fillFilterCompositionTopBranch() {
        await this.inputCompositionTopBranchCompanyField()
        await this.inputCompositionTopBranchBrandField()
    }

    async validateTopMenuDataOnDashboardComposition(): Promise<void> {
        await this.fillFilterCompositionTopMenu()
    }

    async validateTopBranchDataOnDashboardComposition(): Promise<void> {
        await this.fillFilterCompositionTopBranch()
    }

    async validateSalesBySalesModeDataOnDashboardComposition(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.compositionSalesBySalesMode)
    }

    async validateSalesByPaymentMethodDataOnDashboardComposition(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.compositionSalesByPaymentMethod)
    }

    async validateSalesByCategoryDataOnDashboardComposition(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.compositionSalesByCategory)
    }

    async validateNetSalesDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.netSalesData)
    }

    async validateTotalBillsDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.totalBillsData)
    }

    async validateAverageNetSalesPerBillDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.averageNetSalesPerBillData)
    }

    async validateTotalPaxDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.totalPaxData)
    }

    async validateAverageNetSalesPerPaxDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.averageNetSalesPerPaxData)
    }

    async validatePendingSalesDataOnDashboardSalesPerformance(): Promise<void> {
        await this.fillFilterAndShowData()
        await this.expectVisible(DashboardLocator.pendingSalesData)
    }

    async dashboardAccordionCheck(): Promise<void> {
        const isDashboardVisible = await this.isVisible(SidebarLocator.sidebarDashboardClosed);
        if (isDashboardVisible) {
            await this.click(SidebarLocator.sidebarDashboardClosed);
            await this.expectVisible(SidebarLocator.sidebarDashboardOpen);
        }
    }

    async handleMenuToolTip(): Promise<void> {
        const isTooltipVisible = await this.isVisible(MenuLocator.menuTooltipOkeOrangeButton);
        if (isTooltipVisible) {
            await this.click(MenuLocator.menuTooltipOkeOrangeButton);
        }
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

    async esbOrderAccordionCheck(): Promise<void> {
        const isESBOrderVisible = await this.isVisible(SidebarLocator.sidebarESBOrderHeadClosed);
        if (isESBOrderVisible) {
            await this.click(SidebarLocator.sidebarESBOrderHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarESBOrderHeadOpen);
        }
    }

    async inventoryAccordionCheck(): Promise<void> {
        const isInventoryVisible = await this.isVisible(SidebarLocator.sidebarInventoryHeadClosed);
        if (isInventoryVisible) {
            await this.click(SidebarLocator.sidebarInventoryHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarInventoryHeadOpen);
        }
    }

    async onlinePlatformAccordionCheck(): Promise<void> {
        const isOnlinePlatformVisible = await this.isVisible(SidebarLocator.sidebarOnlinePlatformClosed);
        if (isOnlinePlatformVisible) {
            await this.click(SidebarLocator.sidebarOnlinePlatformClosed);
            await this.expectVisible(SidebarLocator.sidebarOnlinePlatformOpen);
        }
    }

    async reportAccordionCheck(): Promise<void> {
        const isReportVisible = await this.isVisible(SidebarLocator.sidebarReportHeadClosed);
        if (isReportVisible) {
            await this.click(SidebarLocator.sidebarReportHeadClosed);
            await this.expectVisible(SidebarLocator.sidebarReportHeadOpen);
        }
    }

    async userAccessAccordionCheck(): Promise<void> {
        const isUserAccessVisible = await this.isVisible(SidebarLocator.sidebarUserAccessControlClosed);
        if (isUserAccessVisible) {
            await this.click(SidebarLocator.sidebarUserAccessControlClosed);
            await this.expectVisible(SidebarLocator.sidebarUserAccessControlOpen);
        }
    }

    async withdrawFundAccordionCheck(): Promise<void> {
        const isWithdrawFundsVisible = await this.isVisible(SidebarLocator.sidebarWithdrawFundsClosed);
        if (isWithdrawFundsVisible) {
            await this.click(SidebarLocator.sidebarWithdrawFundsClosed);
            await this.expectVisible(SidebarLocator.sidebarWithdrawFundsOpen);
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
        // await this.handleMenuToolTip();
        await this.expectVisible(MenuLocator.menuTooltipOkeButton);
        await this.click(MenuLocator.menuTooltipOkeOrangeButton)
        // await this.expectVisible(MenuLocator.menuTooltipOkeButton);
        // await this.click(MenuLocator.menuTooltipOkeButton);
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

    async goToBannerMarketing(): Promise<BannerMarketingPage> {
        await this.esbOrderAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarESBOrderBannerMarketing, BannerMarketingPage);
    }

    async goToSetting(): Promise<SettingPage> {
        await this.esbOrderAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarESBOrderSetting, SettingPage);
    }

    async goToRawMaterial(): Promise<RawMaterialPage> {
        await this.inventoryAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarRawMaterial, RawMaterialPage);
    }

    async goToRawMaterialReport(): Promise<RawMaterialReportPage> {
        await this.inventoryAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarRawMaterialReport, RawMaterialReportPage);
    }

    async goToRawMaterialStock(): Promise<RawMaterialStockPage> {
        await this.inventoryAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarRawMaterialStock, RawMaterialStockPage);
    }

    async goToRawMaterialTransaction(): Promise<RawMaterialTransactionPage> {
        await this.inventoryAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarRawMaterialTransaction, RawMaterialTransactionPage);
    }

    async goToManageOnlineMenu(): Promise<ManageOnlineMenuPage> {
        await this.onlinePlatformAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarManageOnlineMenu, ManageOnlineMenuPage);
    }

    async goToPlatformIntegration(): Promise<PlatformIntegrationPage> {
        await this.onlinePlatformAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarPlatformIntegration, PlatformIntegrationPage);
    }

    async goToPrinter(): Promise<PrinterPage> {
        await this.printerSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarPrinterSettingChild, PrinterPage);
    }

    async goToMenuManagement(): Promise<MenuManagementPage> {
        await this.printerSettingAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarMenuManagement, MenuManagementPage);
    }

    async goToCancelAndVoid(): Promise<CancelAndVoidPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarCancelAndVoid, CancelAndVoidPage);
    }

    async goToPayment(): Promise<PaymentPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarPaymentReport, PaymentPage);
    }

    async goToProfitAndLoss(): Promise<ProfitAndLossPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarProfitAndLoss, ProfitAndLossPage);
    }

    async goToPromotionReport(): Promise<ReportPromotionPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarReportPromotion, ReportPromotionPage);
    }

    async goToSalesDetail(): Promise<SalesDetailPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarSalesDetail, SalesDetailPage);
    }

    async goToSalesMenu(): Promise<SalesMenuPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarSalesMenuReport, SalesMenuPage);
    }

    async goToSalesSummary(): Promise<SalesSummaryPage> {
        await this.reportAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarSalesSummary, SalesSummaryPage);
    }

    async goToUserAccessControl(): Promise<UserPage> {
        await this.userAccessAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarUser, UserPage);
    }

    async goToUserAccessBackend(): Promise<UserAccessBackendPage> {
        await this.userAccessAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarUserAccessBackend, UserAccessBackendPage);
    }

    async goToUserAccessPOS(): Promise<UserAccessPOSPage> {
        await this.userAccessAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarUserAccessPOS, UserAccessPOSPage);
    }

    async goToStockMenu(): Promise<StockMenuPage> {
        await this.dashboardAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarStockMenu, StockMenuPage);
    }

    async goToBookKeeping(): Promise<BookKeepingPage> {
        await this.dashboardAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarDashboardBookkeeping, BookKeepingPage);
    }

    async goToOnlinePayment(): Promise<OnlinePaymentPage> {
        await this.dashboardAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarOnlinePayment, OnlinePaymentPage);
    }

    async goToPromotion(): Promise<PromotionPage> {
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarPromotionHead, PromotionPage);
    }

    async goToRemainingFunds(): Promise<RemainingFundsPage> {
        await this.withdrawFundAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarRemainingFunds, RemainingFundsPage);
    }

    async goToWithdrawHistory(): Promise<HistoryPage> {
        await this.withdrawFundAccordionCheck();
        return this.clickAndExpectGotoPage(SidebarLocator.sidebarHistory, HistoryPage);
    }

    async goToProfile(): Promise<ProfilePage> {
        await this.click(DashboardLocator.dashboardAccountDropdown);
        await this.expectVisible(DashboardLocator.dashboardProfileDropdown);
        return this.clickAndExpectGotoPage(DashboardLocator.dashboardProfileDropdown, ProfilePage);
    }
}