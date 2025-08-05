import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Pick Up Test", () => {
    const tag = "@smokeTest @eso @pickUp @login ";

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
        await modePage.selectMode(EsoMode.PickUp);
        await modePage.performCheckInitialElements();
        await orderPage.openSideBar();
    });

    test("Verify user can successfully navigate to the pickup page using guest mode",
        {tag: tag + "@positive"}, async ({page}) => {
            // Already done in test before each
        });


    test("Verify user can successfully login to ESB order pickup mode using Membership Loop account",
        {tag: tag + "@positive"}, async ({page}) => {
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user can successfully login to Ayomakan and open pickup mode",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Login
            // 1. Kunjungi web ayomakan
            // 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan pickup diayomakan
            // 4. Verifiksi login berhasil
            // Blocker :
            // dependency ayomakan
        });

    test("Verify user cannot login using Membership Loop account",
        {tag: tag + "@negative"}, async ({page}) => {
            const invalidPhoneNumber = "083806992526";

            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.closeMembershipLoop();
        });
});