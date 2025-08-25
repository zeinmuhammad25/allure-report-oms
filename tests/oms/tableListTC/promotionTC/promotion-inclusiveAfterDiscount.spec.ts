import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import {ToolsTabs} from "../../../../src/modules/oms/tools/ToolsTabs";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";

test.setTimeout(200000);
test.describe.serial("Promotion Inclusive After Discount", () => {

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
            "[TC_0205442] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp"
        ];
        if (testWithAuthentication.includes(test.info().title)) {
            if (!calculationActivated) {
                await order.calculationAfterDiscount(265);
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
                await order.activatePosFilterAccess();
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

    test("[TC_0205442] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,2,2,2)
                await order.addPromotion();
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205443] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,2,2,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205444] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
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
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205445] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
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
                await orderSingleMenu(order,3,4,6)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205446] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
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
                await orderSingleMenu(order,6,4,6)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205447] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
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
                await orderSingleMenu(order,6,4,6)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205448] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,4,6)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205449] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,3,2)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205450] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,6,2)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205451] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
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
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205452] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
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
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205453] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
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

    test("[TC_0205454] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,10,10,10)
                await order.addPromotion();
                await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 1000000);
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205455] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,2,2,2)
                await order.addPromotion();
                await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 75);
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205456] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
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
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205457] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,6,6)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205458] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
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
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205459] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
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
                await orderSingleMenu(order,6,6,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205460] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,4,4,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205461] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,9,9,9)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205462] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,4,4,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205463] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,4,9)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205464] Validate Logic When User Apply Promotion Head - Payment Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,6,6)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205465] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,4,3,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU");
                await promotionList.selectPromotion("MENU DISC RP MENU");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205466] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,10,11,12)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205467] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,9,9,9)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205468] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,10,10,10)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 400000);
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205469] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,4,3,4)
                await order.saveOrder();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 60);
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205470] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM ALL CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205471] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,7,7)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU CATEGORY");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205472] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY DETAIL",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205473] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU",
        {tag: tags + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,6,6)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205474] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount Bill Rp",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,11,11,11)
                await order.deleteMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
                await order.addPromotion();
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205475] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount % All Category",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,7,7)
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205476] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount % Menu",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205477] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount % Menu Category",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205478] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount % Menu Category Detail",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205479] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount Limit % Menu",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaGoreng.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205480] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205481] Validate Logic When User Apply Promotion Head Then Cancel 1 Menu - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@negative"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await makeOrder("AT INCLUSIVE", bookOrder, quickServiceList);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.deleteMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaRebus.name);
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

});