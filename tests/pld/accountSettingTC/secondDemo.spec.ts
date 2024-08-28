import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";


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
        test.setTimeout(300000);
        let dashboardPage = new DashboardPage(page);

        const goBackToDashboard = async () => {
            await dashboardPage.goBackAndExpectGotoPage(DashboardPage);
        };
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

        // //rawMaterial
        await dashboardPage.goToBookkeepingInput();
        await goBackToDashboard();
        await dashboardPage.goToBookkeepingCategory();
        await goBackToDashboard();

        // //attendance
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


    });


});
