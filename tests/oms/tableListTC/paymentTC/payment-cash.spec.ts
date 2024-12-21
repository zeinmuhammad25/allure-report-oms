import {test} from "../../injection";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import PaymentPOSPage from "../../../../src/modules/oms/tableList/payment/paymentPOS.page";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Item", () => {
    const tags = "@smokeTest @oms @payment @paymentCash ";

    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let editOrderComponents: EditOrderComponents;
    let paymentPOSPage: PaymentPOSPage;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        paymentPOSPage = new PaymentPOSPage(page);

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


    test("[TC_0206001] Validate Logic when user can use Cash as a payment method",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
        }
    );

    test("[TC_0206002] Validate Logic when user can use Cash as a payment method",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentInputAmount("10.000");
        }
    );

    test("[TC_0206003] Validate Logic when user can input exact Cash amount total",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentInputAmount("2.194.000");
        }
    );

    test("[TC_0206004] Validate Logic when user can input exceed Cash amount than total",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentInputAmount("3.000.000");
        }
    );

    test("[TC_0206005] Validate Logic when user can select lower Cash amount than total",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.selectCashBoard(PaymentObject.GridCashBoard1000, 2);
        }
    );

    test("[TC_0206006] Validate Logic when user can select exact Cash amount total",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentCashFullAmount();
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206007] Validate Logic when user can select lower Cash amount than total",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.selectCashBoard(PaymentObject.GridCashBoard100000, 15);
            await paymentPOSPage.selectCashBoard(PaymentObject.GridCashBoard25000, 12);
        }
    );

    test("[TC_0206008] Validate Logic when user can clear Cash amount",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentCashFullAmount();
            await paymentPOSPage.clearAmount();
        }
    );

    test("[TC_0206009] Validate Logic when user can close Cash Payment windows with button Cancel",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await orderMenuExtraAnggur();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentCashFullAmount();
            await paymentPOSPage.actionPayment(PaymentObject.CancelPayment);
        }
    );

    test("[TC_0206010] Validate Logic when user can sum the Cash amount by selecting several different amount",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentInputAmount("1.000.000");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentType(PaymentObject.Card);
            await paymentPOSPage.paymentMethod(PaymentObject.DebitBca);
            await paymentPOSPage.paymentGetOutstandingAmount();
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206011] Validate Logic when user can sum the Cash amount by selecting several different amount",
        {tag: tags + "@Positive"}, async () => {
            await limitAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentCashFullAmount();
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentPinUserAuthorization("22");
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206012] Validate Logic when user cannot apply Cash payment while not inputting any amount",
        {tag: tags + "@Positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.disableApplyPayment();
        }
    );


});