import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import SideNavBarScenario from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.scenario";
import TableListScenario from "../../../../src/modules/oms/tableList/tableList.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import {ToolsTabs} from "../../../../src/modules/oms/tools/ToolsTabs";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import EditOrderV2Scenario
    from "../../../../src/modules/oms/tableList/order/components/editOrderV2/editOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(200000);
test.describe.serial("Quick Service Promotion", () => {

    const tags = "@smokeTest @oms @applyPromotion ";

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await quickServiceList.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const orderSingleMenu = async (order: OrderScenario, qty1: number, qty2: number, qty3: number) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name, qty1);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name, qty2);
        await order.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name, qty3);
    };

    const selectMenuExtra = async (addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await addOrderV2.selectPackageGroup("Menu Extra");
        await addOrderV2.extraCategory(MenuList.atCategory.name);
        await addOrderV2.modifyExtraPackage([
            {menuName: MenuList.menus.atMenuExtraAlpha.shortName, qty: quantity, notes: null}
        ]);
    };

    const orderMenuPaketMurah = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.captainMorgan200ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.icelandVodka250ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const orderMenuPaketMahal = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: quantity, notes: null}
        ]);
    };


    const cancelOrderQuickService = async (
        order: OrderScenario, sideNavBar: SideNavBarScenario, tableList: TableListScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await sideNavBar.gotoPageTableList();
        await tableList.gotoQuickService();
        await quickServiceList.selectSalesNum("last");
        await order.cancelTable("CANCEL");
        await order.confirmationCloseTable("Yes");
    };

    const freeItemAllCategory = async (editOrderV2: EditOrderV2Scenario) => {
        await editOrderV2.addPromotionMenu();
        await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM ALL CATEGORY");
    };

    const freeItemMenuCategory = async (editOrderV2: EditOrderV2Scenario) => {
        await editOrderV2.addPromotionMenu();
        await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU CATEGORY");
    };

    const freeItemMenuCategoryDetail = async (editOrderV2: EditOrderV2Scenario) => {
        await editOrderV2.addPromotionMenu();
        await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU CATEGORY DETAIL");
    };

    const freeItemMenu = async (editOrderV2: EditOrderV2Scenario) => {
        await editOrderV2.addPromotionMenu();
        await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU");
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
        await paymentV2.closePopUpPaymentSuccessFul();
    };

    const paymentQrESB = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Card);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.QrisEsbPayment);
        await paymentV2.paymentQrisEsb(265);
    };

    let featuresActivated = false;
    let calculationActivated = false;
    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar, tools, synchronizeData, order}) => {
        const testWithAuthentication = [
            "[TC_0205390] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp"
        ];
        if (testWithAuthentication.includes(test.info().title)) {
            if (!calculationActivated) {
                await order.calculationBeforeDiscount(265);
                calculationActivated = true;
            }
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCash("20.000");
            await signPin.storeAuthState();
            await sideNavBar.gotoPageTools();
            await tools.selectTab(ToolsTabs.SynchronizeData);
            await synchronizeData.synchronizeDataBranchSetting();
            await synchronizeData.closePopUpAfterSync();
            await sideNavBar.selectStation("KASIR");
            if (!featuresActivated) {
                await order.activateOrderingV2();
                await order.activatePaymentV2();
                featuresActivated = true;
            }
        }
        await tableList.goHere();
    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205390] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,1,1,1)
                await order.addPromotion();
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });


    test("[TC_0205391] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
            {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
                await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                    await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                    await order.selectCategoryMenu(MenuList.atCategory.name);
                    await orderMenuPaketMahal(order, addOrderV2);
                    await selectMenuExtra(addOrderV2, 2);
                    await addOrderV2.addToCartMenuDetailPackage();
                    await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                    await orderSingleMenu(order,1,1,1)
                    await order.addPromotion();
                    await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                    await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                    await order.saveOrder();
                    await paymentQrESB(paymentV2);
                }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205392] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,1,1,1)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205393] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205394] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205395] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205396] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205397] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205398] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,5,5)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205399] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,5,5)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU");
                await promotionList.selectPromotion("MENU DISC RP MENU");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205400] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,2,1)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205401] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,3,2,1)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205402] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.addPromotion();
                await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 1000000);
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205403] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.addPromotion();
                await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 50);
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205404] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205405] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,5,5)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205406] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,4,4,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0204070] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204071] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204072] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204073] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204074] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204075] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp All Category",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204076] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204077] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204078] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204079] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount Rp",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204080] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount %",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204081] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Bill Rp",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, quickServiceList, bookOrder}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204082] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % All Category",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204083] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204084] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204085] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount % Menu Category Detail",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204086] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu",
        {tag: tags + "@negative"},
        async ({order, promotionList, editOrder, addOrder, sideNavBar, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204087] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204088] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204089] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, bookOrder, tableList, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204090] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204091] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204092] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204093] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204094] Validate Logic When User Apply Promotion Head Then Cancel Order - Order Pages - Open Bill Dicount %",
        {tag: tags + "@negative"},
        async ({order, sideNavBar, promotionList, editOrder, addOrder, tableList, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204094] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204095] Validate Logic When User Apply Promotion - input Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204096] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204097] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204098] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY DETAIL",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204100] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU CATEGORY DETAIL",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204101] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

    test("[TC_0204102] Validate Logic When User Apply Promotion - input Qty - FREE ITEM MENU",
        {tag: tags + "@positive"},
        async ({order, paymentPos, promotionList, editOrder, addOrder, bookOrder, quickServiceList}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
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
        });

});