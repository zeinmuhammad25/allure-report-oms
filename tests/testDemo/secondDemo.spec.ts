import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import DashboardPage from "../../src/modules/pld/dashboard/dashboard.page";


test.describe.serial('Printer Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify accountSetting modules element', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        let dashboardPage = new DashboardPage(page);
        await dashboardPage.goToBranch();
        await dashboardPage.goBackAndExpectGotoPage(DashboardPage);


    });

    test('Verify accountSetting modules', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        test.setTimeout(100000);
        let dashboardPage = new DashboardPage(page);

        const goBackToDashboard = async () => {
            await dashboardPage.goBackAndExpectGotoPage(DashboardPage);
        };
        //dashboard
        await dashboardPage.goToStockMenu();
        await goBackToDashboard();
        await dashboardPage.goToBookKeeping();
        await goBackToDashboard();
        await dashboardPage.goToOnlinePayment();
        await goBackToDashboard();


        //accountSetting
        await dashboardPage.goToBranch();
        await goBackToDashboard();
        await dashboardPage.goToBrand();
        await goBackToDashboard();
        await dashboardPage.goToCompany();
        await goBackToDashboard();
        await dashboardPage.goToGenerateOTP();
        await goBackToDashboard();
        await dashboardPage.goToNotificationEmail();
        await goBackToDashboard();
        await dashboardPage.goToPaymentMethod();
        await goBackToDashboard();
        await dashboardPage.goToTableSetting();
        await goBackToDashboard();
        //rawMaterial
        await dashboardPage.goToBookkeepingInput();
        await goBackToDashboard();
        await dashboardPage.goToBookkeepingCategory();
        await goBackToDashboard();
        //attendance
        await dashboardPage.goToAttendanceList();
        await goBackToDashboard();
        await dashboardPage.goToEmployeeData();
        await goBackToDashboard();
        //catalogue
        await dashboardPage.goToMenu();
        await goBackToDashboard();
        await dashboardPage.goToMenuNotes();
        await goBackToDashboard();
        await dashboardPage.goToMenuBook();
        await goBackToDashboard();
        await dashboardPage.goToReasonCancel();
        await goBackToDashboard();
        await dashboardPage.goToSalesMode();
        await goBackToDashboard();
        await dashboardPage.goToSpecialPrice();
        await goBackToDashboard();
        //esbOrder
        await dashboardPage.goToSetting();
        await goBackToDashboard();
        await dashboardPage.goToBannerMarketing();
        await goBackToDashboard();
        //inventori
        await dashboardPage.goToRawMaterial();
        await goBackToDashboard();
        await dashboardPage.goToRawMaterialReport();
        await goBackToDashboard();
        await dashboardPage.goToRawMaterialStock();
        await goBackToDashboard();
        await dashboardPage.goToRawMaterialTransaction();
        await goBackToDashboard();
        //onlinePlatform
        await dashboardPage.goToManageOnlineMenu();
        await goBackToDashboard();
        await dashboardPage.goToPlatformIntegration();
        await goBackToDashboard();
        //printerSetting
        await dashboardPage.goToPrinter();
        await goBackToDashboard();
        await dashboardPage.goToMenuManagement();
        await goBackToDashboard();
        //report
        await dashboardPage.goToCancelAndVoid();
        await goBackToDashboard();
        await dashboardPage.goToPayment();
        await goBackToDashboard();
        await dashboardPage.goToProfitAndLoss();
        await goBackToDashboard();
        await dashboardPage.goToPromotionReport();
        await goBackToDashboard();
        await dashboardPage.goToSalesDetail();
        await goBackToDashboard();
        await dashboardPage.goToSalesMenu();
        await goBackToDashboard();
        await dashboardPage.goToSalesSummary();
        await goBackToDashboard();

        //userAccessControl
        await dashboardPage.goToUserAccessControl();
        await goBackToDashboard();
        await dashboardPage.goToUserAccessBackend();
        await goBackToDashboard();
        await dashboardPage.goToUserAccessPOS();
        await goBackToDashboard();

        //promotion
        await dashboardPage.goToPromotion();
        await goBackToDashboard();

        //withdrawFund
        await dashboardPage.goToRemainingFunds();
        await goBackToDashboard();
        await dashboardPage.goToWithdrawHistory();
        await goBackToDashboard();

        //profile
        await dashboardPage.goToProfile();
        await goBackToDashboard();


    });


});
