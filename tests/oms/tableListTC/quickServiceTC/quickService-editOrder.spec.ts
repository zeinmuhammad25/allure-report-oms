import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(600000);
test.describe.serial("Quick Service Edit Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario) => {
        await quickServiceList.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const selectMenuBiasa = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0205386] Validate logic POS when user edit Sales Mode within the Order Page before order menu"
        ];
        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
        await tableList.goHere();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205386] Validate logic POS when user edit Sales Mode within the Order Page before order menu",
        {tag: tag + "@positive"}, async ({order, quickServiceList, bookOrder}, testInfo) => {
            await safeTest(async ({order, quickServiceList, bookOrder}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
            }, {order, quickServiceList, bookOrder}, testInfo);
        });

    test("[TC_0205387] Validate logic POS when user edit Sales Mode within the Order Page after order menu",
        {tag: tag + "@positive"}, async ({order, quickServiceList, bookOrder}, testInfo) => {
            await safeTest(async ({order, quickServiceList, bookOrder}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 2);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
                await order.confirmationClose("Yes");
            }, {order, quickServiceList, bookOrder}, testInfo);
        });


});