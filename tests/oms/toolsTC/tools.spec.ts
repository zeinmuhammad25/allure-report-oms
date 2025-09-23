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

    test("[TC_0205716] Validate Logic when User can Activate Auto Sync POS in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataAutoSync();
                await synchronizeData.closePopUpAfterUpdate();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205717] Validate Logic when User can Deactivate Auto Sync POS in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataAutoSync();
                await synchronizeData.validationUnAutoSyncPOS();
                await synchronizeData.closePopUpAfterUpdate();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205718] Validate Logic when User can Select All Data in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataAll();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205719] Validate Logic when User can Select Branch Settings only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataBranchSetting();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205720] Validate Logic when User can Select Master Settings only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataMasterSetting();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205721] Validate Logic when User can Select Member only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataMember();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205722] Validate Logic when User can Select Menu only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataMenu();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205723] Validate Logic when User can Select Promotion only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataPromotion();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205724] Validate Logic when User can Select Sales only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataUser();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205725] Validate Logic when User can Select Table only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataTable();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205726] Validate Logic when User can Select User only in Synchronize Data sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, synchronizeData}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SynchronizeData);
                await synchronizeData.synchronizeDataUser();
                await synchronizeData.closePopUpAfterSync();
            }, {tools, synchronizeData}, testInfo);
        });

    test("[TC_0205727] Validate Logic when User can navigate to Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205728] Validate Logic when User can Sort Ascending Start Date Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Start Date");
                await promotionListTools.dataValidation("DISC LIMIT % MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205729] Validate Logic when User can Sort Ascending Start Date Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Start Date");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205730] Validate Logic when User can Sort Ascending End Date Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("End Date");
                await promotionListTools.dataValidation("31-12-2025 23:55");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205731] Validate Logic when User can Sort Descending End Date Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("End Date");
                await promotionListTools.dataValidation("22-06-2026 16:10");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205732] Validate Logic when User can Sort Ascending Min. Subtotal Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Min. Subtotal");
                await promotionListTools.dataValidation("Free Item Silver 2 - N");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205733] Validate Logic when User can Sort Descending Min. Subtotal Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Min. Subtotal");
                await promotionListTools.dataValidation("50.000");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205734] Validate Logic when User can Sort Ascending Discount Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Discount");
                await promotionListTools.dataValidation("BUY X GET FREE Y Category ACS");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205735] Validate Logic when User can Sort Descending Discount Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Discount");
                await promotionListTools.dataValidation("100.000");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205736] Validate Logic when User can Sort Ascending Type Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Type");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205737] Validate Logic when User can Sort Descending Type Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Type");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205738] Validate Logic when User can Sort Ascending Status Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Status");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205739] Validate Logic when User can Sort Descending Status Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Status");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205740] Validate Logic when User can navigate to the Next Page Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.dataValidation("DISCOUNT % MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205741] Validate Logic when User can navigate to the Previous Page Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("previous");
                await promotionListTools.dataValidation("FREE ITEM MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205742] Validate Logic when User can navigate to All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205743] Validate Logic when User can input Valid Search All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.searchPromotionList("BUY X GET FREE Y");
                await promotionListTools.dataValidation("BUY X GET FREE Y Category ACS");
                await promotionListTools.dataValidation("BUY X GET FREE Y ACS");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205744] Validate Logic when User input Invalid Search All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.searchPromotionList("asdasdweqweqw");
                await promotionListTools.dataValidation("asdasdweqweqw");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205745] Validate Logic when User can select Valid Date All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.clickFilterDate();
                await promotionListTools.datePickerFilterDate("1", "left");
                await promotionListTools.datePickerFilterDate("30", "left");
                await promotionListTools.applyDateInFilterDate();
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205746] Validate Logic when User can Select All Status All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus("all");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205747] Validate Logic when User can select Expired Status All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus("Expired");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205748] Validate Logic when User can select Ongoing Status All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus("Ongoing");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205749] Validate Logic when User can select Upcoming Status All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus("Upcoming");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205750] Validate Logic when User can select > 1 Status All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus(["Upcoming", "Ongoing"]);
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205751] Validate Logic when User can Reset filter All Promotions in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.searchPromotionList("SEPTEMBER SPECIAL DISCOUNT 50%");
                await promotionListTools.clickFilterDate();
                await promotionListTools.datePickerFilterDate("1", "left");
                await promotionListTools.datePickerFilterDate("30", "left");
                await promotionListTools.applyDateInFilterDate();
                await promotionListTools.showDropDown();
                await promotionListTools.setStatus(["Upcoming", "Ongoing"]);
                await promotionListTools.clearFilter();
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205752] Validate Logic when User can Sort Ascending Start Date All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Start Date");
                await promotionListTools.dataValidation("DISC LIMIT % MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205753] Validate Logic when User can Sort Descending Start Date All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Start Date");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205754] Validate Logic when User can Sort Ascending End Date All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("End Date");
                await promotionListTools.dataValidation("31-12-2025 23:55");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205755] Validate Logic when User can Sort Descending End Date All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("End Date");
                await promotionListTools.dataValidation("22-06-2026 16:10");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205756] Validate Logic when User can Sort Ascending Min. Subtotal All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Min. Subtotal");
                await promotionListTools.dataValidation("Free Item Silver 2 - N");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205757] Validate Logic when User can Sort Descending Min. Subtotal All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Min. Subtotal");
                await promotionListTools.dataValidation("50.000");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205758] Validate Logic when User can Sort Ascending Discount All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Discount");
                await promotionListTools.dataValidation("BUY X GET FREE Y Category ACS");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205759] Validate Logic when User can Sort Descending Discount Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Discount");
                await promotionListTools.dataValidation("100.000");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205760] Validate Logic when User can Sort Ascending Type All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Type");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205761] Validate Logic when User can Sort Descending Type Today's Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Type");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205762] Validate Logic when User can Sort Ascending Status All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingAscPromotionList("Status");
                await promotionListTools.dataValidation("FREE BUKAN SF");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205763] Validate Logic when User can Sort Descending Status All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.shortingDescPromotionList("Status");
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205764] Validate Logic when User can navigate to the Next Page All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("ALL PROMOTIONS");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.dataValidation("DISCOUNT % MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205765] Validate Logic when User can navigate to the Previous Page All Promotions list in Promotion List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, promotionListTools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.PromotionList);
                await promotionListTools.selectPromoCategoryFilter("TODAY'S PROMOTIONS");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("next");
                await promotionListTools.promotionListFormPagination("previous");
                await promotionListTools.dataValidation("FREE ITEM MENU CATEGORY DETAIL");
            }, {tools, promotionListTools}, testInfo);
        });

    test("[TC_0205766] Validate Logic when User can select Date Range Report Date in Reporting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Reporting);
                await tools.clickFilterDate();
                await tools.datePickerFilterDate("1", "left");
                await tools.applyDateInFilterDate();
                await tools.showDropDownReportType();
                await tools.setType("Print Sales By Menu Group");
                await tools.printReport();
                await tools.closePopUp();
            }, {tools}, testInfo);
        });

    test("[TC_0205767] Validate Logic when User can select Single Date Report Date in Reporting sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Reporting);
                await tools.clickFilterDate();
                await tools.datePickerFilterDate("1", "left");
                await tools.datePickerFilterDate("30", "left");
                await tools.applyDateInFilterDate();
                await tools.showDropDownReportType();
                await tools.setType("Print Sales By Menu Group");
                await tools.printReport();
                await tools.closePopUp();
            }, {tools}, testInfo);
        });

    test("[TC_0205768] Validate Logic when User can select Report Type",
        {tag: tags + "@positive"}, async ({tools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Reporting);
                await tools.clickFilterDate();
                await tools.datePickerFilterDate("1", "left");
                await tools.datePickerFilterDate("30", "left");
                await tools.applyDateInFilterDate();
                await tools.showDropDownReportType();
                await tools.setType("Print Sales By Menu Group");
                await tools.printReport();
                await tools.closePopUp();
            }, {tools}, testInfo);
        });

    test("[TC_0205769] Validate Logic when User cannot blank the Report Type",
        {tag: tags + "@positive"}, async ({tools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.Reporting);
                await tools.clickFilterDate();
                await tools.datePickerFilterDate("1", "left");
                await tools.datePickerFilterDate("30", "left");
                await tools.applyDateInFilterDate();
                await tools.printReport({printReport: true});
            }, {tools}, testInfo);
        });

    test("[TC_0205770] Validate Logic when User can Check for Update in Software Update sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.SoftwareUpdate);
                await tools.cekUpdate();
                await tools.closeUpdate();
            }, {tools}, testInfo);
        });

    test("[TC_0205771] Validate Logic when User can select Single Date in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.dataValidation("Open Printer");
                await branchEventList.clickDetailBranchEvent("Open Printer", 1);
                await branchEventList.closeDetailBranchEvent();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205772] Validate Logic when User can input Valid Ref Number in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.searchRefNumber("Saacs175645036369");
                await branchEventList.dataValidation("Saacs175645036369");
                await branchEventList.clickDetailBranchEvent("Saacs175645036369", 1);
                await branchEventList.closeDetailBranchEvent();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205773] Validate Logic when User can input Valid Ref Number in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.searchRefNumber("Saacs175645036369");
                await branchEventList.dataValidation("Saacs175645036369");
                await branchEventList.clickDetailBranchEvent("Saacs175645036369", 1);
                await branchEventList.closeDetailBranchEvent();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205774] Validate Logic when User cannot input Invalid Ref Number in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.searchRefNumber("Saacs175645036369asd");
                await branchEventList.dataValidation("Saacs175645036369asd");
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205775] Validate Logic when User can input Valid Event Subject in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.searchEventSubject("Push Data");
                await branchEventList.dataValidation("Push Data");
                await branchEventList.clickDetailBranchEvent("Push Data", 1);
                await branchEventList.closeDetailBranchEvent();
                await branchEventList.clickDetailBranchEvent("Push Data", 6);
                await branchEventList.closeDetailBranchEvent();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205776] Validate Logic when User can > 1 Filter in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("23");
                await branchEventList.searchRefNumber("16146");
                await branchEventList.searchEventSubject("Shift Out");
                await branchEventList.dataValidation("16146");
                await branchEventList.clickDetailBranchEvent("16146", 1);
                await branchEventList.closeDetailBranchEvent();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205777] Validate Logic when User can clear all Filter in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("23");
                await branchEventList.searchRefNumber("16146");
                await branchEventList.searchEventSubject("Shift Out");
                await branchEventList.clearFilter();
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205778] Validate Logic when User can sort Ascending Ref Number in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.shortingAscBranchEventList("Ref Number");
                await branchEventList.dataValidation("16134");
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205779] Validate Logic when User can sort Descending Ref Number in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.shortingDescBranchEventList("Ref Number");
                await branchEventList.dataValidation("Saacs175669152772");
            }, {tools, branchEventList}, testInfo);
        });

    test("[TC_0205780] Validate Logic when User can sort Ascending Event Subject in Branch Event List sub-tab menu on Tools",
        {tag: tags + "@positive"}, async ({tools, branchEventList}, testInfo) => {
            await safeTest(async ({}) => {
                await tools.selectTab(ToolsTabs.BranchEventList);
                await branchEventList.clickButtonFilterDate();
                await branchEventList.selectMonthAndYear("Choose month and year");
                await branchEventList.datePickerYear("2025");
                await branchEventList.datePickerMonth("SEP");
                await branchEventList.datePickerDate("1");
                await branchEventList.shortingAscBranchEventList("Event Subject");
                await branchEventList.dataValidation("Book Table");
            }, {tools, branchEventList}, testInfo);
        });

});