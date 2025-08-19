import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(600000);
test.describe.serial("Quick Service Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await quickServiceList.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const selectMultipleMenuBiasa = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };


    const cancelTableSelectNotes = async (order: OrderScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await order.cancelTableSelectNotes(reason);
        await order.confirmationCloseTable("Yes");
    };

    const cancelTable = async (order: OrderScenario) => {
        await order.cancelTable("Cancel");
        await order.confirmationCloseTable("Yes");
    };

    const UndoCancelTable = async (order: OrderScenario, reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await order.UndoCancelTable(reason);
    };

    test.beforeEach(async ({terminalID, signPin, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205376] Validate Logic when User can't Cancel Order before saving order"
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
    test("[TC_0205376] Validate Logic when User can't Cancel Order before saving order",
        {tag: tag + "@Negative"}, async ({quickServiceList, bookOrder, order}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order,1,1,1);
                await order.disabledCancelTable();
            }, {quickServiceList, bookOrder, order}, testInfo);
        });

    test("[TC_0205377] Validate Logic when User can't Cancel Order before saving order",
        {tag: tag + "@Positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order,1,1,1);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await cancelTableSelectNotes(order, "Cancel");
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo);
        });

    test("[TC_0205378] Validate Logic when User can Cancel Order empty order",
        {tag: tag + "@Positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await cancelTableSelectNotes(order, "Cancel");
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo);
        });

    test("[TC_0205379] Validate Logic when User cannot Cancel Order before Save Order without select Cancel Notes",
        {tag: tag + "@Positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.cancelTableApplyDisabled();
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList}, testInfo);
        });




});