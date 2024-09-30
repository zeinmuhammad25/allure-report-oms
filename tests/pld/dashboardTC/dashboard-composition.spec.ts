import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Composition Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @dashboard @composition'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test(
        "Verify User can filter and show sales by Sales Mode Data of Dashboard Composition",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesBySalesModeDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show sales by Payment Method Data of Dashboard Composition",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesByPaymentMethodDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show sales by Category Data of Dashboard Composition",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesByCategoryDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show Top Menu Data of Dashboard Composition",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateTopMenuDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show Top Branch Data of Dashboard Composition",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateTopBranchDataOnDashboardComposition()
        })
})