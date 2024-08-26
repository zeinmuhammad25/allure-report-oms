import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import BranchPage from "../../src/modules/pld/accountSetting/branch/branch.page";
import PrinterPage from "../../src/modules/pld/printerSetting/printer/printer.page";
import BrandPage from "../../src/modules/pld/accountSetting/brand/brand.page";
import DashboardPage from "../../src/modules/pld/dashboard/dashboard.page";
import ProfilePage from "../../src/modules/pld/profile/profile.page";
import CompanyPage from "../../src/modules/pld/accountSetting/company/company.page";
import GenerateOTPPage from "../../src/modules/pld/accountSetting/generateOTP/generateOTP.page";
import NotificationEmailPage from "../../src/modules/pld/accountSetting/notificationEmail/notificationEmail.page";
import PaymentMethodPage from "../../src/modules/pld/accountSetting/paymentMethod/paymentMethod.page";
import TableSettingPage from "../../src/modules/pld/accountSetting/tableSetting/tableSetting.page";
import AttendanceListPage from "../../src/modules/pld/attendance/attendanceList/attendanceList.page";
import EmployeeDataPage from "../../src/modules/pld/attendance/employeeData/employeeData.page";
import BookKeepingPage from "../../src/modules/pld/dashboard/bookKeeping/bookKeeping.page";
import BookkeepingCategoryPage from "../../src/modules/pld/bookkeeping/bookkeepingCategory/bookkeepingCategory.page";
import BookkeepingInputPage from "../../src/modules/pld/bookkeeping/bookkeepingInput/bookkeepingInput.page";
import BookkeepingReportPage from "../../src/modules/pld/bookkeeping/bookkeepingReport/bookkeepingReport.page";
import CategoryPage from "../../src/modules/pld/catalogue/category/category.page";
import AddRecipePage from "../../src/modules/pld/catalogue/addRecipe/addRecipe.page";
import MenuPage from "../../src/modules/pld/catalogue/menu/menu.page";
import MenuBookPage from "../../src/modules/pld/catalogue/menuBook/menuBook.page";
import MenuNotesPage from "../../src/modules/pld/catalogue/menuNotes/menuNotes.page";
import ReasonCancelPage from "../../src/modules/pld/catalogue/reasonCancel/reasonCancel.page";
import SalesModePage from "../../src/modules/pld/catalogue/salesMode/salesMode.page";
import SpecialPricePage from "../../src/modules/pld/catalogue/specialPrice/specialPrice.page";
import BusinessTipsPage from "../../src/modules/pld/dashboard/businessTips/businessTips.page";
import OnlinePaymentPage from "../../src/modules/pld/dashboard/onlinePayment/onlinePayment.page";
import StockMenuPage from "../../src/modules/pld/dashboard/stockMenu/stockMenu.page";
import BannerMarketingPage from "../../src/modules/pld/esbOrder/bannerMarketing/bannerMarketing.page";
import SettingPage from "../../src/modules/pld/esbOrder/setting/setting.page";
import RawMaterialPage from "../../src/modules/pld/inventory/rawMaterial/rawMaterial.page";
import RawMaterialReportPage from "../../src/modules/pld/inventory/rawMaterialReport/rawMaterialReport.page";
import RawMaterialStockPage from "../../src/modules/pld/inventory/rawMaterialStock/rawMaterialStock.page";
import RawMaterialTransactionPage
    from "../../src/modules/pld/inventory/rawMaterialTransaction/rawMaterialTransaction.page";
import ManageOnlineMenuPage from "../../src/modules/pld/onlinePlatform/manageOnlineMenu/manageOnlineMenu.page";
import PlatformIntegrationPage from "../../src/modules/pld/onlinePlatform/platformIntegration/platformIntegration.page";
import MenuManagementPage from "../../src/modules/pld/printerSetting/menuManagement/menuManagement.page";
import PromoCodePage from "../../src/modules/pld/promoCode/promoCode/promoCode.page";
import PromoCodeHistoryPage from "../../src/modules/pld/promoCode/promoCodeHistory/promoCodeHistory.page";
import PromotionPage from "../../src/modules/pld/promotion/promotion.page";
import CancelAndVoidPage from "../../src/modules/pld/report/cancelAndVoid/cancelAndVoid.page";
import PaymentPage from "../../src/modules/pld/report/payment/payment.page";
import ProfitAndLossPage from "../../src/modules/pld/report/profitAndLoss/profitAndLoss.page";
import SalesDetailPage from "../../src/modules/pld/report/salesDetail/salesDetail.page";
import SalesMenuPage from "../../src/modules/pld/report/salesMenu/salesMenu.page";
import SalesSummaryPage from "../../src/modules/pld/report/salesSummary/salesSummary.page";
import KycProcessPage from "../../src/modules/pld/subscriptionInformation/kycProcess/kycProcess.page";
import OnboardingProcessPage
    from "../../src/modules/pld/subscriptionInformation/onboardingProcess/onboardingProcess.page";
