import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import ProfilePage from "../../../src/modules/pld/profile/profile.page";


test.describe.serial('Test Profile', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });

    test(`Verify if user can change username on by click Ubah button`, async ({page}) => {
        const profilePage = new ProfilePage(page);
        await profilePage.userNameChange();
    });

    test(`Verify if user can change username directly on the field`, async ({page}) => {
        const profilePage = new ProfilePage(page);
        await profilePage.userNameChangeDirect();
    });

});