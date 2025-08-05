import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Delivery Test", () => {
    const tag = "@smokeTest @eso @delivery @login ";

    const phoneNumber = process.env.ESO_LOOP_MEMBER_USER;
    const password = process.env.ESO_LOOP_MEMBER_PASS;

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
        await modePage.selectMode(EsoMode.Delivery);
        await modePage.performCheckInitialElements();
        await orderPage.openSideBar();

    });

    test("Verify user can successfully access the delivery page using a guest account",
        {tag: tag + "@positive"}, async ({page}) => {
            // Already done in test before each
        });

    test("Verify user can successfully log in to ESB order in delivery mode using a membership loop account",
        {tag: tag + "@positive"}, async ({page}) => {
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user can successfully log in to Ayomakan and access delivery mode",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Login
            // 1. Kunjungi web ayomakan dan login ayomakan
            // 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan delievry diayomakan
            // 4. Verifiksi login berhasil
            // Blocker :
            // dependency ayomakan
        });

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + "@negative"}, async ({page}) => {
            const invalidPhoneNumber = "083806992527";

            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.closeMembershipLoop();
        });
});
