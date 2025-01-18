import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";

test.setTimeout(100000);
test.describe.serial("Payment Compliment POS", () => {
    const tags = "@smokeTest @oms @payment @paymentCompliment ";

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
            "[TC_0206023]Validate Logic when user can use Compliment as a payment method"
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

    test("[TC_0206023]Validate Logic when user can use Compliment as a payment method",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
        }
    );

    test("[TC_0206024]Validate Logic when user can input Compliment Percentage",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos}) => {
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
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentPercentage(50, "test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206025] Validate Logic when user can input Compliment Amount manually",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac2.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentAmount("100.000", "test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206026] Validate Logic when user can input Compliment Amount automatically",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentPercentage(50, "test");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206027] Validate Logic when user can apply Complimentary",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("test123");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206028] Validate Logic when user can cancel Complimentary",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("test123");
            await paymentPos.actionPayment(PaymentObject.CancelPayment);
        }
    );

    test("[TC_0206029] Validate Logic when user can input > 0 characters Compliment Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr2.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("cek");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206030] Validate Logic when user can input max 100 characters Compliment Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr3.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("hbyKYMvmuXXKpUDJMeD5chW05PEHn1W7o4N8XMquZC3abebH8fp8M9zV9I96Ppsj0FWaN1k6KuSZCaTlF8LeFH9jJVLrIkgeFDPd");
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206031] Validate Logic when user cannot input > 100 characters Compliment Notes",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr4.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("PczYCpEz5uziX4LpLiAB2A35Mozdj90GsvUQ5kp5GxngaqEJss6JBCwnud5iOJLMJSeqT4JURJry0oKCbjQOXt1XRhruKjNxV0Irg");
        }
    );

    test("[TC_0206032] Validate Logic when user cannot apply Complimentary while Compliment Notes is empty",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder}) => {
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.disableApplyCompliment();
        }
    );

    test("[TC_0206033] Validate Logic when user cannot directly proceed Complimentary while not having access",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, paymentPos, addOrder, topNavBar, signPin}) => {
            await signPin.validateNotNowCheckCustomerPayments();
            await topNavBar.userSignOut();
            await signPin.inputPinByTouch("6");
            await signPin.validateShowStarCash("20.000");
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE", bookOrder);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await tableList.selectRoom(Table.smokingRoom.name);
            await tableList.selectTable(Table.smokingRoom.sr1.name);
            await order.printBill();
            await order.gotoPayment();
            await paymentPos.paymentType(PaymentObject.Compliment);
            await paymentPos.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPos.paymentComplimentGetOutstanding("test123");
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


});