import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Sales Performance Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @salesPerformance";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test(
        "[TC_0401001] Verify User can filter and show data Net Sales of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateNetSalesDataOnDashboardSalesPerformance();
        });

    test(
        "[TC_0401002] Verify User can filter and show data Total Bills of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateTotalBillsDataOnDashboardSalesPerformance();
        });

    test(
        "[TC_0401003] Verify User can filter and show data Bill Size of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateAverageNetSalesPerBillDataOnDashboardSalesPerformance();
        });

    test(
        "[TC_0401004] Verify User can filter and show data Total Pax of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateTotalPaxDataOnDashboardSalesPerformance();
        });

    test(
        "[TC_0401005] Verify User can filter,  and show Order Per Pax of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validateAverageNetSalesPerPaxDataOnDashboardSalesPerformance();
        });

    test(
        "[TC_0401006] Verify User can filter and show data Pending Sales of Dashboard Sales Performance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page);
            await dashboardPage.validatePendingSalesDataOnDashboardSalesPerformance();
        });
});