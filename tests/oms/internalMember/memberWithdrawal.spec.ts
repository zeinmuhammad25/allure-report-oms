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

    test("[TC_0205626] Validate Filter Withdrawal history on Menu Regular Member Withdrawal",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.dataFilterValidation("DWaacs175749564565");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205627] Validate Withdrawal History with Search field on Regular Member Withdrawal List with Valid keywords",
        {tag: tags + "@positive"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.searchMemberWithdrawal("123qwe123");
                await regularMemberWithdrawal.dataFilterValidation("123qwe123");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205628] Validate Withdrawal History with Search field on Regular Member Withdrawal List with Invalid keywords",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.searchMemberWithdrawal("dfghgfdsfg");
                await regularMemberWithdrawal.dataFilterValidation("dfghgfdsfg");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205629] Validate keyword can be cleared from Search field on Regular Member Withdrawal List",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.searchMemberWithdrawal("REZA_CUSTOMER");
                await regularMemberWithdrawal.cancelSearchMemberWithdrawal();
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205630] Validate Regular Member Withdrawal List page can be navigated with next page button",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.withdrawalPagination("next");
                await regularMemberWithdrawal.dataFilterValidation("DWaacs175750146108");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205631] Validate Regular Member Withdrawal List page can be navigated with last page button",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.withdrawalPagination("last");
                await regularMemberWithdrawal.dataFilterValidation("DPRYH00000014");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205632] Validate Regular Member Withdrawal List page can be navigated with previous page button",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.withdrawalPagination("last");
                await regularMemberWithdrawal.withdrawalPagination("previous");
                await regularMemberWithdrawal.dataFilterValidation("123qwe123");
            }, {regularMemberWithdrawal}, testInfo);
        });

    test("[TC_0205633] Validate Regular Member Withdrawal List page can be navigated with first page button",
        {tag: tags + "@negative"}, async ({regularMemberWithdrawal}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberWithdrawal.clickFilterDate();
                await regularMemberWithdrawal.datePickerFilterDate("1", "left");
                await regularMemberWithdrawal.datePickerFilterDate("30", "left");
                await regularMemberWithdrawal.applyFilterDate();
                await regularMemberWithdrawal.withdrawalPagination("last");
                await regularMemberWithdrawal.withdrawalPagination("first");
                await regularMemberWithdrawal.dataFilterValidation("REZA_STAFF");
            }, {regularMemberWithdrawal}, testInfo);
        });


});