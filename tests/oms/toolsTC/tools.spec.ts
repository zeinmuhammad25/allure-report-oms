import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";
import {ToolsTabs} from "../../../src/modules/oms/tools/ToolsTabs";

test.setTimeout(100000);
test.describe.serial("Tools", () => {
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

    test("[TC_0205689] Validate Logic when User can Test Print All Station by check - Select All - in Troubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.setStation(["KASIR", "CHECKER"], true);
                await troubleshoot.setStation("all");
                await troubleshoot.testPrint();
                await troubleshoot.closePopUpTroubleShoot();
            }, {tools, troubleshoot}, testInfo);
        });

    test("[TC_0205690] Validate Logic when User can Test Print All Station manually in Troubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.setStation(["KASIR", "CHECKER"], true);
                await troubleshoot.setStation(["KASIR", "CHECKER"]);
                await troubleshoot.testPrint();
                await troubleshoot.closePopUpTroubleShoot();
            }, {tools, troubleshoot}, testInfo);
        });

    test("[TC_0205691] Validate Logic when User can Test Print KASIR only in Troubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.setStation(["KASIR", "CHECKER"], true);
                await troubleshoot.setStation(["KASIR"]);
                await troubleshoot.testPrint();
                await troubleshoot.closePopUpTroubleShoot();
            }, {tools, troubleshoot}, testInfo);
        });

    test("[TC_0205692] Validate Logic when User can Test Print Checker only in Troubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.setStation(["KASIR", "CHECKER"], true);
                await troubleshoot.setStation(["CHECKER"]);
                await troubleshoot.testPrint();
                await troubleshoot.closePopUpTroubleShoot();
            }, {tools, troubleshoot}, testInfo);
        });

    test("[TC_0205693] Validate Logic when User cannot Test Print while not selecting any Stations in Toubleshoot sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, troubleshoot}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Troubleshoot);
                await troubleshoot.setStation(["KASIR", "CHECKER"], true);
                await troubleshoot.testPrintDisabled();
            }, {tools, troubleshoot}, testInfo);
        });

    test("[TC_0205694] Validate Logic when User can Select Default Station in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetStation("KASIR");
                await applicationSetting.saveSetting();
            }, {tools, applicationSetting}, testInfo);
        });

});