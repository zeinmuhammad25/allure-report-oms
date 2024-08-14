import {test} from "@playwright/test";
import LoginPage from "../../src/modules/pld/login/login.page";
import PrinterPage from "../../src/modules/pld/printerSetting/printer/printer.page";

test.describe('TC-login', { tag: '@login' }, ()   => {
    test(`Verify if user can't log in with wrong email`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performWrongLogin();
    });
    test(`Verify if user can't log in with wrong password`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performForgetPassword();
    });
    test('Verify if user can log in with valid credential', async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();

    });

})

test.describe('TC-printerSetting', { tag: '@print' }, ()   => {
    test(`Verify if user can't log in with wrong email`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
        const printerPage = new PrinterPage(page);
        await printerPage.performAddPrinter();
    })
})









