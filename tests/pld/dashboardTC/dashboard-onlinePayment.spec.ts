import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Online Payment Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @dashboard @onlinePayment'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test(
        "Verify User can filter and show Summary Payment Data of Dashboard Online Payment",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesBySalesModeDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show Detail Payment Data of Dashboard Online Payment",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesBySalesModeDataOnDashboardComposition()
        })

    test(
        "Verify User can filter and show Daily Payment Data of Dashboard Online Payment",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesBySalesModeDataOnDashboardComposition()
        })

    test(
        "Verify User can filter, show, and download Data of Dashboard Online Payment",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateSalesBySalesModeDataOnDashboardComposition()
        })
})