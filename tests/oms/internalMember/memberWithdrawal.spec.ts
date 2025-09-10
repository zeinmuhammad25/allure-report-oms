import {test} from "../injection";
import {safeTest} from "../../../src/base/utils/safeTest";
import {MemberObject} from "../../../src/modules/oms/regularMemberDeposit/MemberObject";

test.setTimeout(100000);
test.describe.serial("Internal Member", () => {
    const tags = "@smokeTest @oms @InternalMemberWithdrawal";

    test.beforeEach(async ({terminalID, signPin, sideNavBar, tableList}) => {
        const testWithAuthentication = [
           "[TC_0205621] Add Withdrawal to member on Regular Member Withdrawal"
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
        await sideNavBar.gotoPageRegularMemberWithdrawal();
    });

    test.afterEach(async ({}) => {

    });
    test("[TC_0205621] Add Withdrawal to member on Regular Member Withdrawal",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.createMemberWithdrawal();
                await regularMemberWithdrawal.addRegularMemberNameList();
                await regularMemberWithdrawal.searchMemberList("REZA_CUSTOMER");
                await regularMemberWithdrawal.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberWithdrawal.paymentMemberCategoryType(MemberObject.CardCatMember);
                await regularMemberWithdrawal.paymentMethodMember(MemberObject.DebitBcaMember);
                await regularMemberWithdrawal.clearTotalWithdrawal();
                await regularMemberWithdrawal.inputTotalWithdrawal("50.000");
                await regularMemberWithdrawal.inputAdditionalInformation("WITHDRAWAL 50K");
                await regularMemberWithdrawal.saveWithdrawal();
            }, {regularMemberWithdrawal}, testInfo);
        });

});