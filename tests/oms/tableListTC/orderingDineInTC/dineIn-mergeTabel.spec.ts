import {test} from "@playwright/test";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import Table from "../../../../src/modules/oms/objects/table";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import MergeTableComponent
    from "../../../../src/modules/oms/tableList/order/components/mergeTable/mergeTable.component";
import SplitBillComponent from "../../../../src/modules/oms/tableList/components/splitBill/splitBill.component";
import LinkTableComponent from "../../../../src/modules/oms/tableList/order/components/linkTable/linkTable.component";

test.setTimeout(100000);
test.describe.serial("Dine in Merge Table", () => {
    const tags = "@smokeTest @oms @Merge_Table";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let editOrderComponents: EditOrderComponents;
    let mergeTableComponent: MergeTableComponent;
    let splitBillComponent: SplitBillComponent;
    let linkTableComponent: LinkTableComponent;


    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        mergeTableComponent = new MergeTableComponent(page);
        splitBillComponent = new SplitBillComponent(page);
        linkTableComponent = new LinkTableComponent(page);

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
    const bookOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE") => {
        await bookOrderComponent.selectSalesMode(salesMode);
        await bookOrderComponent.bookTable();
        await bookOrderComponent.skipCustomerPhoneNumber();
        await bookOrderComponent.wait(300);
    };

    const orderSingleMenu = async () => {
        await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuExtraAnggur = async () => {
        await orderPage.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrderComponents.escapeKeyboard();
        await editOrderComponents.actionButtonFooter("Next");
        await editOrderComponents.actionButtonFooter("Next");
        await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
        await editOrderComponents.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurHijauKawaKawa600ml.shortName, 2);
        await editOrderComponents.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurMerahOT620ml.shortName, 2);
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

    const cancelTable = async () => {
        await orderPage.cancelTable("test");
        await orderPage.confirmationCloseTable("Yes");
    };

    test("[TC_0205053] Validate Logic when User can Merge Table with same Sales Mode",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205054] Validate Logic when User can Merge Table with empty table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205055] Validate Logic when User can Merge Table with empty table and filled table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac1.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205056] Validate Logic when User can Merge Table with unordered table and filled table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr1.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205057] Validate Logic when User can Merge Table with unordered table and empty table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac3.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205058] Validate Logic when User can Merge Table with unordered table, empty ordered table and filled table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
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
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205059] Validate Logic when User can cancel the Merge Table action with button Cancel",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await cancelTable();
        }
    );

    test("[TC_0205060] Validate Logic when User can Cancel Merge Table edit/selection",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.cancelMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205061] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205062] Validate Logic when User can undo Merge Table from Parent Table",
        {tag: tags + "@negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr1.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr1.name, "occupied");
        }
    );

    test("[TC_0205063] Validate Logic when User cannot Merge Table with different Sales Mode",
        {tag: tags + "@negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT EXCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name, "disable");
        }
    );

    test("[TC_0205064] Validate Logic when user cannot Merge Table while not having access",
        {tag: tags + "@negative"}, async () => {
            await limitAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.disabledMergeTable();
        }
    );
    test("[TC_0205065] Validate Logic when User cannot Merge Table with the Split Bill table",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr3.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.splitBill();
            await splitBillComponent.addBill("child");
            await splitBillComponent.moveMenu("child", MenuList.menus.atMenuBiasaBakar.name, "2");
            await splitBillComponent.closeSplitBill();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await tableListPage.selectTableSplitBill("Bill 2");
            await orderPage.cancelTable("Cancel");
            await orderPage.confirmationCloseTable("Yes");
        }
    );

    test("[TC_0205066] Validate Logic when User cannot Merge Table with the linked Merge Table",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await linkTableComponent.singleLinkTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr3.name, "disable");
            await mergeTableComponent.selectTable(Table.smokingRoom.sr4.name, "disable");

        }
    );

    test("[TC_0205067] Validate Logic when User cannot Merge Table with other Merged Table",
        {tag: tags + "@negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr4.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr3.name, "disable");
            await mergeTableComponent.selectTable(Table.smokingRoom.sr4.name, "disable");
        }
    );

    test("[TC_0205068] Validate Logic when User can Merge Table with both tables emptied",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr3.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr4.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );
    test("[TC_0205069] Validate Logic when User cannot Merge Table on different Sales Mode with both tables emptied",
        {tag: tags + "@negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await bookOrder("AT INCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await bookOrder("AT EXCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await bookOrder("AT EXCLUSIVE");
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.smokingRoom.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr2.name);
            await mergeTableComponent.selectTable(Table.smokingRoom.sr3.name, "disable");
            await mergeTableComponent.selectTable(Table.smokingRoom.sr4.name, "disable");
        }
    );

    test("[TC_0205071] Validate Logic when User can Merge Table with filled table after Hold menu",
        {tag: tags + "@Positive"}, async () => {
        await orderPage.activateKitchenFireManagement()
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.holdMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205072] Validate Logic when User cannot Merge Table with filled table after Hold All menu",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
        }
    );

    test("[TC_0205073] Validate Logic when User can Merge Table with emptied table after Hold All menu",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderSingleMenu();
            await orderPage.holdAllMenu();
            await orderPage.confirmationCloseTable("Yes");
            await orderPage.saveOrder();
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.mergeTable();
            await mergeTableComponent.selectRoom(Table.acRoom.name);
            await mergeTableComponent.selectTable(Table.acRoom.ac2.name);
            await mergeTableComponent.applyMergeTable();
            await orderPage.saveOrder();
            await orderPage.notActivateKitchenFireManagement();
        }
    );

});