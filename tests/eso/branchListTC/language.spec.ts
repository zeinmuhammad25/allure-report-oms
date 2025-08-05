import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import {Language} from "../../../src/modules/eso/objects/language";

test.describe.serial("Branch List Test", () => {
    let branchList: BranchListPage;
    const tag = '@smokeTest @eso @branchList @language '

    test.beforeEach(async ({page}) => {
        branchList = new BranchListPage(page);
        await branchList.navigateHere();
        await branchList.wait(300);
    })

    test("Verify user can display that the language used in ESB Order Quick Service has successfully changed to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.changeLanguage(Language.Indonesia);
        })

    test("Verify user can display that the language used in ESB Order Quick Service has successfully changed to English",
        {tag: tag + '@positive'}, async ({page}) => {
            branchList = new BranchListPage(page);
            await branchList.changeLanguage(Language.Indonesia);
            await branchList.wait(300);
            await branchList.changeLanguage(Language.English);
        })
})
