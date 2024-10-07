import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @visitingBranch '

    test("Verify user can successfully visit the branch via the branch list",
        {tag: tag + '@positive'}, async ({page}) => {
            let branchList = new BranchListPage(page);
            let modePage = new ModePage(page);
            await branchList.navigateHere();
            await branchList.wait(300);
            await branchList.searchBranch("Denny's Kasablanka");
            await branchList.selectBranch("Denny's Kasablanka");
            await modePage.performCheckInitialElements();
        })

    test("Verify user can successfully visit the branch via direct URL",
        {tag: tag + '@positive'}, async ({page}) => {
            let branchListPage = new BranchListPage(page);
            let modePage = new ModePage(page);
            await branchListPage.gotoPage(ModePage);
            await modePage.performCheckInitialElements();

        })
})




