import LoginPage from "../../../src/modules/pld/login/login.page";
import {test} from "@playwright/test";
import StockMenuPage from "../../../src/modules/pld/dashboard/stockMenu/stockMenu.page";

test.describe.serial("Dashboard Stock Menu Test", () => {
    let loginPage: LoginPage;
    const tag = "@smokeTest @dashboard @stockMenu";

    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test("[TC_0401017] Verify User can filter and show data of Dashboard Stock Menu",
        {tag: tag}, async ({page}) => {
            const stockMenuPage = new StockMenuPage(page);
            await stockMenuPage.validateDataOnDashboardStockMenu();
        });
});