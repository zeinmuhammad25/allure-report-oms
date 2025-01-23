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

    test("Verify Summary Report has Sales Statistic", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateSalesStatistic();
    });

    test("Verify Summary Report has Data Sales Per Day", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesPerDay();
    });

    test("Verify Summary Report has Data Sales Per Time", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesPerTime();
    });

    test("Verify Summary Report has Data Sales", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSales();
    });

    test("Verify Summary Report has Data Fraud Controll", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.validateDataSalesFraudControl();
    });

    test("Verify Summary Report can be download", {tag: tag}, async ({page}) => {
        const salesSummaryPage = new SalesSummaryPage(page);
        await salesSummaryPage.downloadSalesSummary();
    });
});