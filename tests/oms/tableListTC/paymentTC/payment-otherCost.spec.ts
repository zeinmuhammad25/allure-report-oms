import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";

test.setTimeout(100000);
test.describe.serial("Payment Other Cost ", () => {
    const tags = "@smokeTest @oms @payment @paymentOtherCost ";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuPaketMurah = async (order: OrderScenario, addOrder: AddOrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrder.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 1, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: 2, notes: null}
        ]);
        await addOrder.applyMenuDetailPackage();

    };

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0206058] Validate Logic When User Able To Payment With Non Sales Payment"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.validateNotNowCheckCustomerPayments();
            await signPin.storeAuthState();
            await sideNavBar.gotoPageTools();
            await sideNavBar.selectStation("KASIR");
            await sideNavBar.gotoPageTableList();
        }
        await tableList.goHere();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0206058] Validate Logic When User Able To Payment With Non Sales Payment",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206059] Validate Logic When User Able To Payment With Non Sales Payment When User Not Have Access to This Payment",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, topNavBar, signPin}) => {
            await signPin.validateNotNowCheckCustomerPayments();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentPinUserAuthorization("22");
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
        }
    );

    test("[TC_0206060] Validate Logic When User Able To Payment With Non Sales Payment Using Promotion",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, promotionList}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206061] Validate Logic When User Able To Payment With Non Sales Payment And Cash PaymentCash First Then Non Sales",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputAmount("50.000");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206063] Validate Logic When User Able To Payment With Non Sales Payment And Card Payment Card First Then Non Sales",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentInputAmount("50.000");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206065] Validate Logic When User Able To Payment With Non Sales Payment And Compliment Payment Compliment First Then Non Sales",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentPercentage(50, "tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206069] Validate Logic When User Able To Payment With Non Sales Payment And Other Voucher PaymentOther Voucher First Then Non Sales",
        {tag: tags + "@Negative"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.OtherVoucher);
            await paymentPos.paymentMethod(PaymentObject.OtherVoucherSubTotal);
            await paymentPos.paymentOtherVoucherSubtotalAndGrandTotal("test", "100.000", "1231");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.OtherCost);
            await paymentPos.paymentMethod(PaymentObject.OtherCostPayment);
            await paymentPos.paymentOtherCost("tes");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

});