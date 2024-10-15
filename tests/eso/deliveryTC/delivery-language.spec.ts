import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import {Language} from "../../../src/modules/eso/objects/language";

test.describe.serial("Delivery Test", () => {
    const tag = "@smokeTest @eso @delivery @language ";

    let orderPage: OrderPage;

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        let modePage = new ModePage(page);
        orderPage = new OrderPage(page);

        const branchName = "Denny's Kasablanka";

        await branchList.navigateHere();
        await branchList.wait(300);
        await branchList.searchBranch(branchName);
        await branchList.selectBranch(branchName);
        await modePage.performCheckInitialElements();
        await modePage.selectMode(EsoMode.Delivery);
    });

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + "@positive"}, async ({page}) => {
            await orderPage.openSideBar();
            await orderPage.changeLanguage(Language.Indonesia);
        });

    test("Verify user can successfully set the language to English",
        {tag: tag + "@positive"}, async ({page}) => {
            await orderPage.openSideBar();
            await orderPage.changeLanguage(Language.Indonesia);
            await orderPage.openSideBar();
            await orderPage.changeLanguage(Language.English);
        });
});
