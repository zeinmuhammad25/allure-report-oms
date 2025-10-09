import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";
import BookOrderClassicScenario
    from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";
import OrderClassicScenario from "../../../../src/modules/oms/tableList/order/orderClassic.scenario";

test.setTimeout(600000);
test.describe.serial("Quick Service Classic Cancel Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";


    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await bookOrderClassic.setPax(2);
        await bookOrderClassic.selectSalesMode(salesMode);
        await bookOrderClassic.applyQuickService();
        await bookOrderClassic.skipCustomerPhoneNumber();
    };

    const selectMultipleMenuBiasa = async (orderClassic: OrderClassicScenario, qty1: number, qty2: number, qty3: number) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };


    const cancelTableSelectNotes = async (orderClassic: OrderClassicScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await orderClassic.cancelOrderSelectNotes(reason);
        await orderClassic.confirmationCloseOrder("Yes");
    };

    const UndoCancelTable = async (orderClassic: OrderClassicScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await orderClassic.UndoCancelOrder(reason);
    };

    let featuresActivated = false;
    test.beforeEach(async ({terminalID, signPin,orderClassic}) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSTM_0004] Validate Logic when User can't Cancel Order before saving order"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCashClassic("20.000");
            await signPin.storeAuthState();
            if (!featuresActivated) {
                await orderClassic.activatePosFilterAccess()
                await orderClassic.activateOrderingV2();
                await orderClassic.activatePaymentV2();
                featuresActivated = true;
            }
        }
        await orderClassic.goHere();

    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices()
        ]);
    });
    test("[TCAT_OMS_CQSTM_0004] Validate Logic when User can't Cancel Order before saving order",
        {tag: tag + "@Negative"}, async ({quickServiceList, bookOrderClassic, orderClassic}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMultipleMenuBiasa(orderClassic, 1, 1, 1);
                await orderClassic.disabledCancelOrder();
            }, {quickServiceList, bookOrderClassic, orderClassic}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0005] Validate Logic when User can Cancel Order after saving order",
        {tag: tag + "@Positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMultipleMenuBiasa(orderClassic, 1, 1, 1);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await cancelTableSelectNotes(orderClassic, "Cancel");
            }, {quickServiceList, bookOrderClassic, orderClassic, sideNavBar, tableList}, testInfo);
        });


});