import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PrinterPage from "../../../src/modules/pld/printerSetting/printer/printer.page";
import LogoutPage from "../../../src/modules/pld/account/logout/logout.page";
import PrinterCreatePage from "../../../src/modules/pld/printerSetting/printer/printerCreate/printerCreate.page";

test.describe('TC-printerSetting', {tag: '@printerSetting'}, () => {
    test(`Verify if user can Add Printer`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
        const printerPage = new PrinterPage(page);
        await printerPage.navigateToPrinter();
        await printerPage.performAddPrinter();
        const printerCreatePage = new PrinterCreatePage(page);
        await printerCreatePage.printerFormFill();
    })
    test(`Verify if user can delete Printer`, async ({page}) => {
        const loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
        const printerPage = new PrinterPage(page);
        await printerPage.navigateToPrinter();
        await printerPage.performSearchPrinter();
        // await printerPage.performDeletePrinter();
        const logoutPage = new LogoutPage(page);
        await logoutPage.performLogout();
    })
})









