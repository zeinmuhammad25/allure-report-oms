import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";

test.describe.serial("Delivery Test", () => {
    const tag = "@smokeTest @eso @delivery @applyMembership ";

    test.beforeEach(async ({page}) => {
        let branchListPage = new BranchListPage(page);
        let modePage = new ModePage(page);

        await branchListPage.navigateHere();
        await branchListPage.wait(300);
        await branchListPage.searchBranch("Denny's Kasablanka");
        await branchListPage.selectBranch("Denny's Kasablanka");
        await modePage.selectMode(EsoMode.Delivery);
        await modePage.performCheckInitialElements();
    });

    test("Verify user can successfully apply membership loop in delivery mode",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderPage = new OrderPage(page);

            const phoneNumber = "083806992528";
            const password = "abcd123";

            await orderPage.performApplyMembershipSubs(phoneNumber, password);
        });

    test("Verify user cannot apply membership loop",
        {tag: tag + "@negative"}, async ({page}) => {
            let orderPage = new OrderPage(page);
            const invalidPhoneNumber = "084806992528";
            const password = "abcd123";

            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitWithExpectationFailedResult();
        });

});
