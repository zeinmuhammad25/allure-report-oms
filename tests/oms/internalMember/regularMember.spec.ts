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


});