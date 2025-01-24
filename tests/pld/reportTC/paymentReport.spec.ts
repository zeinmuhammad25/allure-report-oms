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

    test("[TC_0402010] Verify User can filter and show data from Payment Method",
        {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateFilterAndShowDataFromPaymentMethod()
    })

    test("[TC_0402011] Verify User can filter and show data Sales Detail",
        {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateFilterAndShowDataSalesDetail()
    })

    test("[TC_0402012] Verify User can filter, show, and download Payment Report data",
        {tag: tag}, async ({page}) => {
        const paymentPage = new PaymentPage(page)
        await paymentPage.validateDownloadDataPaymentReport()
    })
})