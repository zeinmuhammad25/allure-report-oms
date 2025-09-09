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
        await tableList.goHere();
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

    test("[TC_0205609] Validate Mandatory field when Add Deposit for member on Regular Member Deposit",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.createdMemberDeposit();
                await regularMemberDeposit.inputAdditionalInformation("TOPUP100K");
                await regularMemberDeposit.saveDeposit({member: true, paymentMethod: true, amount: true});
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205610] Validate Mandatory field when Add Deposit for member on Regular Member Deposit",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.createdMemberDeposit();
                await regularMemberDeposit.applyRegularMemberNameList();
                await regularMemberDeposit.searchMemberList("REZA_CUSTOMER");
                await regularMemberDeposit.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberDeposit.paymentMemberCategoryType(MemberObject.CashCatMember);
                await regularMemberDeposit.paymentMethodMember(MemberObject.CashPaymentMember);
                await regularMemberDeposit.inputTotalDeposit("100.000");
                await regularMemberDeposit.clearTotalDeposit();
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205611] Validate Button Clear for Total Deposit with Button Deposit Amount on Regular Member Deposit",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.createdMemberDeposit();
                await regularMemberDeposit.applyRegularMemberNameList();
                await regularMemberDeposit.searchMemberList("REZA_CUSTOMER");
                await regularMemberDeposit.selectRegularMemberNameList("REZA_CUSTOMER");
                await regularMemberDeposit.paymentMemberCategoryType(MemberObject.CashCatMember);
                await regularMemberDeposit.paymentMethodMember(MemberObject.CashPaymentMember);
                await regularMemberDeposit.selectDepositBoard(MemberObject.GridMemberBoard100000, 3);
                await regularMemberDeposit.clearTotalDeposit();
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205612] Validate Cancel Deposit on Regular Member Deposit",
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
                await regularMemberDeposit.cancelDeposit();
            }, {regularMemberDeposit}, testInfo);
        });


    test("[TC_0205613] Validate Filter Deposit history on Menu Regular Member Deposit",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.datePickerFilterDate("30", "left");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.dataValidation("MT202507070001");
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205614] Validate Deposit History with Search field on Regular Member Deposit List with Valid keywords",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.selectMonthAndYear("right", "prev");
                await regularMemberDeposit.datePickerFilterDate("30", "right");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.searchMemberDeposit("reza.khan@esb.co.id");
                await regularMemberDeposit.dataValidation("reza.khan@esb.co.id");
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205615] Validate Deposit History with Search field on Regular Member Deposit List with Invalid keywords",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.selectMonthAndYear("right", "prev");
                await regularMemberDeposit.datePickerFilterDate("30", "right");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.searchMemberDeposit("asdasdasdasdasdasdasdasdasd");
                await regularMemberDeposit.dataValidation("rasdasdasdasdasdasdasdasdasd");
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205616] Validate keyword can be cleared from Search field on Regular Member Deposit List",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.selectMonthAndYear("right", "prev");
                await regularMemberDeposit.datePickerFilterDate("30", "right");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.searchMemberDeposit("reza.khan@esb.co.id");
                await regularMemberDeposit.cancelSearchMemberDeposit();
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205617] Validate Regular Member Deposit List page can be navigated with next page button",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.selectMonthAndYear("right", "prev");
                await regularMemberDeposit.datePickerFilterDate("30", "right");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.depositPagination("next");
                await regularMemberDeposit.depositPagination("next");
                await regularMemberDeposit.dataValidation("AGNWTA69");
            }, {regularMemberDeposit}, testInfo);
        });

    test("[TC_0205618] Validate Regular Member Deposit List page can be navigated with last page button",
        {tag: tags + "@positive"}, async ({regularMemberDeposit}, testInfo) => {
            await safeTest(async ({}) => {
                await regularMemberDeposit.clickFilterDate();
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.selectMonthAndYear("left", "prev");
                await regularMemberDeposit.datePickerFilterDate("1", "left");
                await regularMemberDeposit.selectMonthAndYear("right", "prev");
                await regularMemberDeposit.datePickerFilterDate("30", "right");
                await regularMemberDeposit.applyDateInFilterDate();
                await regularMemberDeposit.depositPagination("last");
                await regularMemberDeposit.dataValidation("AGNWTA69");
            }, {regularMemberDeposit}, testInfo);
        });

});