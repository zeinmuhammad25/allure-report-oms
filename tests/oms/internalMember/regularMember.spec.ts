import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Internal Member", () => {
    const tags = "@smokeTest @oms @Internal Member";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205594] Validate Edit from Detail member on Regular Member List"
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
        await sideNavBar.gotoPageRegularMember();
    });

    test.afterEach(async ({}) => {

    });

    test("[TC_0205594] Validate Edit from Detail member on Regular Member List",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("MRM0001");
                await regularMember.selectAndEditMember("MRM0001");
                await regularMember.inputFormMemberName({}, "TEST MEMBER AT 1");
                await regularMember.selectFormGander("Male");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.inputFormPhone({}, "12345678964");
                await regularMember.inputFormEmail({}, "test@esb.co.id");
                await regularMember.inputFormAddress({}, "TEST ESB AT MEMBER");
                await regularMember.updateRegularMember();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205595] Validate Cancel Edit from Detail member on Regular Member List",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("DPRYH00000014");
                await regularMember.selectAndEditMember("DPRYH00000014");
                await regularMember.inputFormMemberName({}, "TEST MEMBER AT 1");
                await regularMember.selectFormGander("Male");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.inputFormPhone({}, "12345678964");
                await regularMember.inputFormEmail({}, "test@esb.co.id");
                await regularMember.inputFormAddress({}, "TEST ESB AT MEMBER");
                await regularMember.cancelCreateAndUpdateMember();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205596] Validate Search member on Regular Member List with Valid keywords",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("WGG00000025");
                await regularMember.validationMember("WGG00000025");
                await regularMember.cancelSearchRegularMember();
                await regularMember.searchRegularMember("aaaaaaaaaaaaa");
                await regularMember.validationMember("aaaaaaaaaaaaa");
                await regularMember.cancelSearchRegularMember();
                await regularMember.searchRegularMember("Jalan jaya asri makmur");
                await regularMember.validationMember("Jalan jaya asri makmur");
                await regularMember.cancelSearchRegularMember();
                await regularMember.searchRegularMember("89630653365");
                await regularMember.validationMember("89630653365");
                await regularMember.cancelSearchRegularMember();
                await regularMember.searchRegularMember("Yohan@gmail.com");
                await regularMember.validationMember("Yohan@gmail.com");
                await regularMember.cancelSearchRegularMember();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205597] Validate Search member on Regular Member List with Valid keywords",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("ASDASDA242342356234SDFS3");
                await regularMember.validationMember("ASDASDA242342356234SDFS3");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205598] Validate detail member can be checked from Search field on Regular Member List",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("WGG00000025");
                await regularMember.selectAndEditMember("WGG00000025");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205599] Validate keyword can be cleared from Search field on Regular Member List",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.searchRegularMember("Anwar");
                await regularMember.cancelSearchRegularMember();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205600] Validate Regular Member List page can be navigated with next page button",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.memberPagination("next");
                await regularMember.memberPagination("next");
                await regularMember.validationMember("OTD0010");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205601] Validate Regular Member List page can be navigated with last page button",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.memberPagination("last");
                await regularMember.validationMember("WGG00000025");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205602] Validate Regular Member List page can be navigated with previous page button",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.memberPagination("next");
                await regularMember.memberPagination("next");
                await regularMember.memberPagination("previous");
                await regularMember.validationMember("AdibTestOnline1");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205603] Validate Regular Member List page can be navigated with last page button",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.memberPagination("last");
                await regularMember.memberPagination("first");
                await regularMember.validationMember("AGDB00000001");
            }, {regularMember}, testInfo);
        });

    test("[TC_0205604] Create member on Regular Member page",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.createdRegularMember();
                await regularMember.inputFormMemberName({}, "TEST CREATE MEMBER AT 2");
                await regularMember.selectFormGander("Male");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.inputFormPhone({}, "12345678964");
                await regularMember.inputFormEmail({}, "test@esb.co.id");
                await regularMember.inputFormAddress({}, "TEST ESB AT MEMBER");
                await regularMember.saveRegularMember();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205605] Validate Mandatory field when Create member on Regular Member Page",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.createdRegularMember();
                await regularMember.inputFormMemberName({}, "");
                await regularMember.selectFormGander("");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.inputFormPhone({}, "12345678964");
                await regularMember.inputFormEmail({}, "test@esb.co.id");
                await regularMember.inputFormAddress({}, "TEST ESB AT MEMBER");
                await regularMember.saveRegularMember();
            }, {regularMember}, testInfo);
        });


    test("[TC_0205606] Validate Clear Birth Date on Regular Member Page",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.createdRegularMember();
                await regularMember.inputFormMemberName({}, "TEST CREATE MEMBER AT 2");
                await regularMember.selectFormGander("Male");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.removeBirthDate();
            }, {regularMember}, testInfo);
        });

    test("[TC_0205607] Validate Cancel Create member on Regular Member page",
        {tag: tags + "@positive"}, async ({regularMember}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMember.createdRegularMember();
                await regularMember.inputFormMemberName({}, "TEST CREATE MEMBER AT 2");
                await regularMember.selectFormGander("Male");
                await regularMember.clickButtonDate();
                await regularMember.selectMonthAndYear("Choose month and year");
                await regularMember.datePickerYear("2025");
                await regularMember.datePickerMonth("JAN");
                await regularMember.datePickerDate("1");
                await regularMember.inputFormPhone({}, "12345678964");
                await regularMember.inputFormEmail({}, "test@esb.co.id");
                await regularMember.inputFormAddress({}, "TEST ESB AT MEMBER");
                await regularMember.cancelCreateAndUpdateMember();
            }, {regularMember}, testInfo);
        });

});