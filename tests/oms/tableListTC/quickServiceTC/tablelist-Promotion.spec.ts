import {test} from "@playwright/test";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import PromotionListComponent
    from "../../../../src/modules/oms/tableList/components/promotionList/promotionList.component";
import PaymentPOSPage from "../../../../src/modules/oms/tableList/payment/paymentPOS.page";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";

test.setTimeout(200000);
test.describe.serial("Quick Service Promotion", () => {

    const tags = "@smokeTest @oms @apply_promotion ";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let bookOrder: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let promotionListComponent: PromotionListComponent;
    let editOrderComponents: EditOrderComponents;
    let quickServiceListPage: QuickServiceListPage;
    let sideNavBarComponents: SideNavBarComponents;
    let tableListPage: TableListPage;
    let paymentPOSPage: PaymentPOSPage;
    let quickServicePage: QuickServiceListPage;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        bookOrder = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        promotionListComponent = new PromotionListComponent(page);
        editOrderComponents = new EditOrderComponents(page);
        quickServiceListPage = new QuickServiceListPage(page);
        sideNavBarComponents = new SideNavBarComponents(page);
        tableListPage = new TableListPage(page);
        paymentPOSPage = new PaymentPOSPage(page);
        quickServicePage = new QuickServiceListPage(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.inputPinByTouch("22");
        await signPinPage.validateShowStarCash("20.000");
        await quickServicePage.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
    });

    const orderMenuBiasa = async () => {
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
        await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrderComponent.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 1, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: 2, notes: null}
        ]);
        await addOrderComponent.wait(2000);
        await addOrderComponent.applyMenuDetailPackage();
    };

    const orderMenuPaketMahal = async () => {
        await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderComponent.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: "test notes1"}
        ]);
        await addOrderComponent.wait(2000);
        await addOrderComponent.applyMenuDetailPackage();
    };

    const cancelOrderQuickService = async () => {
        await sideNavBarComponents.gotoPageTableList();
        await tableListPage.gotoQuickService();
        await quickServiceListPage.selectSalesNum("last");
        await orderPage.cancelTable("test");
        await orderPage.confirmationCloseTable("Yes");
    };


    test("[TC_0204053] Validate Logic When User Apply Promotion Head - Order Pages- Discount Bill Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204054] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % ALL CATEGORY");
            await orderPage.wait(1000);
            await promotionListComponent.selectPromotion("DISCOUNT % ALL CATEGORY");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204055] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204056] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204057] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204058] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // need to check tentative error on awaiting for response API contain /get-menu-package
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204059] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await orderPage.saveOrder();
        }
    );
    test("[TC_0204060] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204061] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP ALL CATEGORY");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204062] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU");
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204063] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY");
            await orderPage.saveOrder();
        }
    );
    test("[TC_0204064] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 12);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204065] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraWhisky();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT RP", 1000000);
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204066] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.wait(1000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT %", 10);
            await orderPage.saveOrder();
        }
    );

    test("[TC_0204067] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
        }
    );

    test("[TC_0204068] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // need to check tentative error on apply promotion and manu paket
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % ALL CATEGORY");
        }
    );

    test("[TC_0204069] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 15);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU");
        }
    );

    test("[TC_0204070] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY");
        }
    );

    test("[TC_0204071] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
        }
    );

    test("[TC_0204072] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU");
        }
    );

    test("[TC_0204073] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 9);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
        }
    );

    test("[TC_0204074] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 5);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            ;
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
        }
    );

    test("[TC_0204075] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 5);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP ALL CATEGORY");
        }
    );

    test("[TC_0204076] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU");
        }
    );

    test("[TC_0204077] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY");
        }
    );

    test("[TC_0204078] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 9);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
        }
    );

    test("[TC_0204079] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT RP", 400000);
            await promotionListComponent.wait(800);
        }
    );

    test("[TC_0204080] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT %", 60);
            await paymentPOSPage.wait(800);
        }
    );

    test("[TC_0204081] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Bill Rp",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204082] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % All Category",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % ALL CATEGORY");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204083] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204084] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204085] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category Detail",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204086] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204087] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204088] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204089] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP ALL CATEGORY");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204090] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // need to check tentative error on awaiting for response API contain /get-menu-package
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204091] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204092] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204093] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT RP", 10000);
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

    test("[TC_0204094] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount %",
        {tag: tags + "@negative"}, async ({page}) => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderMenuBiasa();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur();
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMahal();
            await orderMenuPaketMurah();
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT %", 70);
            await orderPage.saveOrder();
            await cancelOrderQuickService();
        }
    );

});