import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Table", () => {
    const tags = "@smokeTest @oms @moveTable ";

    test.beforeEach(async ({terminalID, signPin, tableList}) => {
        const testWithAuthentication = [
            "[TC_0204095] Validate Logic when User can Move Table from Quick Service to Dine-In"
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
            tableList.cancelAllTables(),
            tableList.cancelAllQuickServices()
        ]);
    });

    test("[TC_0204095] Validate Logic when User can Move Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList, moveTable}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveTable();
            await moveTable.autoMoveTable();
        });

    test("[TC_0204096] Validate Logic when user cannot Move Table from Quick Service to Dine-In filled table",
        {tag: tags + "@negative"}, async ({tableList, quickServiceList, bookOrder, order, sideNavBar, moveTable}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.selectTable(Table.acRoom.ac3.name);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.bookAndOrder();
            await bookOrder.skipCustomerPhoneNumber();
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await order.saveOrder();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel(Table.acRoom.ac3.name);
        });

    test("[TC_0204097] Validate logic when user cannot Move Table from Quick Service to Dine-In while table is not selected",
        {tag: tags + "@negative"}, async ({tableList, quickServiceList, bookOrder, order, sideNavBar, moveTable}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveTable();
            await moveTable.selectRoom(Table.acRoom.name);
            await moveTable.disableButtonByLabel("Apply");
        });

    test("[TC_0204098] Validate Logic when user cannot Move Table while not having access",
        {tag: tags + "@negative"}, async () => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //     Master POS User Role
            //     1. Access Move Table = Not Active
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //  Blocker : Depend on backend
        });

    test("[TC_0204099] Validate logic when user can cancel Move Table action with button Cancel",
        {tag: tags + "@positive"}, async ({tableList, quickServiceList, bookOrder, order, sideNavBar, moveTable}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveTable();
            await moveTable.cancelMoveTableBackTableList();
        });

    test("[TC_0204100] Validate Logic when User can Move Table from Quick Service to Dine-In while having no ordered items",
        {tag: tags + "@positive"}, async ({tableList, quickServiceList, bookOrder, order, sideNavBar, moveTable}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.selectSalesNum("last");
            await order.moveTable();
            await moveTable.autoMoveTable();
        });

    test("[TC_0204101] Validate Logic when User cannot Move Table from Quick Service to Dine-In while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order}) => {
            await quickServiceList.addOrderQuickService();
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await order.expectDisabledMoveTable();
        });
});