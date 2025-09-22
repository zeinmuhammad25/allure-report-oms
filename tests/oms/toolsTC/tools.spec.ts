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
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205695] Validate Logic when User can Select QR Code Scanner Mode in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetQrCodeScanner("Device Camera");
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205696] Validate Logic when User can Input Valid Timer First Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userFirstWaringTime({}, 1);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205697] Validate Logic when User cannot Input alphabeth Timer First Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userFirstWaringTime({}, "asdasda");
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205698] Validate Logic when User cannot Input symbol Timer First Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userFirstWaringTime({}, "!@$#@#$#@#$%$#$%");
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205699] Validate Logic when User can Input Valid Timer Second Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSecondWaringTime({}, 10);
                await applicationSetting.saveSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205700] Validate Logic when User cannot Input alphabeth Timer Second Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSecondWaringTime({}, "oiwejdjksuoekjsdudfjaduoadsjadsioadljadipadskladsip");
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205701] Validate Logic when User cannot Input symbol Timer Second Warning in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSecondWaringTime({}, "_)(*&^%$#$%^&*()(*&%$#");
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205702] Validate Logic when User can Select Sales Mode for Dine-In in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.showDropDownDineISalesMode();
                await applicationSetting.userDineInSalesMode(["AT INCLUSIVE", "AT EXCLUSIVE"]);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205703] Validate Logic when User can Deselect all Sales Mode for Dine-In in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.showDropDownDineISalesMode();
                await applicationSetting.userDineInSalesMode(["AT INCLUSIVE", "AT EXCLUSIVE"]);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205704] Validate Logic when User can Select Sales Mode for Quick Service in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.showDropDownQuickServiceSalesMode();
                await applicationSetting.userQuickServiceSalesMode(["AT INCLUSIVE", "AT EXCLUSIVE"]);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205705] Validate Logic when User can Deselect all Sales Mode for Quick Service in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.showDropDownQuickServiceSalesMode();
                await applicationSetting.userQuickServiceSalesMode(["AT INCLUSIVE", "AT EXCLUSIVE"]);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205706] Validate Logic when User can Activate Direct Serving in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetDirectServing();
                await applicationSetting.userHideNotesSetDirectServing();
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205707] Validate Logic when User can Deactivate Direct Serving in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetDirectServing();
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205708] Validate Logic when User can Activate Customer Display in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.setCustomerDisplay("Pole Display");
                await applicationSetting.inputLengthPoleDisplay({}, 3);
                await applicationSetting.inputPortPoleDisplay({}, 3);
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205709] Validate Logic when User can Deactivate Customer Display in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.setCustomerDisplay("OFF");
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205710] Validate Logic when User can Activate ESO Server in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetSelfOrderServer();
                await applicationSetting.dropDownSelfOrderServer();
                await applicationSetting.userSetSelfOrderServerStation("CHECKER");
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205711] Validate Logic when User can Deactivate ESO Server in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetSelfOrderServer();
                await applicationSetting.saveSetting();
                await applicationSetting.userOffSelfOrderServerStation();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205712] Validate Logic when User can Select ESO Printer Station in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.userSetSelfOrderServer();
                await applicationSetting.dropDownSelfOrderServer();
                await applicationSetting.userSetSelfOrderServerStation("KASIR");
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205713] Validate Logic when User cannot Deselect ESO Printer Station in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.dropDownSelfOrderServer();
                await applicationSetting.userSetSelfOrderServerStation("No Print");
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205714] Validate Logic when User can Activate On-Screen Keyboard in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.UserShowOnScreenKeyboard();
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });

    test("[TC_0205715] Validate Logic when User can Deactivate On-Screen Keyboard in Application Setting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, applicationSetting}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.ApplicationSetting);
                await applicationSetting.UserShowOnScreenKeyboard();
                await applicationSetting.saveSetting();
                await applicationSetting.closePopUpApplicationSetting();
            }, {tools, applicationSetting}, testInfo);
        });


});