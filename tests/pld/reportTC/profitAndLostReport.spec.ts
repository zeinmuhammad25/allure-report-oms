import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import ProfitAndLossPage from "../../../src/modules/pld/report/profitAndLoss/profitAndLoss.page";

test.describe.serial("Sales Profit and Lost Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @report @profitAndLost'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test("Verify User can show and download profit and lost report by Company", {tag: tag}, async ({page}) => {
        const profitAndLostPage = new ProfitAndLossPage(page)
        await profitAndLostPage.validateDataProfitAndLostByCompany()
    })

    test("Verify User can show and download profit and lost report by Branch", {tag: tag}, async ({page}) => {
        const profitAndLostPage = new ProfitAndLossPage(page)
        await profitAndLostPage.validateDataProfitAndLostByBranch()
    })
})