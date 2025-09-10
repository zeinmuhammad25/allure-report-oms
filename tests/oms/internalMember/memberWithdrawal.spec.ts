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

    test("[TC_0205622] Validate Mandatory field when Add Withdrawal to member on Regular Member Withdrawal",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.createMemberWithdrawal();
                await regularMemberWithdrawal.clearTotalWithdrawal();
                await regularMemberWithdrawal.inputAdditionalInformation("WITHDRAWAL 50K");
                await regularMemberWithdrawal.saveWithdrawal({member: true, paymentMethod: true, amount: true});
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205623] Validate Button Clear for Total Withdrawal with manual input on Regular Member Withdrawal",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.createMemberWithdrawal();
                await regularMemberWithdrawal.addRegularMemberNameList();
                await regularMemberWithdrawal.searchMemberList("REZA_CUSTOMER");
                await regularMemberWithdrawal.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberWithdrawal.paymentMemberCategoryType(MemberObject.CardCatMember);
                await regularMemberWithdrawal.paymentMethodMember(MemberObject.DebitBcaMember);
                await regularMemberWithdrawal.clearTotalWithdrawal();
                await regularMemberWithdrawal.inputTotalWithdrawal("100.000");
                await regularMemberWithdrawal.clearTotalWithdrawal();
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205624] Validate Button Clear for Total Withdrawal with Button Deposit Amount on Regular Member Withdrawal",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.createMemberWithdrawal();
                await regularMemberWithdrawal.addRegularMemberNameList();
                await regularMemberWithdrawal.searchMemberList("REZA_CUSTOMER");
                await regularMemberWithdrawal.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberWithdrawal.paymentMemberCategoryType(MemberObject.CashCatMember);
                await regularMemberWithdrawal.paymentMethodMember(MemberObject.CashPaymentMember);
                await regularMemberWithdrawal.clearTotalWithdrawal();
                await regularMemberWithdrawal.selectWithdrawalBoard(MemberObject.GridMemberBoard100000, 1);
                await regularMemberWithdrawal.clearTotalWithdrawal();
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205625] Validate Cancel Withdrawal on Regular Member Withdrawal",
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
                await regularMemberWithdrawal.cancelWithdrawal();
            }, {regularMemberWithdrawal}, testInfo);
        });

});