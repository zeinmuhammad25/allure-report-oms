import BaseScenario from "../../base/base-scenario";
import DashboardPage from "./dashboard.page";
import BusinessTipsPage from "./businessTips/businessTips.page";
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
import BookkeepingReportPage from "../bookkeeping/bookkeepingReport/bookkeepingReport.page";
import CategoryPage from "../catalogue/category/category.page";
import MenuPage from "../catalogue/menu/menu.page";
import MenuBookPage from "../catalogue/menuBook/menuBook.page";
import MenuNotesPage from "../catalogue/menuNotes/menuNotes.page";
import ReasonCancelPage from "../catalogue/reasonCancel/reasonCancel.page";
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
import MenuManagementPage from "../printerSetting/menuManagement/menuManagement.page";
import PrinterPage from "../printerSetting/printer/printer.page";
import ProfilePage from "../profile/profile.page";
import WithdrawalFundsInformationPage from "../profile/withdrawalFundsInformation/withdrawalFundsInformation.page";
import PromoCodePage from "../promoCode/promoCode/promoCode.page";
import PromoCodeHistoryPage from "../promoCode/promoCodeHistory/promoCodeHistory.page";
import PromotionPage from "../promotion/promotion.page";
import CancelAndVoidPage from "../report/cancelAndVoid/cancelAndVoid.page";
import PaymentPage from "../report/payment/payment.page";
import ProfitAndLossPage from "../report/profitAndLoss/profitAndLoss.page";
import ReportPromotionPage from "../report/promotion/reportPromotion.page";
import SalesDetailPage from "../report/salesDetail/salesDetail.page";
import SalesMenuPage from "../report/salesMenu/salesMenu.page";
import SalesSummaryPage from "../report/salesSummary/salesSummary.page";
import KycProcessPage from "../subscriptionInformation/kycProcess/kycProcess.page";
import OnboardingProcessPage from "../subscriptionInformation/onboardingProcess/onboardingProcess.page";
import SubscriptionStatusPage from "../subscriptionInformation/subscriptionStatus/subscriptionStatus.page";
import TopUpBalancePage from "../subscriptionInformation/topUpBalance/topUpBalance.page";
import UserPage from "../userAccessControl/user/user.page";
import UserAccessBackendPage from "../userAccessControl/userAccessBackend/userAccessBackend.page";
import UserAccessPOSPage from "../userAccessControl/userAccessPOS/userAccessPOS.page";

export default interface DashboardScenario extends BaseScenario {


    //dashboard
    accountSettingAccordionCheck(): Promise<void>;
    goToDashboard(): Promise<void>;
    goToStockMenu(): Promise<DashboardPage>;
    goToBookKeeping(): Promise<DashboardPage>;
    goToBusinessTips(): Promise<DashboardPage>;
    goToOnlinePayment(): Promise<DashboardPage>;

    //accountSetting
    goToBranch(): Promise<BranchPage>;
    goToBrand(): Promise<BrandPage>;
    goToCompany(): Promise<CompanyPage>;
    goToGenerateOTP(): Promise<GenerateOTPPage>;
    goToNotificationEmail(): Promise<NotificationEmailPage>;
    goToPaymentMethod(): Promise<PaymentMethodPage>;
    goToTableSetting(): Promise<TableSettingPage>;

    //attendance
    attendanceAccordionCheck(): Promise<void>;
    goToAttendanceList(): Promise<AttendanceListPage>;
    goToEmployeeData(): Promise<EmployeeDataPage>;

    //bookkeeping
    bookkeepingAccordionCheck(): Promise<void>;
    goToBookkeepingCategory(): Promise<BookkeepingCategoryPage>;
    goToBookkeepingInput(): Promise<BookkeepingInputPage>;
    goToBookkeepingReport(): Promise<BookkeepingReportPage>;

    //catalogue
    catalogueAccordionCheck(): Promise<void>;
    goToCategory(): Promise<CategoryPage>;
    goToMenu(): Promise<MenuPage>;
    goToMenuBook(): Promise<MenuBookPage>;
    goToMenuNotes(): Promise<MenuNotesPage>;
    goToReasonCancel(): Promise<ReasonCancelPage>;
    goToSalesMode(): Promise<SalesModePage>;
    goToSpecialPrice(): Promise<SpecialPricePage>;

    //esbOrder
    esbOrderAccordionCheck(): Promise<void>;
    goToBannerMarketing(): Promise<BannerMarketingPage>;
    goToSetting(): Promise<SettingPage>;

    //inventory
    inventoryAccordionCheck(): Promise<void>;
    goToRawMaterial(): Promise<RawMaterialPage>;
    goToRawMaterialReport(): Promise<RawMaterialReportPage>;
    goToRawMaterialStock(): Promise<RawMaterialStockPage>;
    goToRawMaterialTransaction(): Promise<RawMaterialTransactionPage>;

    //onlinePlatform
    onlinePlatformAccordionCheck(): Promise<void>;
    goToManageOnlineMenu(): Promise<ManageOnlineMenuPage>;
    goToPlatformIntegration(): Promise<PlatformIntegrationPage>;

    //printerSetting
    printerSettingAccordionCheck(): Promise<void>;
    goToMenuManagement(): Promise<MenuManagementPage>;
    goToPrinter(): Promise<PrinterPage>;

    //profile
    goToProfile(): Promise<ProfilePage>;
    goToWithdrawalFundsInformation(): Promise<WithdrawalFundsInformationPage>;

    //promoCode
    goToPromoCode(): Promise<PromoCodePage>;
    goToPromoCodeHistory(): Promise<PromoCodeHistoryPage>;

    //promotion
    goToPromotion(): Promise<PromotionPage>;

    //report
    reportAccordionCheck(): Promise<void>;
    goToCancelAndVoid(): Promise<CancelAndVoidPage>;
    goToPayment(): Promise<PaymentPage>;
    goToProfitAndLoss(): Promise<ProfitAndLossPage>;
    goToPromotionReport(): Promise<ReportPromotionPage>;
    goToSalesDetail(): Promise<SalesDetailPage>;
    goToSalesMenu(): Promise<SalesMenuPage>;
    goToSalesSummary(): Promise<SalesSummaryPage>;

    //subscriptionInformation
    goToKYCProcess(): Promise<KycProcessPage>;
    goToOnboardingProcess(): Promise<OnboardingProcessPage>;
    goToSubscriptionStatus(): Promise<SubscriptionStatusPage>;
    goToTopUpBalance(): Promise<TopUpBalancePage>;

    //userAccessControl
    goToUserAccessControl(): Promise<UserPage>;
    goToUserAccessBackend(): Promise<UserAccessBackendPage>;
    goToUserAccessPOS(): Promise<UserAccessPOSPage>;




}