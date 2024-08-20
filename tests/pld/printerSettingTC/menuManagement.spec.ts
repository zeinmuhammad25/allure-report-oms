import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import MenuManagementPage from "../../../src/modules/pld/printerSetting/menuManagement/menuManagement.page";

test.describe.serial('Printer Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify if user can edit menuManagement', {tag: '@smokeTest, @printerSetting'}, async ({page}) => {
        const menuManagementPage = new MenuManagementPage(page);
        await menuManagementPage.navigateToManagement();
        await menuManagementPage.managementMenuSearch();
        await menuManagementPage.managementMenuEdit();

    });


});
