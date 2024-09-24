import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import CancelAndVoidPage from "../../../src/modules/pld/report/cancelAndVoid/cancelAndVoid.page";

test.describe.serial("Cancel And Void Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @report @cancelAndVoidReport'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test("Verify User can filter and show Report Cancel And Void when Cancel Table", {tag: tag}, async ({page}) => {
        const cancelAndVoidPage = new CancelAndVoidPage(page)
        await cancelAndVoidPage.validateCancelAndVoidWhenCancelTable()
    })

    test("Verify User can filter and show Report Cancel And Void when Void Transaction", {tag: tag}, async ({page}) => {
        const cancelAndVoidPage = new CancelAndVoidPage(page)
        await cancelAndVoidPage.validateCancelAndVoidWhenVoidTransaction()
    })

    test("Verify User can filter, show, and download Report Cancel And Void", {tag: tag}, async ({page}) => {
        const cancelAndVoidPage = new CancelAndVoidPage(page)
        await cancelAndVoidPage.validateDownloadCancelAndVoidReport()
    })
})