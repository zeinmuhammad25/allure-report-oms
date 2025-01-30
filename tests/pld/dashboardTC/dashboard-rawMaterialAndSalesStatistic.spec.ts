import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Composition Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @rawMaterialAndSalesStatistic";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0401007] Verify User can filter and show Sales Statistic Data on Dashboard Page",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateSalesStatisticOnDashboard();
        });

    test("[TC_0401008] Verify User can filter and show Raw Material Stock Data on Dashboard Page",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateRawMaterialStockOnDashboard();
        });
});