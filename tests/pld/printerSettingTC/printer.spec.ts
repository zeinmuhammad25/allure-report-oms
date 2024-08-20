import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PrinterPage from "../../../src/modules/pld/printerSetting/printer/printer.page";
import PrinterCreatePage from "../../../src/modules/pld/printerSetting/printer/printerCreate/printerCreate.page";


test.describe.serial('Printer Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify if user can Add Printer', {tag: '@smokeTest, @printerSetting'}, async ({page}) => {
        const printerPage = new PrinterPage(page);
        await printerPage.navigateToPrinter();
        await printerPage.performAddPrinter();

        const printerCreatePage = new PrinterCreatePage(page);
        await printerCreatePage.printerFormFill();
    });

    test('Verify if user can delete Printer', {tag: '@smokeTest, @printerSetting'}, async ({page}) => {
        const printerPage = new PrinterPage(page);
        await printerPage.navigateToPrinter();
        await printerPage.performSearchPrinter();
        await printerPage.performDeletePrinter();
    });

});
