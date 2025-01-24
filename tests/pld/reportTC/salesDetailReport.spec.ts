import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import SalesDetailPage from "../../../src/modules/pld/report/salesDetail/salesDetail.page";

test.describe.serial("Sales Detail Report Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @report @salesDetail";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0402007] Verify User can filter and view data Sales Detail",
        {tag: tag}, async ({page}) => {
            const salesDetailPage = new SalesDetailPage(page);
            await salesDetailPage.validateFilterAndShowData();
        });

    test("[TC_0402007] Verify User can filter and view data Sales Detail with Transaction Number",
        {tag: tag}, async ({page}) => {
            const salesDetailPage = new SalesDetailPage(page);
            await salesDetailPage.validateShowDataWithTransactionNumber();
        });

    test("[TC_0402007] Verify User can filter, view, and download data",
        {tag: tag}, async ({page}) => {
            const salesDetailPage = new SalesDetailPage(page);
            await salesDetailPage.validateShowDataAndDownload();
        });
});