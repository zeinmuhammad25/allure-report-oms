import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import LogoutPage from "../../src/modules/pld/account/logout/logout.page";


test.describe.serial('accountPage', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test('Verify if user can access logout page', {tag: '@demoTest, @account'}, async ({page}) => {
        const logout = new LogoutPage(page);
        await logout.navigateToLogoutPage();

    });




});
