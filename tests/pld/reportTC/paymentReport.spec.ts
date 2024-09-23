import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Payment Report Test", () => {
    let loginPage: LoginPage
    const tag = '@smokeTest @report @paymentReport'

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page)
        await loginPage.navigateHere()
        await loginPage.performLoginSubs()
    })

    test("Verify User can show and data payment by Payment Method", {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateFilterAndShowDataPaymentReport()
    })

    test("Verify User can show and data detail sales in Payment Report", {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateFilterAndShowDataDetailPaymentReport()
    })

    test("Verify User can filter, show, and download Payment Report data", {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateDownloadDataDetailPayment()
    })
})