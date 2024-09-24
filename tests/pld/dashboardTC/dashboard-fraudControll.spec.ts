import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";

test.describe.serial("Dashboard Sales Performance Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @dashboard @fraudControl'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test(
        "Verify User can filter and show data Other Const Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateOtherCostTransactionDataOnDashboardFraudControl()
        })

    test(
        "Verify User can filter and show data Compliment Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateComplimentTransactionDataOnDashboardFraudControl()
        })

    test(
        "Verify User can filter and show data Non Sales Transaction of Dashboard Fraud Control",
        {tag: tag},
        async ({page}) => {
            const dashboardPage = new DashboardPage(page)
            await dashboardPage.validateNonSalesTransactionDataOnDashboardFraudControl()
        })
})