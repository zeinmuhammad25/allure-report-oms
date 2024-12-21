import {test} from "@playwright/test";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import LinkTableComponent from "../../../../src/modules/oms/tableList/order/components/linkTable/linkTable.component";
import MoveTableComponent from "../../../../src/modules/oms/tableList/order/components/moveTable/moveTable.component";

test.setTimeout(100000);
test.describe.serial("Dine in Cancel Table", () => {
    const tags = "@smokeTest @oms @Cancel_Table";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let editOrderComponents: EditOrderComponents;
    let linkTableComponent: LinkTableComponent;
    let moveTableComponent: MoveTableComponent;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        linkTableComponent = new LinkTableComponent(page);
        moveTableComponent = new MoveTableComponent(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
    });

    test.afterEach(async ({}) => {
        await Promise.all([
            tableListPage.cancelAllQuickServices(),
            tableListPage.cancelAllTables()
        ]);
    });

    const allAccessUserLogin = async () => {
        await signPinPage.inputPinByTouch("22");
        await signPinPage.validateShowStarCash("20.000");
    };

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE") => {
        await bookOrderComponent.selectSalesMode(salesMode);
        await bookOrderComponent.bookAndOrder();
        await bookOrderComponent.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async () => {
        await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuExtraWhisky = async () => {
        await orderPage.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrderComponents.escapeKeyboard();
        await editOrderComponents.actionButtonFooter("Next");
        await editOrderComponents.actionButtonFooter("Next");
        await editOrderComponents.selectMenuExtraCategory(MenuList.whisky.name);
        await editOrderComponents.selectMenuExtra(MenuList.whisky.minumanWhisky.bataviaBlended700ml.shortName, 3);
        await editOrderComponents.selectMenuExtra(MenuList.whisky.minumanWhisky.gilbeysWhisky700ml.shortName, 4);
        await editOrderComponents.actionButtonFooter("Apply");
    };

    const orderMenuPaketMurah = async () => {
        await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrderComponent.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 1, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: 2, notes: null}
        ]);
        await addOrderComponent.wait(2000);
        await addOrderComponent.applyMenuDetailPackage();
        await addOrderComponent.wait(2000);
    };

    const orderMenuPaketMahal = async () => {
        await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderComponent.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: "test notes1"}
        ]);
        await addOrderComponent.wait(2000);
        await addOrderComponent.applyMenuDetailPackage();
        await addOrderComponent.wait(2000);
    };

    const cancelTableSelectNotes = async (reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await orderPage.cancelTableSelectNotes(reason);
        await orderPage.confirmationCloseTable("Yes");
    };
    const cancelTable = async () => {
        await orderPage.cancelTable("Cancel");
        await orderPage.confirmationCloseTable("Yes");
    };
    const UndoCancelTable = async (reason: "Cancel" | "Tidak Jadi" | "Testing A" | "Testing B") => {
        await orderPage.UndoCancelTable(reason);
    };


    test("[TC_0205131] Validate Logic when User can Cancel the order in Link Table with Cancel Table to the main table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await cancelTable();
        }
    );

    test("[TC_0205132] Validate Logic when User can Cancel Table after Link Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await cancelTableSelectNotes("Testing B");
        }
    );

    test("[TC_0205133] Validate Logic when User can Cancel Table before saving order",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await cancelTableSelectNotes("Testing A");
        }
    );

    test("[TC_0205134] Validate Logic when User can Cancel Table after saving order",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await cancelTableSelectNotes("Cancel");
        }
    );

    test("[TC_0205135] Validate Logic when User still can Cancel Table after Move Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.moveTable();
            await moveTableComponent.selectRoom(Table.smokingRoom.name);
            await moveTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await cancelTableSelectNotes("Cancel");
        }
    );

    test("[TC_0205137] Validate Logic when User can Cancel Table empty order",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await cancelTable();
        }
    );

    test("[TC_0205138] Validate Logic when User cannot Cancel Table before Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.disabledCancelTable();
        }
    );

    test("[TC_0205139] Validate Logic when User cannot Cancel Table after Save Order without input Cancel Notes",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.cancelTableApplyDisabled();
        }
    );

    test("[TC_0205140] Validate Logic when User can undo Cancel Table before Save Order with button Cancel",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await UndoCancelTable("Cancel");
        }
    );

    test("[TC_0205141] Validate Logic when User can undo Cancel Table after Save Order with button Cancel",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.categoryDetail.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await UndoCancelTable("Cancel");
        }
    );

    test("[TC_0205142] Validate Logic when User can Cancel Table to Parent (Main) Split Bill",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT EXCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraWhisky();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await cancelTable();
        }
    );

    test("[TC_0205143] Validate Logic when User can Cancel Table to Child (Splitted) Split Bill",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT EXCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraWhisky();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await cancelTableSelectNotes("Tidak Jadi");
        }
    );

    test("[TC_0205144] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await orderPage.activateKitchenFireManagement()
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await cancelTable();
        }
    );

    test("[TC_0205145] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await orderPage.activateKitchenFireManagement()
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await cancelTableSelectNotes("Testing B");
        }
    );

    test("[TC_0205146] Validate Logic when User already Hold menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await orderPage.activateKitchenFireManagement()
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.fireMenu(MenuList.menus.atMenuBiasaBakar.name)
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await cancelTable();
        }
    );

    test("[TC_0205147] Validate Logic when User already Fire all menu, user can Cancel Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await orderPage.activateKitchenFireManagement()
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await orderPage.fireAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await cancelTableSelectNotes("Testing B");
            await orderPage.notActivateKitchenFireManagement()
        }
    );

});