import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import LogoutPage from "../../src/modules/pld/account/logout/logout.page";
import BranchPage from "../../src/modules/pld/accountSetting/branch/branch.page";
import PrinterPage from "../../src/modules/pld/printerSetting/printer/printer.page";
import PrinterCreatePage from "../../src/modules/pld/printerSetting/printer/printerCreate/printerCreate.page";
import BrandPage from "../../src/modules/pld/accountSetting/brand/brand.page";
import DashboardPage from "../../src/modules/pld/dashboard/dashboard.page";
import ProfilePage from "../../src/modules/pld/profile/profile.page";


test.describe.serial('Demo Test Case', () => {
    let loginPage: LoginPage;


    test('aaaa', {tag: '@demoTest, @accountDemo'}, async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();

        await loginPage.gotoPage(DashboardPage)
            .then(page => page.gotoPage(BrandPage))
            .then(page => page.gotoPage(PrinterPage))
            .then(page => page.gotoPage(BranchPage))
            .then(page => page.gotoPage(PrinterCreatePage))
            .then(page => page.gotoPage(ProfilePage))

    });

});
