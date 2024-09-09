import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import DashboardPage from "../../../src/modules/pld/dashboard/dashboard.page";
import MenuPage from "../../../src/modules/pld/catalogue/menu/menu.page";
import MenuSinglePage from "../../../src/modules/pld/catalogue/menu/menuSingle/menuSingle.page";


test.describe.serial('Printer Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify if user can create menu single', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        let dashboardPage = new DashboardPage(page);
        let menuPage = new MenuPage(page);
        let menuSinglePage = new MenuSinglePage(page);
        await dashboardPage.goToMenu();
        await menuPage.cleanUpMenuSingle();
        await menuPage.gotoMenuSingle();
        await menuSinglePage.fillMenuInformation();
        await menuPage.cleanUpMenuSingle();

    });

    test('Verify if user can create menu package', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        let dashboardPage = new DashboardPage(page);
        let menuPage = new MenuPage(page);
        await dashboardPage.goToMenu();
        await menuPage.cleanUpMenuSingle();

    });


});
