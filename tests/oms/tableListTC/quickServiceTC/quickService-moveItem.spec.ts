import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import SideNavBarScenario from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import MoveItemScenario from "../../../../src/modules/oms/tableList/order/components/moveItem/moveItem.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Item", () => {
    const tags = "@smokeTest @oms @quickService @moveItem ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario
    ) => {
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

    const selectMultipleMenuBiasa = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };

    const paginationData = async (order: OrderScenario, sideNavBar: SideNavBarScenario, tableList: TableListScenario, bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario) => {
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
        await order.saveOrder();
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
    };

    const createQuickServiceAndMoveItem = async (
        order: OrderScenario,
        sideNavBar: SideNavBarScenario,
        tableList: TableListScenario,
        quickServiceList: QuickServiceListScenario,
        moveItem: MoveItemScenario,
        qty = 1) => {
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await quickServiceList.selectSalesNum("last");
        await order.moveItem();
        await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
        await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty);
        await moveItem.actionApplyMoveItem();
    };


    test.beforeEach(async ({terminalID, signPin, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205328] Validate Logic when User can Move Item to new Quick Service order from Quick Service to Quick Service"
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

    test("[TC_0205328] Validate Logic when User can Move Item to new Quick Service order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205329] Validate Logic when User can Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205330] Validate Logic when User can Move Item to the other filled order with the same Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205331] Validate Logic when User can Move Item to the empty order with the same Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205332] Validate Logic when User can Navigate to the next Move Item page",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await paginationData(order, sideNavBar, tableList, bookOrder, quickServiceList);
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.selectQuickService();
                await moveItem.pagination("next");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205333] Validate Logic when User can Navigate to the previous Move Item page",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await paginationData(order, sideNavBar, tableList, bookOrder, quickServiceList);
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.selectQuickService();
                await moveItem.pagination("previous");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205334] Validate Logic when User can Navigate to the next Destination Table Page in Move Item",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.selectRoomNameDineIn(Table.acRoom.name);
                await moveItem.pagination("next");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205335] Validate Logic when User can Navigate to the previous Destination Table Page in Move Item",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.selectRoomNameDineIn(Table.smokingRoom.name);
                await moveItem.pagination("previous");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205336] Validate Logic when User can Move Item to the empty order with all Menu(s) selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205337] Validate Logic when User can Move Item to the other filled order with all Menu(s) selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order,4,5,6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205338] Validate Logic when User can Move Item to the empty order with a Menu selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order,4,5,6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205339] Validate Logic when User can Move Item to the filled order with a Menu selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order,4,5,6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205340] Validate Logic when User can Increase an item with ≥ 1 Qty in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order,6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205341] Validate Logic when User can Decrease an item with ≥ 1 Qty selected in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order,6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.moveBackPartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.moveBackPartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await moveItem.actionApplyMoveItem();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205342] Validate Logic when User can Move All an item with ≥ 1 Qty in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMultipleMenuBiasa(order, 4, 5, 6);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205343] Validate Logic when User can Select All Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order,10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToOtherQuickServiceTransaction();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionApplyMoveItem();
                await order.confirmationCloseTable("Yes");
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205344] Validate Logic when User can Deselect All Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order,10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.deselectAllMenu();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205345] Validate Logic when User can undo Move Item action with button Cancel on Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
                await moveItem.moveSelectAllItemMenu();
                await moveItem.actionCancelMoveItem();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205346] Validate Logic when User cannot select billed order in Move Item from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.moveItemToSectionQuickService();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205347] Validate Logic when User cannot select current order in Move Item from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.selectQuickService();
                await moveItem.disableSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205348] Validate Logic when User cannot Move Item to the other filled order with different Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.selectQuickService();
                await moveItem.disableSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0205349] Validate Logic when User cannot Move Item to the other empty order with different Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.selectSalesNum("last");
                await order.moveItem();
                await moveItem.selectQuickService();
                await moveItem.disableSalesNum();
            }, {quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}, testInfo);
        });

    test("[TC_0204124] Validate Logic when User can Move Item from Dine-In to Quick Service",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.selectQuickService();
        });

    test("[TC_0204125] Validate Logic when User cannot Move Item while not having access",
        {tag: tags + "@negative"}, async () => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  Master POS User Role
            //  1. Access Move Item = Not Active
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            // Blocker:
            // Depend on ESB Core
            // await quickServiceList.addOrderQuickService();
            // await bookOrder.setPax(2);
            // await makeOrder(bookOrder);
            // await orderMenuBiasa(order, 5);
            // await sideNavBar.gotoPageTableList();
            // await tableList.gotoQuickService();
            // await quickServiceList.selectSalesNum("last");
            // await order.moveItem();
            // await moveItem.moveItemToSectionQuickService();
            // await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            // await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            // await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204126] Validate Logic when User cannot Move Item without ordered item to the other order from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionQuickService();
        });

    test("[TC_0204127] Validate Logic when User cannot Move Item from Quick Service to Quick Service while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({quickServiceList, order, bookOrder}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await order.expectDisabledMoveTable();
        });

    test("[TC_0204128] Validate Logic when User can Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac2.name);
            await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.movePartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204129] Validate Logic when User can Move Item from Quick Service to Dine-In other filled table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await orderMenuBiasa(order, 3);
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204130] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204131] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await orderMenuBiasa(order, 3);
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204132] Validate Logic when User can Move Item from Quick Service to Dine-In filled table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204133] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with a Menu selected",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204134] Validate Logic when User can Move Item to the filled table with a Menu selected from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            ////
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 3);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204135] Validate Logic when User can Increase an item with ≥ 1 Qty in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 4);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204136] Validate Logic when User can Decrease an item with ≥ 1 Qty selected in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.moveBackPartialItemMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 2);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204137] Validate Logic when User can Move All in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204138] Validate Logic when User can Select All Move Item to the other order from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.actionApplyMoveItem();
        });

    test("[TC_0204139] Validate Logic when User can Deselect All Move Item to the other order from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
            await moveItem.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItem.deselectAllMenu();
            await moveItem.verifyCurrentQty(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 0);
        });

    test("[TC_0204140] Validate Logic when User cannot Move Item from Quick Service to the other filled table with different Sales Mode on Dine-In",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await orderMenuBiasa(order, 3);
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.expectDisabledTable(Table.acRoom.name, Table.acRoom.ac3.name);
        });

    test("[TC_0204141] Validate Logic when User cannot Move Item from Quick Service to the other empty table with different Sales Mode in different Table Section on Dine-In",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.expectDisabledTable(Table.acRoom.name, Table.acRoom.ac3.name);
        });

    test("[TC_0204142] Validate Logic when User cannot Move Item without ordered item from Quick Service to Dine-In table",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveItem();
            await moveItem.moveItemToSectionDineIn(Table.acRoom.name, Table.acRoom.ac3.name);
        });

    test("[TC_0204143] Validate Logic when User can Move Item to emptied table from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"},
        async ({quickServiceList, bookOrder, sideNavBar, tableList, order, mergeTable, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT INCLUSIVE", false);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac1.name);
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder, "AT INCLUSIVE", true);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204144] Validate Logic when User can Move Item to filled table from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"},
        async ({quickServiceList, bookOrder, sideNavBar, tableList, order, mergeTable, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac1.name);
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204145] Validate Logic when User can Move Item from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"},
        async ({quickServiceList, bookOrder, sideNavBar, tableList, order, mergeTable, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.mergeTable();
            await mergeTable.selectRoom(Table.acRoom.name);
            await mergeTable.selectTable(Table.acRoom.ac1.name);
            await mergeTable.applyMergeTable();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204146] Validate Logic when User cannot select current table in Move Item from Quick Service to Dine-In",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204147] Validate Logic when User cannot select billed table in Move Item from Quick Service to Dine-In",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204148] Validate Logic when User can Move Item to Child Merge Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204149] Validate Logic when User cannot Move Item to emptied order from Quick Service to Dine-In Child Merge Table with different sales mode",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204150] Validate Logic when User cannot Move Item to filled table from Child Merge Table from Quick Service to Dine-In with different sales mode",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });

    test("[TC_0204151] Validate Logic when User cannot Move Item from Quick Service to Dine-In while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, sideNavBar, tableList, order, moveItem}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder(bookOrder, "AT EXCLUSIVE", false);
            await orderMenuBiasa(order, 5);
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.saveOrder();
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await makeOrder(bookOrder);
            await orderMenuBiasa(order, 5);
            await createQuickServiceAndMoveItem(order, sideNavBar, tableList, quickServiceList, moveItem);
        });
});