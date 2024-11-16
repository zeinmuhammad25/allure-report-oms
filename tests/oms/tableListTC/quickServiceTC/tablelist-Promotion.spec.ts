import {test} from "@playwright/test";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import PromotionListComponent
    from "../../../../src/modules/oms/tableList/components/promotionList/promotionList.component";


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
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
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
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 3, notes: "test1"},
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 3, notes: "test2"},
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
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 5, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null},
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
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null},
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
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: 4, notes: null},
                {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: 3, notes: null},
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




});