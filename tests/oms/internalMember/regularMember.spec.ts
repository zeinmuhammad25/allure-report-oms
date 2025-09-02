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


});