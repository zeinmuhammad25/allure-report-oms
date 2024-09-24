import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Sales Profit and Lost Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @dashboard @salesPerformance'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test(
        "Verify User can filter and show data Net Sales of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateNetSalesDataOnDashboardSalesPerformance()
        })

    test(
        "Verify User can filter and show data Total Bills of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateTotalBillsDataOnDashboardSalesPerformance()
        })

    test(
        "Verify User can filter and show data Bill Size of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateAverageNetSalesPerBillDataOnDashboardSalesPerformance()
        })

    test(
        "Verify User can filter and show data Total Pax of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateTotalPaxDataOnDashboardSalesPerformance()
        })

    test(
        "Verify User can filter,  and show Order Per Pax of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateAverageNetSalesPerPaxDataOnDashboardSalesPerformance()
        })

    test(
        "Verify User can filter and show data Pending Sales of Dashboard Sales Perfomance",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validatePendingSalesDataOnDashboardSalesPerformance()
        })
})