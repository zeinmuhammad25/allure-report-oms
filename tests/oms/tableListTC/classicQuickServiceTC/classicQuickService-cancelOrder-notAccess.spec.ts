import { test } from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import { safeTest } from "../../../../src/base/utils/safeTest";
import BookOrderClassicScenario
    from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";
import OrderClassicScenario from "../../../../src/modules/oms/tableList/order/orderClassic.scenario";

test.setTimeout(600000);
test.describe("Quick Service Classic Cancel Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";


    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario) => {
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

    let featuresActivated = false;
    test.beforeEach(async ({ terminalID, signPin, orderClassic }) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSTM_0006] Validate Logic when User cannot directly Cancel Order while not having access"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("0000");
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

    test.afterEach(async ({ tableList }) => {
        await Promise.all([
            tableList.cancelAllQuickServices()
        ]);
    });


    test("[TCAT_OMS_CQSTM_0006] Validate Logic when User cannot directly Cancel Order while not having access",
        { tag: tag + "@Positive" }, async ({ topNavBar, signPin, tableList, bookOrder, orderClassic, bookOrderClassic, sideNavBar, quickServiceList }, testInfo) => {
            await safeTest(async ({ topNavBar, signPin, tableList, bookOrder, orderClassic, bookOrderClassic, sideNavBar, quickServiceList }) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMultipleMenuBiasa(orderClassic, 1, 1, 1);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.cancelMenuButtonIsNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
                await orderClassic.saveOrder();
            }, { topNavBar, signPin, tableList, bookOrder, orderClassic, bookOrderClassic, sideNavBar, quickServiceList }, testInfo);
        });

});