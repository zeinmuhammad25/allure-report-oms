import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Pick Up Test", () => {
    const tag = "@smokeTest @eso @pickUp @applyMembership ";


    test.beforeEach(async ({page}) => {
        let branchListPage = new BranchListPage(page);
        let modePage = new ModePage(page);

        await branchListPage.navigateHere();
        await branchListPage.wait(300);
        await branchListPage.searchBranch("Denny's Kasablanka");
        await branchListPage.selectBranch("Denny's Kasablanka");
        await modePage.selectMode(EsoMode.PickUp);
        await modePage.performCheckInitialElements();

    });

    test("Verify user can successfully apply Membership Loop in pickup mode",
        {tag: tag + "@positive"}, async ({page}) => {
            const validPhone = "083806992528";
            const password = "abcd123";

            let orderPage = new OrderPage(page);
            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(validPhone);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user cannot apply Membership Loop",
        {tag: tag + "@negative"}, async ({page}) => {
            const invalidPhone = "083806944444";
            const password = "abcd123";

            let orderPage = new OrderPage(page);
            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhone);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitWithExpectationFailedResult();
        });

});
