import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Branch Menu", () => {
    const tags = "@smokeTest @oms @BranchMenu";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205634] Validate tampilan halaman branch menu yang memiliki penambahan button filter"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
        await tableList.goHere();
        await signPin.closePopUpAlert();
        await sideNavBar.gotoPageBranchMenu();
    });

    test.afterEach(async ({}) => {

    });

    test("[TC_0205634] Validate tampilan halaman branch menu yang memiliki penambahan button filter",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 620ml", "name");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("A1 Ready To Sell");
                await branchMenu.validationMenu("New York Cheese Cake Dus", "short");
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("For Testing", "sub");
            }, {branchMenu}, testInfo);
        });

    test("[TC_0205635] Validate tampilan halaman branch menu pada setiap tab category menu memiliki filtering button",
        {tag: tags + "@positive"}, async ({branchMenu}, testInfo) => {
            await safeTest(async ({}) => {
                await branchMenu.filterCategoryBranchMenu("All Menu");
                await branchMenu.selectMenuCategory("Anggur");
                await branchMenu.validationMenu("[21+] Anggur Ketan Hitam OT 620ml", "name");
                await branchMenu.filterCategoryBranchMenu("Sold Out Menu");
                await branchMenu.selectMenuCategory("A1 Ready To Sell");
                await branchMenu.validationMenu("New York Cheese Cake Dus", "short");
                await branchMenu.filterCategoryBranchMenu("Limit Quantity Menu");
                await branchMenu.selectMenuCategory("Makanan Apri");
                await branchMenu.validationMenu("For Testing", "sub");
            }, {branchMenu}, testInfo);
        });


});