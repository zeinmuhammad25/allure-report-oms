import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";
import {MemberObject} from "../../../src/modules/oms/regularMemberDeposit/MemberObject";

test.setTimeout(100000);
test.describe.serial("Internal Member", () => {
    const tags = "@smokeTest @oms @MemberDeposit";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205608] Add Deposit for member on Regular Member Deposit"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
            await tableList.goHere();
        }
        await signPin.closePopUpAlert();
        await sideNavBar.gotoPageRegularMemberDeposit();
    });

    test.afterEach(async ({}) => {

    });

    test("[TC_0205608] Add Deposit for member on Regular Member Deposit",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.createdMemberDeposit();
                await regularMemberDeposit.applyRegularMemberNameList();
                await regularMemberDeposit.searchMemberList("REZA_CUSTOMER");
                await regularMemberDeposit.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberDeposit.paymentMemberCategoryType(MemberObject.CashCatMember);
                await regularMemberDeposit.paymentMethodMember(MemberObject.CashPaymentMember);
                await regularMemberDeposit.inputTotalDeposit("100.000");
                await regularMemberDeposit.inputAdditionalInformation("TOPUP100K");
                await regularMemberDeposit.saveDeposit();
            }, {regularMemberDeposit}, testInfo);
        });

});