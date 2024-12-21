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
import SplitBillComponent from "../../../../src/modules/oms/tableList/components/splitBill/splitBill.component";

test.setTimeout(100000);
test.describe.serial("Dine in Link Table", () => {
    const tags = "@smokeTest @oms @Link_Table";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let editOrderComponents: EditOrderComponents;
    let linkTableComponent: LinkTableComponent;
    let splitBillComponent: SplitBillComponent;


    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        linkTableComponent = new LinkTableComponent(page);
        splitBillComponent = new SplitBillComponent(page);

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

    const limitAccessUserLogin = async () => {
        await signPinPage.inputPinByTouch("6");
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

    test("[TC_0205115] Validate Logic when User can Link Table to other table with the same Sales Mode",
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
        }
    );

    test("[TC_0205116] Validate Logic when User can Link Table to other table with different Sales Mode",
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
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205117] Validate Logic when User can access Parent Table after user Link Table",
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
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
        }
    );

    test("[TC_0205118] Validate Logic when User can access Child Table after user Link Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
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
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
        }
    );

    test("[TC_0205119] Validate Logic when User can undo the Link Table action with button Cancel",
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
            await linkTableComponent.userCancelLink();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205120] Validate Logic when User can Unlink the Link Table from Parent Table",
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
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205121] Validate Logic when User cannot Link Table while the other table doing Hold",
        {tag: tags + "@Positive"}, async () => {
            await orderPage.activateKitchenFireManagement();
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.notActivateKitchenFireManagement();
        }
    );

    test("[TC_0205122] Validate Logic when User cannot Link Table while the Link Table on the other table already applied",
        {tag: tags + "@Negative"}, async () => {
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
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await linkTableComponent.userMultiLinkTable();
        }
    );

    test("[TC_0205123] Validate Logic when User can Link Table with the Parent (Main) Split Bill table",
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
            await orderPage.splitBill();
            await splitBillComponent.addBill("split");
            await splitBillComponent.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBillComponent.closeSplitBill();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await tableListPage.selectTableSplitBill("Bill 2");
            await orderPage.cancelTable("Cancel");
            await orderPage.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205124] Validate Logic when User can access payment on Link Table with Split Bill table from Link Table",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.splitBill();
            await splitBillComponent.addBill("split");
            await splitBillComponent.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBillComponent.closeSplitBill();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await tableListPage.selectTableSplitBill("Bill 2");
            await tableListPage.cancelAllQuickServices();
            await tableListPage.cancelAllTables();
        }
    );

    test("[TC_0205125] Validate Logic when User can access payment on Link Table with Split Bill table from Parent (Main) Split Bill",
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
            await orderPage.splitBill();
            await splitBillComponent.addBill("split");
            await splitBillComponent.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBillComponent.closeSplitBill();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await tableListPage.selectTableSplitBill("Main Bill");
            await tableListPage.cancelAllQuickServices();
            await tableListPage.cancelAllTables();
        }
    );

    test("[TC_0205126] Validate Logic when User cannot access payment on Link Table with Split Bill table from Child (Splitted) Split Bill",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.splitBill();
            await splitBillComponent.addBill("split");
            await splitBillComponent.moveMenu("split", MenuList.menus.atMenuBiasaBakar.name, "3");
            await splitBillComponent.closeSplitBill();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await tableListPage.selectTableSplitBill("Bill 2");
            await orderPage.expectDisabledPayment();
            await tableListPage.cancelAllQuickServices();
            await tableListPage.cancelAllTables();
        }
    );

    test("[TC_0205127] Validate Logic when User cannot Link Table while not having access",
        {tag: tags + "@Negative"}, async () => {
            await limitAccessUserLogin();
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
            await orderPage.disabledLinkTable();
        }
    );

    test("[TC_0205128] Validate Logic when User cannot Unlink the Link Table from Child/Linked Table",
        {tag: tags + "@Negative"}, async () => {
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
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await linkTableComponent.userMultiLinkTable();
        }
    );

    test("[TC_0205129] Validate Logic when User cannot Link Table after Hold the menu",
        {tag: tags + "@Positive"}, async () => {
            await orderPage.activateKitchenFireManagement();
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdMenu(MenuList.menus.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await linkTableComponent.userMultiLinkTable();
        }
    );

    test("[TC_0205130] Validate Logic when User cannot Link Table after Hold All the menu",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await linkTableComponent.userMultiLinkTable();
            await orderPage.notActivateKitchenFireManagement();
        }
    );


});