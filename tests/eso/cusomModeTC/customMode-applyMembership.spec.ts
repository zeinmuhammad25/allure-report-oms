import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Custom Mode Test", () => {
    const tag = "@smokeTest @eso @customMode @applyMembership ";


    let orderPage: OrderPage;

    const branchName = "Denny's Kasablanka";

    test.beforeEach(async ({page}) => {

        let branchList = new BranchListPage(page);
        let modePage = new ModePage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
        await branchList.searchBranch(branchName);
        await branchList.selectBranch(branchName);
        await modePage.performCheckInitialElements();
        await modePage.selectMode(EsoMode.Custom);
        await orderPage.inputRoom("Meeting Room");
        await orderPage.openSideBar();
        await orderPage.openMembershipForm();
    });

    test("Verify user can successfully apply membership loop in custom mode",
        {tag: tag + "@positive"}, async ({page}) => {
            const phoneNumber = "083806992528";
            const password = "abcd123";

            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user cannot apply membership loop",
        {tag: tag + "@negative"}, async ({page}) => {

            const invalidPhoneNumber = "0838";
            const password = "abcd123";

            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.expectInvalidInputOnApplyMembership();
        });
});