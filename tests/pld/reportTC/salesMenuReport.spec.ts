import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import ProfitAndLossPage from "../../../src/modules/pld/report/profitAndLoss/profitAndLoss.page";
import SalesMenuPage from "../../../src/modules/pld/report/salesMenu/salesMenu.page";

test.describe.serial("Sales Menu Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @report @salesMenuReport'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test("Verify User can filter and show Data Sales Menu on Sales Menu Report", {tag: tag}, async ({page}) => {
        const salesMenuPage = new SalesMenuPage(page)
        await salesMenuPage.validateFilterAndShowDataSalesMenuOnSalesMenu()
    })

    test("Verify User can filter, show, and download Sales Menu Report", {tag: tag}, async ({page}) => {
        const salesMenuPage = new SalesMenuPage(page)
        await salesMenuPage.validateFilterAndDownload()
    })
})