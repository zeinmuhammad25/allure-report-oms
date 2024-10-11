import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import {Language} from "../../../src/modules/eso/objects/language";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";

test.describe.serial("Pick Up Test", () => {
    const tag = "@smokeTest @eso @pickUp @language ";
    let branchListPage: BranchListPage;
    let modePage: ModePage;
    let orderPage: OrderPage;

    test.beforeEach(async ({page}) => {
        branchListPage = new BranchListPage(page);
        modePage = new ModePage(page);
        orderPage = new OrderPage(page);

        await branchListPage.navigateHere();
        await branchListPage.wait(300);
        await branchListPage.searchBranch("Denny's Kasablanka");
        await branchListPage.selectBranch("Denny's Kasablanka");
        await modePage.performCheckInitialElements();
        await modePage.selectMode(EsoMode.PickUp);

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