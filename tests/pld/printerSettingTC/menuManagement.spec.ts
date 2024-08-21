import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import MenuManagementPage from "../../../src/modules/pld/printerSetting/menuManagement/menuManagement.page";
import MenuManagementEditPage
    from "../../../src/modules/pld/printerSetting/menuManagement/menuManagementEdit/menuManagementEdit.page";


test.describe.serial('menuManagement Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify if user can edit menuManagement', {tag: '@smokeTest, @printerSetting'}, async ({page}) => {
        const menuManagementPage = new MenuManagementPage(page);
        await menuManagementPage.navigateToManagement();
        await menuManagementPage.navigateToMenuManagementEdit();
        const menuManagementEditPage = new MenuManagementEditPage(page);
        await menuManagementEditPage.setOutOfStockTrue();

    });


});
