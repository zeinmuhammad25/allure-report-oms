import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";

test.setTimeout(100000);
test.describe("Payment Cash POS", () => {
    const tags = "@smokeTest @oms @payment @paymentCash ";

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

    const orderMenuExtraAnggur = async (order: OrderScenario, editOrder: EditOrderScenario) => {
        await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await editOrder.actionButtonFooter("Next");
        await editOrder.selectMenuExtraCategory(MenuList.anggur.name);
        await editOrder.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurHijauKawaKawa600ml.shortName, 2);
        await editOrder.selectMenuExtra(MenuList.anggur.minumanAnggur.anggurMerahOT620ml.shortName, 2);
        await editOrder.actionButtonFooter("Apply");
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

    const orderMenuPaketMahal = async (order: OrderScenario, addOrder: AddOrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrder.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: "test notes1"}
        ]);
        await addOrder.applyMenuDetailPackage();
    };


    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0206001] Validate Logic when user can use Cash as a payment method"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
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


    test("[TC_0206001] Validate Logic when user can use Cash as a payment method",
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
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
        }
    );

    test("[TC_0206002] Validate Logic when user can use Cash as a payment method",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
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
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputAmount("10.000");
        }
    );

    test("[TC_0206003] Validate Logic when user can input exact Cash amount total",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
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
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputAmount("2.194.000");
        }
    );

    test("[TC_0206004] Validate Logic when user can input exceed Cash amount than total",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
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
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputAmount("3.000.000");
        }
    );

    test("[TC_0206005] Validate Logic when user can select lower Cash amount than total",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.selectCashBoard(PaymentObject.GridCashBoard1000, 2);
        }
    );

    test("[TC_0206006] Validate Logic when user can select exact Cash amount total",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206007] Validate Logic when user can select lower Cash amount than total",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.selectCashBoard(PaymentObject.GridCashBoard100000, 15);
            await paymentPos.selectCashBoard(PaymentObject.GridCashBoard25000, 12);
        }
    );

    test("[TC_0206008] Validate Logic when user can clear Cash amount",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.clearAmount();
        }
    );

    test("[TC_0206009] Validate Logic when user can close Cash Payment windows with button Cancel",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, editOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await orderMenuExtraAnggur(order, editOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.CancelPayment);
        }
    );

    test("[TC_0206010] Validate Logic when user can sum the Cash amount by selecting several different amount",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentInputAmount("1.000.000");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.paymentType(PaymentObject.Card);
            await paymentPos.paymentMethod(PaymentObject.DebitBca);
            await paymentPos.paymentGetOutstandingAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206011] Validate Logic when user can sum the Cash amount by selecting several different amount",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder, topNavBar, signPin}) => {
            await signPin.validateNotNowCheckCustomerPayments();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
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

    test("[TC_0206012] Validate Logic when user cannot apply Cash payment while not inputting any amount",
        {tag: tags + "@Positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.disableApplyPayment();
        }
    );

});