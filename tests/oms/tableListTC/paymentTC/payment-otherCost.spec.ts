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
import PromotionListComponent
    from "../../../../src/modules/oms/tableList/components/promotionList/promotionList.component";


test.setTimeout(100000);
test.describe.serial("Payment Other Cost ", () => {
    const tags = "@smokeTest @oms @payment @paymentOtherCost ";

    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let editOrderComponents: EditOrderComponents;
    let paymentPOSPage: PaymentPOSPage;
    let promotionListComponent: PromotionListComponent;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        paymentPOSPage = new PaymentPOSPage(page);
        promotionListComponent = new PromotionListComponent(page);

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

    test("[TC_0206058] Validate Logic When User Able To Payment With Non Sales Payment",
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
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206059] Validate Logic When User Able To Payment With Non Sales Payment When User Not Have Access to This Payment",
        {tag: tags + "@Negative"}, async () => {
            await limitAccessUserLogin();
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
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentPinUserAuthorization("22");
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206060] Validate Logic When User Able To Payment With Non Sales Payment Using Promotion",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206061] Validate Logic When User Able To Payment With Non Sales Payment And Cash PaymentCash First Then Non Sales",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Cash);
            await paymentPOSPage.paymentMethod(PaymentObject.CashPayment);
            await paymentPOSPage.paymentInputAmount("50.000");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206063] Validate Logic When User Able To Payment With Non Sales Payment And Card Payment Card First Then Non Sales",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Card);
            await paymentPOSPage.paymentMethod(PaymentObject.DebitBca);
            await paymentPOSPage.paymentInputAmount("50.000");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206065] Validate Logic When User Able To Payment With Non Sales Payment And Compliment Payment Compliment First Then Non Sales",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentPercentage(50, "tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206069] Validate Logic When User Able To Payment With Non Sales Payment And Other Voucher PaymentOther Voucher First Then Non Sales",
        {tag: tags + "@Negative"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.OtherVoucher);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherVoucherSubTotal);
            await paymentPOSPage.paymentOtherVoucherSubtotalAndGrandTotal("test", "100.000", "1231");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentType(PaymentObject.OtherCost);
            await paymentPOSPage.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPOSPage.paymentOtherCost("tes");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

});