import SubscriptionStatusPage
    from "../../src/modules/pld/subscriptionInformation/subscriptionStatus/subscriptionStatus.page";
import TopUpBalancePage from "../../src/modules/pld/subscriptionInformation/topUpBalance/topUpBalance.page";
import UserPage from "../../src/modules/pld/userAccessControl/user/user.page";
import UserAccessBackendPage from "../../src/modules/pld/userAccessControl/userAccessBackend/userAccessBackend.page";
import HistoryPage from "../../src/modules/pld/withdrawFunds/history/history.page";
import RemainingFundsPage from "../../src/modules/pld/withdrawFunds/remainingFunds/remainingFunds.page";


test.describe.serial('Demo Test Case', () => {
    let loginPage: LoginPage;


    test('aaaa', {tag: '@demoTest, @accountDemo'}, async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();

        await loginPage.gotoPage(DashboardPage)
            //accountSetting
            .then(page => page.gotoPage(BranchPage))
            .then(page => page.gotoPage(BrandPage))
            .then(page => page.gotoPage(CompanyPage))
            .then(page => page.gotoPage(ProfilePage))
            .then(page => page.gotoPage(GenerateOTPPage))
            .then(page => page.gotoPage(NotificationEmailPage))
            .then(page => page.gotoPage(PaymentMethodPage))
            .then(page => page.gotoPage(TableSettingPage))
            //attendance
            .then(page => page.gotoPage(AttendanceListPage))
            .then(page => page.gotoPage(EmployeeDataPage))
            //bookkeeping
            .then(page => page.gotoPage(BookkeepingCategoryPage))
            .then(page => page.gotoPage(BookkeepingInputPage))
            .then(page => page.gotoPage(BookkeepingReportPage))
            //catalogue
            .then(page => page.gotoPage(AddRecipePage))
            .then(page => page.gotoPage(CategoryPage))
            .then(page => page.gotoPage(MenuPage))
            .then(page => page.gotoPage(MenuBookPage))
            .then(page => page.gotoPage(MenuNotesPage))
            .then(page => page.gotoPage(ReasonCancelPage))
            .then(page => page.gotoPage(SalesModePage))
            .then(page => page.gotoPage(SpecialPricePage))
            //dashboard
            .then(page => page.gotoPage(BookKeepingPage))
            .then(page => page.gotoPage(BusinessTipsPage))
            .then(page => page.gotoPage(OnlinePaymentPage))
            .then(page => page.gotoPage(SpecialPricePage))
            .then(page => page.gotoPage(StockMenuPage))
            //esbOrder
            .then(page => page.gotoPage(BannerMarketingPage))
            .then(page => page.gotoPage(SettingPage))
            //inventory
            .then(page => page.gotoPage(RawMaterialPage))
            .then(page => page.gotoPage(RawMaterialReportPage))
            .then(page => page.gotoPage(RawMaterialStockPage))
            .then(page => page.gotoPage(RawMaterialTransactionPage))
            //onlinePlatform
            .then(page => page.gotoPage(ManageOnlineMenuPage))
            .then(page => page.gotoPage(PlatformIntegrationPage))
            //printerSetting
            .then(page => page.gotoPage(MenuManagementPage))
            .then(page => page.gotoPage(PrinterPage))
            //profile
            .then(page => page.gotoPage(ProfilePage))
            //promotion
            .then(page => page.gotoPage(PromotionPage))
            //report
            .then(page => page.gotoPage(CancelAndVoidPage))
            .then(page => page.gotoPage(PaymentPage))
            .then(page => page.gotoPage(ProfitAndLossPage))
            .then(page => page.gotoPage(SalesDetailPage))
            .then(page => page.gotoPage(SalesMenuPage))
            .then(page => page.gotoPage(SalesSummaryPage))
            //userAccessControl
            .then(page => page.gotoPage(UserPage))
            .then(page => page.gotoPage(UserAccessBackendPage))
            //withdrawFunds
            .then(page => page.gotoPage(HistoryPage))
            .then(page => page.gotoPage(RemainingFundsPage))


    });

});
