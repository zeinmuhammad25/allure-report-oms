import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Custom Mode Test", () => {
    const tag = "@smokeTest @eso @customMode @login ";
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
        await modePage.selectMode(EsoMode.Custom);
        await orderPage.inputRoom("Meeting room");
        await orderPage.openSideBar();
    });

    test("Verify user can successfully access the custom page using a guest account",
        {tag: tag + "@positive"}, async ({page}) => {
            // Already done in test before each
        });

    test("Verify user can successfully log in to ESB order in custom mode using a membership loop account",
        {tag: tag + "@positive"}, async ({page}) => {
            const phoneNumber = "083806992528";
            const password = "abcd123";
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user can successfully log in to Ayomakan and access custom mode",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Login
            // 1. Kunjungi web ayomakan dan login ayomakan
            // 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan custome diayomakan
            // 4. Verifiksi login berhasil
        });

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + "@negative"}, async ({page}) => {
            const phoneNumber = "083806992528";
            const password = "abcd123";
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.closeMembershipLoop();
        });
});