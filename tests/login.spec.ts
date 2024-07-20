import {expect, test} from "@playwright/test";
import LoginPage from "../src/modules/login/login-page";
import Urls from "../src/configs/urls";
import DashboardLocator from "../src/modules/dashboard/dashboard-locator";

require('dotenv');

test('User can log in and see the "Later" button on the dashboard', async ({page}) => {
    const loginPage = new LoginPage(page);

    // Navigate to the login page
    await loginPage.navigateHere();

    // Perform login
    await loginPage.login();

    // Wait for the dashboard page is loaded
    await page.waitForURL(`${process.env.BASE_URL}${Urls.dashboard}`);

    // Verify "Nanti Saja" button
    const buttonLater = await page.waitForSelector(DashboardLocator.buttonLater);
    expect(buttonLater).toBeTruthy();
});
