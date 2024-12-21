import {test} from "../../injection";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import PaymentPOSPage from "../../../../src/modules/oms/tableList/payment/paymentPOS.page";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Item", () => {
    const tags = "@smokeTest @oms @payment @paymentCompliment ";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let paymentPOSPage: PaymentPOSPage;
    let sideNavBarComponents: SideNavBarComponents;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        paymentPOSPage = new PaymentPOSPage(page);
        sideNavBarComponents = new SideNavBarComponents(page);

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
        await sideNavBarComponents.gotoPageTools();
        await sideNavBarComponents.selectStation("KASIR");
        await sideNavBarComponents.gotoPageTableList();
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

    test("[TC_0206023]Validate Logic when user can use Compliment as a payment method",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
        }
    );

    test("[TC_0206024]Validate Logic when user can input Compliment Percentage",
        {tag: tags + "@positive"}, async () => {
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
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentPercentage(50, "test");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206025] Validate Logic when user can input Compliment Amount manually",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentAmount("100.000", "test");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206026] Validate Logic when user can input Compliment Amount automatically",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentPercentage(50, "test");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206027] Validate Logic when user can apply Complimentary",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.acRoom.name);
            await tableListPage.selectTable(Table.acRoom.ac4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("test123");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206028] Validate Logic when user can cancel Complimentary",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("test123");
            await paymentPOSPage.actionPayment(PaymentObject.CancelPayment);
        }
    );

    test("[TC_0206029] Validate Logic when user can input > 0 characters Compliment Notes",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr2.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("cek");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206030] Validate Logic when user can input max 100 characters Compliment Notes",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr3.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("hbyKYMvmuXXKpUDJMeD5chW05PEHn1W7o4N8XMquZC3abebH8fp8M9zV9I96Ppsj0FWaN1k6KuSZCaTlF8LeFH9jJVLrIkgeFDPd");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );

    test("[TC_0206031] Validate Logic when user cannot input > 100 characters Compliment Notes",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr4.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("PczYCpEz5uziX4LpLiAB2A35Mozdj90GsvUQ5kp5GxngaqEJss6JBCwnud5iOJLMJSeqT4JURJry0oKCbjQOXt1XRhruKjNxV0Irg");
        }
    );

    test("[TC_0206032] Validate Logic when user cannot apply Complimentary while Compliment Notes is empty",
        {tag: tags + "@positive"}, async () => {
            await allAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.disableApplyCompliment();
        }
    );

    test("[TC_0206033] Validate Logic when user cannot directly proceed Complimentary while not having access",
        {tag: tags + "@positive"}, async () => {
            await limitAccessUserLogin();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await makeOrder("AT INCLUSIVE");
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderMenuPaketMahal();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await tableListPage.selectRoom(Table.smokingRoom.name);
            await tableListPage.selectTable(Table.smokingRoom.sr1.name);
            await orderPage.printBill();
            await orderPage.gotoPayment();
            await paymentPOSPage.paymentType(PaymentObject.Compliment);
            await paymentPOSPage.paymentMethod(PaymentObject.ComplimentPayment);
            await paymentPOSPage.paymentComplimentGetOutstanding("test123");
            await paymentPOSPage.actionPayment(PaymentObject.ApplyPayment);
            await paymentPOSPage.paymentPinUserAuthorization("22");
            await paymentPOSPage.actionPayment(PaymentObject.SavePayment);
        }
    );


});