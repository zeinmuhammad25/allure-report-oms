import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import OrderClassicScenario from "../../../../src/modules/oms/tableList/order/orderClassic.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import BookOrderClassicScenario from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";
import {ToolsTabs} from "../../../../src/modules/oms/tools/ToolsTabs";

test.setTimeout(600000);
test.describe.serial("Quick Service Classic Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const selectMenuBiasa = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await bookOrderClassic.setPax(2);
        await bookOrderClassic.selectSalesMode(salesMode);
        await bookOrderClassic.applyQuickService();
        await bookOrderClassic.skipCustomerPhoneNumber();
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
        await paymentV2.closePopUpPaymentSuccessFul();
    };

    test.beforeEach(async ({terminalID, signPin}) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSBO_0001] Validate Logic When User Able To Add Menu Biasa"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCashClassic("20.000");
            await signPin.storeAuthState();
        }
        //await tableList.goHere();

    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices()
        ]);
    });


    test("[TCAT_OMS_CQSBO_0001] Validate Logic When User Able To Add Menu Biasa",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, order, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic, 3);
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2}, testInfo);
        });


});