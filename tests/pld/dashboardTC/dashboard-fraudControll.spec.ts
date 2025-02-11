import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Fraud Control Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @fraudControl";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0401009] Verify User can filter and show data Other Cost Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateOtherCostTransactionDataOnDashboardFraudControl();
        });

    test("[TC_0401010] Verify User can filter and show data Compliment Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateComplimentTransactionDataOnDashboardFraudControl();
        });

    test("[TC_0401011] Verify User can filter and show data Non Sales Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateNonSalesTransactionDataOnDashboardFraudControl();
        });
});