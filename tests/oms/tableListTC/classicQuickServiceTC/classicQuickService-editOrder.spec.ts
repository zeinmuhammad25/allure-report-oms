import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import SideNavBarScenario from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";
import BookOrderClassicScenario
    from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";
import OrderClassicScenario from "../../../../src/modules/oms/tableList/order/orderClassic.scenario";

test.setTimeout(600000);
test.describe.serial("Quick Service Classic Edit Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario) => {
        await bookOrderClassic.setPax(2);
        await bookOrderClassic.selectSalesMode(salesMode);
        await bookOrderClassic.applyQuickService();
        await bookOrderClassic.skipCustomerPhoneNumber();
    };

    const selectMenuBiasa = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const configureDefaultSalesMode = async (salesMode: "- Select Default -" | "AT EXCLUSIVE" | "AT INCLUSIVE", orderClassic: OrderClassicScenario, sideNavBar : SideNavBarScenario) => {
        await sideNavBar.gotoPageToolsClassic();
        await orderClassic.confirmationClose("Yes");
        await sideNavBar.selectSalesMode(salesMode);
    };

    let featuresActivated = false;
    test.beforeEach(async ({terminalID, signPin,orderClassic}) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSTM_0015] Validate logic POS when user edit Sales Mode within the Order Page before order menu"
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

    test("[TCAT_OMS_CQSTM_0015] Validate logic POS when user edit Sales Mode within the Order Page before order menu",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
            }, {bookOrderClassic, orderClassic, quickServiceList}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0016] Validate logic POS when user edit Sales Mode within the Order Page after order menu",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic, 2);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await orderClassic.confirmationClose("Yes");
            }, {bookOrderClassic, orderClassic, quickServiceList}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0017] Validate logic POS when user edit Sales Mode within the order Page before order menu and the Sales Mode have default value",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await orderClassic.editSalesMode("AT EXCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT INCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
            }, {bookOrderClassic, orderClassic, quickServiceList}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0018] Validate logic POS when user edit Sales Mode within the order Page after order menu and the Sales Mode have default value",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await orderClassic.editSalesMode("AT EXCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT INCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await selectMenuBiasa(orderClassic, 2);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await orderClassic.confirmationClose("Yes");
            }, {bookOrderClassic, orderClassic, quickServiceList}, testInfo);
        });

    test("[TCAT_OMS_CQSTM_0019] Validate logic POS when user edit Sales Mode within the Order Page before order menu when popup new menu open",
        {tag: tag + "@positive"}, async ({bookOrderClassic, orderClassic, quickServiceList}, testInfo) => {
            await safeTest(async ({bookOrderClassic, orderClassic, quickServiceList}) => {
                await makeOrder("AT INCLUSIVE", bookOrderClassic, quickServiceList);
                await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
                await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
                await orderClassic.editSalesMode("AT INCLUSIVE", orderClassic);
                await bookOrderClassic.selectSalesMode("AT EXCLUSIVE", bookOrderClassic);
                await orderClassic.applySalesMode(orderClassic);
                await selectMenuBiasa(orderClassic, 2);
            }, {bookOrderClassic, orderClassic, quickServiceList}, testInfo);
        });



});