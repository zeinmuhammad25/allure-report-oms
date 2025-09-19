import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";
import {ToolsTabs} from "../../../src/modules/oms/tools/ToolsTabs";

test.setTimeout(100000);
test.describe.serial("Branch Menu", () => {
    const tags = "@smokeTest @oms @Tools";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205688] Validate Logic when User can Test Print Menu/Bill in Troubleshoot sub-tab menu on Tools"
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
        await sideNavBar.gotoPageTools();
    });

    test.afterEach(async ({}) => {

    });

    test("[TC_0205688] Validate Logic when User can Test Print Menu/Bill in Troubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.openDrawerTest();
                await troubleshoot.closePopUpTroubleShoot();
            }, {tools, troubleshoot}, testInfo);
        });

});