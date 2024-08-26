import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/core/login/login-page";

test('Login', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();
});