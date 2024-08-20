import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import ProfilePage from "../../../src/modules/pld/profile/profile.page";

test(`User can change user name`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLoginSubs();

    const profilePage = new ProfilePage(page);
    await profilePage.changeUsername();
});



