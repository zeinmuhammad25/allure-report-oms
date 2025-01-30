import {test} from "@playwright/test";
import SalesSummaryPage from "../../../src/modules/pld/report/salesSummary/salesSummary.page";
import LoginPage from "../../../src/modules/pld/login/login.page";

test.describe.serial("Sales Summary Report Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @report @salesSummaryReport";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0402001] Verify Summary Report has Sales Statistic",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateSalesStatistic();
    });

    test("[TC_0402002] Verify Summary Report has Data Sales Per Day",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesPerDay();
    });

    test("[TC_0402003] Verify Summary Report has Data Sales Per Time",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesPerTime();
    });

    test("[TC_0402004] Verify Summary Report has Data Sales",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSales();
    });

    test("[TC_0402005] Verify Summary Report has Data Fraud Control",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesFraudControl();
    });

    test("[TC_0402006] Verify Summary Report can be download",
        {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.downloadSalesSummary();
    });
});