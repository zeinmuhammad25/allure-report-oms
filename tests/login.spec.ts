import {test} from "@playwright/test";
import LoginPage from "../src/modules/login/login.page";

test(`User log in with wrong email`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performWrongLogin();
});

test(`User forget password`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performForgetPassword();
});

test('User can log in and see the "Later" button on the dashboard', async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();

});



