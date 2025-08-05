import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";

test.describe.serial("Delivery Later Test", () => {
    const tag = "@smokeTest @eso @deliveryLater @applyMembership ";
    const phoneNumber = process.env.ESO_LOOP_MEMBER_USER;
    const password = process.env.ESO_LOOP_MEMBER_PASS;

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

    test("Verify user can successfully apply membership loop in delivery later mode",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderPage = new OrderPage(page);
            await orderPage.performApplyMembershipSubs(phoneNumber, password);
        });

    test("Verify user cannot apply membership loop",
        {tag: tag + "@negative"}, async ({page}) => {
            let orderPage = new OrderPage(page);
            const invalidPhoneNumber = "084806992528";

            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitWithExpectationFailedResult();
        });
});
