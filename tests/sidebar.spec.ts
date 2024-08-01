import {test} from "@playwright/test";
import SidebarPage from "../src/modules/dashboard/sidebar.page";
import LoginPage from "../src/modules/login/login.page";


test(`User can close and open sidebar`, async ({page}) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateHere();
    await loginPage.performLogin();

    const sidebarPage = new SidebarPage(page);
    await sidebarPage.closeSidebar();
    await sidebarPage.openSidebar();
});
