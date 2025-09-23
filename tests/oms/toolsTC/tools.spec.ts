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

    test("[TC_0205731] Validate Logic when User can Sort Ascending End Date Today's Promotions list in Promotion List sub-tab menu on Tools",
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
                await promotionListTools.datePickerFilterDate("1","left");
                await promotionListTools.datePickerFilterDate("30","left");
                await promotionListTools.applyDateInFilterDate();
                await promotionListTools.dataValidation("SEPTEMBER SPECIAL DISCOUNT 50%");
            }, {tools, promotionListTools}, testInfo);
        });


});