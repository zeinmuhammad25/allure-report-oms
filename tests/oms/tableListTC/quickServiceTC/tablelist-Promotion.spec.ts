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


test.describe.serial("Quick Service Promotion", () => {

    const tags = "@smokeTest @oms @apply_promotion ";

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        let signPinPage = new SignPinPage(page);
        let quickServicePage = new QuickServiceListPage(page);
        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPin();
        await quickServicePage.addOrderQuickService();

    });

    test("[TC_0204053] Validate Logic When User Apply Promotion Head - Order Pages- Discount Bill Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: "max", notes: "test"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
            await orderPage.saveOrder();

        }
    );


    test("[TC_0204054] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 2);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 3, notes: "test1"},
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 3, notes: "test2"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % ALL CATEGORY");
            await orderPage.wait(3000);
            await promotionListComponent.selectPromotion("DISCOUNT % ALL CATEGORY");
            await orderPage.saveOrder();

        }
    );


    test("[TC_0204055] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 8);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 5, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU");
            await orderPage.saveOrder();

        }
    );

    test("[TC_0204056] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY");
            await orderPage.saveOrder();

        }
    );

    test("[TC_0204057] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 2);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();

        }
    );


    test("[TC_0204058] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 4);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204059] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 3);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 3);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204060] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 1, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204061] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
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
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP ALL CATEGORY");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204062] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 12);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 3, notes: null},
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 3, notes: "test notes1"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204063] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: "max", notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204064] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 4);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204065] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 3);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT RP", 1000000);
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204066] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 3);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.addPromotion();
            await orderPage.wait(2000);
            await promotionListComponent.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionListComponent.selectPromotion("OPEN BILL DISCOUNT %", 10);
            await orderPage.saveOrder();

        }
    );
    test("[TC_0204067] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 3);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("BILL DISCOUNT RP");
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204068] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: "max", notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % ALL CATEGORY");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204069] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 10);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: "max", notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204070] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 5);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: "test 124"},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: "test 124"},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: "test 124"}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204071] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 2);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 5);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 6, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204072] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 2);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 1);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 8, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204073] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 7);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 1, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await paymentPOSPage.wait(1000);

        }
    );
    test("[TC_0204074] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({page}) => {
            let bookOrder = new BookOrderComponent(page);
            let orderPage = new OrderPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let promotionListComponent = new PromotionListComponent(page);
            let paymentPOSPage = new PaymentPOSPage(page);
            await bookOrder.setPax(2);
            await bookOrder.selectSalesMode("AT EXCLUSIVE");
            await bookOrder.applyQuickService();
            await bookOrder.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 5);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 7);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 7);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 4, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 6, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await addOrderComponent.wait(2000);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await paymentPOSPage.wait(1000);
            await paymentPOSPage.paymentType(PaymentObject.AddPromo);
            await promotionListComponent.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionListComponent.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await paymentPOSPage.wait(1000);

        }
    );


});