import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import ReportPromotionPage from "../../../src/modules/pld/report/promotion/reportPromotion.page";

test.describe.serial("Sales Summary Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @report @promotionReport'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test("Verify User can filter and view list data promotion", {tag: tag}, async ({page}) => {
        const reportPromotionPage = new ReportPromotionPage(page)
        await reportPromotionPage.validateListOfDataPromotion()
    })

    test("Verify User can filter and view detail data promotion", {tag: tag}, async ({page}) => {
        const reportPromotionPage = new ReportPromotionPage(page)
        await reportPromotionPage.validateDetailDataPromotion()
    })

    test("Verify User can filter, view, and download data promotion", {tag: tag}, async ({page}) => {
        const reportPromotionPage = new ReportPromotionPage(page)
        await reportPromotionPage.validateDownloadDataPromotion()
    })
})