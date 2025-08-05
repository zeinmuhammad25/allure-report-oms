import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";
import ProfilePage from "../../../src/modules/pld/profile/profile.page";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";

test.describe.serial("Branch List Test", () => {
    let branchList: BranchListPage;
    const tag = '@smokeTest @eso @branchList @searchBranch '

    test.beforeEach(async ({page}) => {
        branchList = new BranchListPage(page);
        await branchList.navigateHere();
        await branchList.wait(300)
    })

    test("Verify user can display the branch with the name Denny's Kasablanka",
        {tag: tag + '@positive'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.searchBranch("Denny's Kasablanka")
        })

    test("Verify user can display several branches with the name Ma",
        {tag: tag + '@positive'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.searchBranch("ma")
        })

    test("Verify user can display information that the branch is not available",
        {tag: tag + '@negative'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.searchEmptyBranch("XXX");
        })

    test("Verify user can display that there are several reachable branches",
        {tag: tag + '@positive'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.hasNearbyOutlet();
        })

    test("Verify user can display that there are several unreachable branches",
        {tag: tag + '@negative'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.hasOutReachOutlet();
        })
})






