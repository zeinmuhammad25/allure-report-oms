import {test} from "@playwright/test";
import RegisterPage from "../src/modules/pld/register/register.page";

test(`perform click TnC`, async ({page}) => {
    const registerPage = new RegisterPage(page);
    await registerPage.navigateHere();
    await registerPage.performClickTnC();
});