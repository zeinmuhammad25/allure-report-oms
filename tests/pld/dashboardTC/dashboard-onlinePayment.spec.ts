import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";
import OnlinePaymentPage from "../../../src/modules/pld/dashboard/onlinePayment/onlinePayment.page";

test.describe.serial("Dashboard Online Payment Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @onlinePayment";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0401026] Verify User can filter and show Summary Payment Data of Dashboard Online Payment",
        {tag: tag}, async ({page}) => {
            const onlinePaymentPage = new OnlinePaymentPage(page);
            await onlinePaymentPage.validateSummaryPaymentDataOnDashboardOnlinePayment();
        });

    test("[TC_0401027] Verify User can filter and show Detail Payment Data of Dashboard Online Payment",
        {tag: tag}, async ({page}) => {
            const onlinePaymentPage = new OnlinePaymentPage(page);
            await onlinePaymentPage.validateDetailPaymentDataOnDashboardOnlinePayment();
        });

    test("[TC_0401028] Verify User can filter and show Daily Payment Data of Dashboard Online Payment",
        {tag: tag}, async ({page}) => {
            const onlinePaymentPage = new OnlinePaymentPage(page);
            await onlinePaymentPage.validateDailyPaymentDataOnDashboardOnlinePayment();
        });

    test("[TC_0401029] Verify User can filter, show, and download Data of Dashboard Online Payment",
        {tag: tag}, async ({page}) => {
            const onlinePaymentPage = new OnlinePaymentPage(page);
            await onlinePaymentPage.validateDownloadDataOnDashboardOnlinePayment();
        });
});