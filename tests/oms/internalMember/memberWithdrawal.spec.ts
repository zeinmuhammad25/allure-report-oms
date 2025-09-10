import {test} from "../injection";

test.setTimeout(100000);
test.describe.serial("Internal Member", () => {
    const tags = "@smokeTest @oms @InternalMemberWithdrawal";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
        await tableList.goHere();
        await signPin.closePopUpAlert();
        await sideNavBar.gotoPageRegularMemberDeposit();
    });

    test.afterEach(async ({}) => {

    });


});