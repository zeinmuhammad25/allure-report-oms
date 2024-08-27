import BaseScenario from "../../base/base-scenario";
import DashboardPage from "./dashboard.page";
import BusinessTipsPage from "./businessTips/businessTips.page";

export default interface DashboardScenario extends BaseScenario {

    //dashboard
    goToDashboard(): Promise<void>;
    goToStockMenu(): Promise<DashboardPage>;
    goToBookKeeping(): Promise<DashboardPage>;
    goToBusinessTips(): Promise<DashboardPage>;
    goToOnlinePayment(): Promise<DashboardPage>;

    //accountSetting
    goToBranch(): Promise<DashboardPage>;
    goToBrand(): Promise<DashboardPage>;
    goToCompany(): Promise<DashboardPage>;
    goToGenerateOTP(): Promise<DashboardPage>;
    goToNotificationEmail(): Promise<DashboardPage>;
    goToPaymentMethod(): Promise<DashboardPage>;
    goToTableSetting(): Promise<DashboardPage>;

    //attendance
    goToAttendanceList(): Promise<DashboardPage>;
    goToEmployeeData(): Promise<DashboardPage>;

    //bookkeeping
    goToBookkeepingCategory(): Promise<DashboardPage>;
    goToBookkeepingInput(): Promise<DashboardPage>;
    goToBookkeepingReport(): Promise<DashboardPage>;

    //catalogue
    goToCategory(): Promise<DashboardPage>;
    goToMenu(): Promise<DashboardPage>;
    goToMenuBook(): Promise<DashboardPage>;
    goToMenuNotes(): Promise<DashboardPage>;
    goToReasonCancel(): Promise<DashboardPage>;
    goToSalesMode(): Promise<DashboardPage>;
    goToSpecialPrice(): Promise<DashboardPage>;

    //esbOrder
    goToBannerMarketing(): Promise<DashboardPage>;
    goToSetting(): Promise<DashboardPage>;

    //inventory
    goToRawMaterial(): Promise<DashboardPage>;
    goToRawMaterialReport(): Promise<DashboardPage>;
    goToRawMaterialStock(): Promise<DashboardPage>;
    goToRawMaterialTransaction(): Promise<DashboardPage>;

    //onlinePlatform
    goToManageOnlineMenu(): Promise<DashboardPage>;
    goToPlatformIntegration(): Promise<DashboardPage>;

    //printerSetting
    goToMenuManagement(): Promise<DashboardPage>;
    goToPrinter(): Promise<DashboardPage>;

    //profile
    goToProfile(): Promise<DashboardPage>;
    goToWithdrawalFundsInformation(): Promise<DashboardPage>;

    //promoCode
    goToPromoCode(): Promise<DashboardPage>;
    goToPromoCodeHistory(): Promise<DashboardPage>;

    //promotion
    goToPromotion(): Promise<DashboardPage>;

    //report
    goToCancelAndVoid(): Promise<DashboardPage>;
    goToPayment(): Promise<DashboardPage>;
    goToProfitAndLoss(): Promise<DashboardPage>;
    goToPromotionReport(): Promise<DashboardPage>;
    goToSalesDetail(): Promise<DashboardPage>;
    goToSalesMenu(): Promise<DashboardPage>;
    goToSalesSummary(): Promise<DashboardPage>;

    //subscriptionInformation
    goToKYCProcess(): Promise<DashboardPage>;
    goToOnboardingProcess(): Promise<DashboardPage>;
    goToSubscriptionStatus(): Promise<DashboardPage>;
    goToTopUpBalance(): Promise<DashboardPage>;

    //userAccessControl
    goToUserAccessControl(): Promise<DashboardPage>;
    goToUserAccessBackend(): Promise<DashboardPage>;
    goToUserAccessPOS(): Promise<DashboardPage>;




}