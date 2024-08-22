import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import BranchPage from "../../../src/modules/pld/accountSetting/branch/branch.page";
import BranchTabMainPage from "../../../src/modules/pld/accountSetting/branch/branchTabs/branchTabMain.page";
import BranchTabTransactionPage
    from "../../../src/modules/pld/accountSetting/branch/branchTabs/branchTabTransaction/branchTabTransaction.page";


test.describe.serial('Printer Tests', () => {
    let loginPage: LoginPage;


    test.beforeEach(async ({page}) => {
        loginPage = new LoginPage(page);
        await loginPage.navigateHere();
        await loginPage.performLoginSubs();
    });


    test('Verify if user clean up data', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        const branchPage = new BranchPage(page);
        await branchPage.navigateToBranchSetting();
        await branchPage.cleanUpBranchData();
    });

    test('Verify if user can edit branch in main tab', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        const branchPage = new BranchPage(page);
        await branchPage.navigateToBranchSetting();
        await branchPage.searchBranchData();
        const branchMainTabPage = new BranchTabMainPage(page);
        await branchMainTabPage.performEditBranchName();
        await branchPage.searchBranchDataEdit();
        await branchMainTabPage.performResetBranchName();
    });

    test('Verify if only cash is checked ', {tag: '@smokeTest, @accountSetting'}, async ({page}) => {
        const branchPage: BranchPage = new BranchPage(page);
        const branchTabTransaction: BranchTabTransactionPage = new BranchTabTransactionPage(page);
        await branchPage.navigateToBranchSetting();
        await branchPage.searchBranchData();
        await branchTabTransaction.navigateToBranchTab()
        await branchTabTransaction.makeSureOnlyCashChecked();

    });


});
