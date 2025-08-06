import {test} from "../../injection";
import {safeTest} from "../../../../src/base/utils/safeTest";
import Table from "../../../../src/modules/oms/objects/table";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";

test.setTimeout(60000);
test.describe.serial("Transaction Edit Order", () => {
    const tags = "@smokeTest @oms @orderingDineIn @editOrder ";

    test.beforeEach(async ({terminalID, signPin}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario, qty1: number) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
    };

    test("[TC_0205238] Validate logic POS when user edit Sales Mode within the Order Page before order menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205239] Validate logic POS when user edit Sales Mode within the Order Page after order menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
                await order.confirmationCloseTable("Yes");
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205240] Validate logic POS when user edit Sales Mode within the order Page before order menu and the Sales Mode have default value",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
                await order.confirmationCloseTable("Yes");
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2);
            }, {tableList, bookOrder, order}, testInfo);
        });

    test("[TC_0205241] Validate logic POS when user edit Sales Mode within the order Page after order menu and the Sales Mode have default value",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT INCLUSIVE", bookOrder);
                await order.editSalesMode("AT INCLUSIVE", order);
                await bookOrder.selectSalesMode("AT EXCLUSIVE", bookOrder);
                await order.applySalesMode(order);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderSingleMenu(order, 2);
            }, {tableList, bookOrder, order}, testInfo);
        });

});