import {test} from "@playwright/test";
import LoginPage from "../src/modules/pld/login/login.page";
import PrinterPage from "../src/modules/pld/printerSetting/printer/printer.page";

test(`ClickPrinter`, {tag: '@printerSetting',}, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLoginSubs();
    const printerPage   = new  PrinterPage(page);
    await printerPage.performAddPrinter();

});



