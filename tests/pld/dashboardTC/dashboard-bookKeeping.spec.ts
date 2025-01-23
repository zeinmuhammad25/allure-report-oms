import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";
import BookKeepingPage from "../../../src/modules/pld/dashboard/bookKeeping/bookKeeping.page";

test.describe.serial("Dashboard Book Keeping Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @bookKeeping";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0401018] Verify User can filter and show Statistical Book Keeping Income on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateStatisticalIncomeDataOnDashboardBookKeeping();
        });

    test("[TC_0401019] Verify User can filter and show Statistical Book Keeping Expenditure on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateStatisticalExpenditureDataOnDashboardBookKeeping();
        });

    test("[TC_0401020] Verify User can filter and show Statistical Book Keeping Profit on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateStatisticalProfitDataOnDashboardBookKeeping();
        });

    test("[TC_0401021] Verify User can filter and show Statistical Book Keeping Main Supplier on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateStatisticalMainSupplierDataOnDashboardBookKeeping();
        });

    test("[TC_0401022] Verify User can filter and show Income Transaction Chart on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateTransactionIncomeChartOnDashboardBookKeeping();
        });

    test("[TC_0401023] Verify User can filter and show Expenditure Transaction Chart on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateTransactionExpenditureChartOnDashboardBookKeeping();
        });

    test("[TC_0401024] Verify User can filter and show Profit Transaction Chart on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateTransactionProfitChartOnDashboardBookKeeping();
        });

    test("[TC_0401025] Verify User can filter and show Supplier Chart on Book Keeping Page",
        {tag: tag}, async ({page}) => {
            const bookKeeping = new BookKeepingPage(page);
            await bookKeeping.validateSupplierChartOnDashboardBookKeeping();
        });
});