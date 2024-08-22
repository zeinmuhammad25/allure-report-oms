import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import LogoutPage from "../../src/modules/pld/account/logout/logout.page";
import BranchPage from "../../src/modules/pld/accountSetting/branch/branch.page";


test.describe.serial('Demo Test Case', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test('Verify if user can access logout page', {tag: '@demoTest, @accountDemo'}, async ({page}) => {
        const logout = new LogoutPage(page);
        await logout.navigateToLogoutPage();

    });

    test('Verify if user can access branch page ', {tag: '@demoTest, @branchDemo'}, async ({page}) => {
        const branch = new BranchPage(page);
        await branch.navigateToBranchSetting();
        await branch.performBranchElementCheck();

    });


});
