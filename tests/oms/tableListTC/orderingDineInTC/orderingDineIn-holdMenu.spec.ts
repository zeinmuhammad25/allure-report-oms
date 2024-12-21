import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(60000);
test.describe.serial("Ordering Dine In Hold Menu", () => {
    const tags = "@smokeTest @oms @orderingDineIn @holdMenu ";

    const selectMenuBiasa = async (order: OrderScenario, isWithQuantity = false, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        if (isWithQuantity) {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
        } else {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
        }
    };

    const selectMultipleMenuBiasa = async (order: OrderScenario, isWithQuantity = false, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        if (isWithQuantity) {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
            await order.selectMenu(MenuList.menus.atMenuBiasaRebus.name, quantity);
            await order.selectMenu(MenuList.menus.atMenuBiasaBakar.name, quantity);
        } else {
            await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.selectMenu(MenuList.menus.atMenuBiasaRebus.name);
            await order.selectMenu(MenuList.menus.atMenuBiasaBakar.name);
        }
    };

    const selectTable = async (tableList: TableListScenario, bookOrder: BookOrderScenario) => {
        await tableList.selectRoom(Table.smokingRoom.name);
        await tableList.selectTable(Table.smokingRoom.sr1.name);
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    test.beforeEach(async ({terminalID, signPin, order, tableList}) => {
        const testWithAuthentication = [
            "[TC_0205190] Validate Logic when User can Hold menu before Save Order",
            "[TC_0205198] Validate Logic when User cannot Hold/Hold all and/or Fire/Fire all the menu while not having access"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            if (test.info().title === "[TC_0205190] Validate Logic when User can Hold menu before Save Order") {
                await order.activateKitchenFireManagement();
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
            } else if (test.info().title === "[TC_0205198] Validate Logic when User cannot Hold/Hold all and/or Fire/Fire all the menu while not having access") {
                await order.notActivateKitchenFireManagement();
                await terminalID.goHere();
                await terminalID.performTerminalID();
                await signPin.inputPinByTouch("22");
                await signPin.validateShowStarCash("20.000");
                await signPin.storeAuthState();
            }
        } else {
            await order.activateKitchenFireManagement();
            await tableList.goHere();
        }
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205190] Validate Logic when User can Hold menu before Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205191] Validate Logic when User can Hold all menu before Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
        }
    );

    test("[TC_0205192] Validate Logic when User can Fire menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205193] Validate Logic when User can Fire all menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
        }
    );

    test("[TC_0205194] Validate Logic when User cannot Hold menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.holdMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205195] Validate Logic when User cannot Hold all menu after Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.holdAllMenuButtonNotDisplayed();
            await order.saveOrder();
        }
    );

    test("[TC_0205196] Validate Logic when User cannot Fire menu before user Hold and Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
        }
    );

    test("[TC_0205197] Validate Logic when User cannot Fire all before user Hold and Save Order",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireAllMenuButtonNotDisplayed();
            await order.saveOrder();
        }
    );

    test("[TC_0205198] Validate Logic when User cannot Hold/Hold all and/or Fire/Fire all the menu while not having access",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.holdAllMenuButtonNotDisplayed();
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.fireMenuButtonNotDisplayed(MenuList.menus.atMenuBiasaGoreng.name);
            await order.fireAllMenuButtonNotDisplayed();
            await order.saveOrder();
        }
    );

    test("[TC_0205199] Validate Logic when User can check table info for Holded menu that already ordered in menu Table List",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await order.tableInfo();
            await order.detailInfoHoldTable("SR 1");
            await order.validateMenuInHoldTable("SR 1", MenuList.menus.atMenuBiasaGoreng.name);
        }
    );

    test("[TC_0205200] Validate Logic when User cannot proceed to payment before Fire the menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMenuBiasa(order);
            await order.holdMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.expectDisabledPayment();
            await order.saveOrder();
        }
    );

    test("[TC_0205201] Validate Logic when User cannot proceed to payment before Fire All the menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order}) => {
            await selectTable(tableList, bookOrder);
            await selectMultipleMenuBiasa(order);
            await order.holdAllMenu();
            await order.confirmationCloseTable("Yes");
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.expectDisabledPayment();
            await order.saveOrder();
        }
    );

});
