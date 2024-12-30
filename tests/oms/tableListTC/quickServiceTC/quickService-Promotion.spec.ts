import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";
import SideNavBarScenario from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import PromotionListScenario
    from "../../../../src/modules/oms/tableList/components/promotionList/promotionList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";

test.setTimeout(200000);
test.describe.serial("Quick Service Promotion", () => {

    const tags = "@smokeTest @oms @apply_promotion ";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario,quickServiceList:QuickServiceListScenario) => {
        await quickServiceList.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, 4);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, 6);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, 4);
    };

    const orderMenuExtraWhisky = async (order: OrderScenario, editOrder: EditOrderScenario) => {
        await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await editOrder.actionButtonFooter("Next");
        await editOrder.selectMenuExtraCategory(MenuList.whisky.name);
        await editOrder.selectMenuExtra(MenuList.whisky.minumanWhisky.bataviaBlended700ml.shortName, 3);
        await editOrder.selectMenuExtra(MenuList.whisky.minumanWhisky.gilbeysWhisky700ml.shortName, 4);
        await editOrder.actionButtonFooter("Apply");
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

    const cancelOrderQuickService = async (order: OrderScenario, sideNavBar: SideNavBarScenario, tableList: TableListScenario, quickServiceList: QuickServiceListScenario) => {
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await quickServiceList.selectSalesNum("last");
        await order.cancelTable("test");
        await order.confirmationCloseTable("Yes");
    };

    const freeItemAllCategory = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM ALL CATEGORY");
        await promotionList.selectPromotionDetail("FREE ITEM ALL CATEGORY");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyAllQtyPromoItem();
    };

    const freeItemAllCategoryInputQty = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario, qty: number) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM ALL CATEGORY");
        await promotionList.selectPromotionDetail("FREE ITEM ALL CATEGORY");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyInputQtyPromoItem(qty);
    };

    const freeItemMenuCategory = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyAllQtyPromoItem();
    };

    const freeItemMenuCategoryInputQty = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario, qty: number) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyInputQtyPromoItem(qty);
    };

    const freeItemMenuCategoryDetail = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY DETAIL");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY DETAIL");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyAllQtyPromoItem();
    };

    const freeItemMenuCategoryDetailInputQty = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario, qty: number) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY DETAIL");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY DETAIL");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyInputQtyPromoItem(qty);
    };

    const freeItemMenu = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY DETAIL");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY DETAIL");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyAllQtyPromoItem();
    };

    const freeItemMenuInputQty = async (promotionList: PromotionListScenario, editOrder: EditOrderScenario, qty: number) => {
        await editOrder.escapeKeyboard();
        await editOrder.actionButtonFooter("Next");
        await promotionList.searchPromotion("FREE ITEM MENU CATEGORY DETAIL");
        await promotionList.selectPromotionDetail("FREE ITEM MENU CATEGORY DETAIL");
        await editOrder.actionButtonFooter("Apply");
        await promotionList.applyInputQtyPromoItem(qty);
    };

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0204053] Validate Logic When User Apply Promotion Head - Order Pages- Discount Bill Rp"
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

    test("[TC_0204053] Validate Logic When User Apply Promotion Head - Order Pages- Discount Bill Rp",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder,bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order,addOrder);
            await order.addPromotion();
            await promotionList.selectPromotion("BILL DISCOUNT RP");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204054] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204055] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU");
            await promotionList.selectPromotion("DISCOUNT % MENU");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204056] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204057] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204058] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU");
            await promotionList.selectPromotion("DISC LIMIT % MENU");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204059] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );
    test("[TC_0204060] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204061] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204062] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU");
            await promotionList.selectPromotion("MENU DISC RP MENU");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204063] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );
    test("[TC_0204064] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 12);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );
    test("[TC_0204065] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraWhisky(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 1000000);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204066] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 10);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204067] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("BILL DISCOUNT RP");
            await promotionList.selectPromotion("BILL DISCOUNT RP");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204068] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204069] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 15);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISCOUNT % MENU");
            await promotionList.selectPromotion("DISCOUNT % MENU");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204070] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204071] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204072] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISC LIMIT % MENU");
            await promotionList.selectPromotion("DISC LIMIT % MENU");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204073] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 9);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204074] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 5);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204075] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 5);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204076] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("MENU DISC RP MENU");
            await promotionList.selectPromotion("MENU DISC RP MENU");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204077] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204078] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 9);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
           await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204079] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 400000);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204080] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.AddPromo);
            await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 60);
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204081] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Bill Rp",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, quickServiceList,bookOrder}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 2);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("BILL DISCOUNT RP");
            await promotionList.selectPromotion("BILL DISCOUNT RP");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204082] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % All Category",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 7);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204083] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU");
            await promotionList.selectPromotion("DISCOUNT % MENU");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204084] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204085] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category Detail",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 6);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204086] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu",
        {tag: tags + "@negative"}, async ({order, promotionList, editOrder, addOrder, sideNavBar, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU");
            await promotionList.selectPromotion("DISC LIMIT % MENU");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204087] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204088] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder,addOrder,tableList,bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 8);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204089] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder,bookOrder, tableList,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204090] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            //TODO :
            // need to check tentative error on awaiting for response API contain /get-menu-package
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU");
            await promotionList.selectPromotion("MENU DISC RP MENU");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204091] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204092] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204093] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 10000);
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204094] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount %",
        {tag: tags + "@negative"}, async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList,bookOrder, quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 4);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMahal(order, addOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.addPromotion();
            await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
            await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 70);
            await order.saveOrder();
            await cancelOrderQuickService(order, sideNavBar, tableList, quickServiceList);
        }
    );

    test("[TC_0204094] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await freeItemAllCategory(promotionList, editOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204095] Validate Logic When User Apply Promotion - input Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
            await freeItemAllCategoryInputQty(promotionList, editOrder, 3);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204096] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await freeItemMenuCategory(promotionList, editOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204097] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 3);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name);
            await freeItemMenuCategoryInputQty(promotionList, editOrder, 2);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204098] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY DETAIL",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
            await freeItemMenuCategoryDetail(promotionList, editOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204100] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU CATEGORY DETAIL",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await freeItemMenuCategoryDetailInputQty(promotionList, editOrder, 5);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204101] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
            await freeItemMenu(promotionList, editOrder);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

    test("[TC_0204102] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU",
        {tag: tags + "@positive"}, async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder,quickServiceList}) => {

            await makeOrder("AT EXCLUSIVE", bookOrder,quickServiceList);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await orderSingleMenu(order);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectMenu(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name, 10);
            await orderMenuExtraAnggur(order, editOrder);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderMenuPaketMurah(order, addOrder);
            await order.clickMenuDetail(MenuList.atCategory.atMenuExtra.atMenuExtraAlpha.name);
            await freeItemMenuInputQty(promotionList, editOrder, 9);
            await order.saveOrder();
            await paymentPos.paymentType(PaymentObject.Cash);
            await paymentPos.paymentMethod(PaymentObject.CashPayment);
            await paymentPos.paymentCashFullAmount();
            await paymentPos.actionPayment(PaymentObject.ApplyPayment);
            await paymentPos.actionPayment(PaymentObject.SavePayment);
            await paymentPos.actionPayment(PaymentObject.ProcessPayment);
            await paymentPos.actionPayment(PaymentObject.ClosePayment);
        }
    );

});