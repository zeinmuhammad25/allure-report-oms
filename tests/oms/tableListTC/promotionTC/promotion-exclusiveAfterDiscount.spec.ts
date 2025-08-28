import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import {PaymentObject} from "../../../../src/modules/oms/tableList/payment/PaymentObject";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import {ToolsTabs} from "../../../../src/modules/oms/tools/ToolsTabs";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";
import Table from "../../../../src/modules/oms/objects/table";

test.setTimeout(200000);
test.describe.serial("Promotion Exclusive After Discount", () => {

    const tags = "@smokeTest @oms @applyPromotion ";

    const makeOrder = async (salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.bookAndOrder();
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
           "[TC_0205545] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp"
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
                await order.activatePosFilterAccess()
                await order.activateOrderingV2();
                await order.activatePaymentV2();
                featuresActivated = true;
            }
        }
        await tableList.goHere();
    });

    test.afterEach(async ({tableList,}) => {
        await Promise.all([
            tableList.cancelAllQuickServices(),
            tableList.cancelAllTables()
        ]);
    });

    test("[TC_0205545] Validate Logic When User Apply Promotion Head - Order Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.addPromotion();
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205546] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % All Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
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
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205547] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,4,3)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205548] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,7,7)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU");
                await promotionList.selectPromotion("DISCOUNT % MENU");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205549] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,6,7)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205550] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.addPromotion();
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205551] Validate Logic When User Apply Promotion Head - Order Pages - Type: Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205552] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,7,8)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205553] Validate Logic When User Apply Promotion Head - Order Pages - Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,12,12,12)
                await order.addPromotion();
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205554] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,11,11,11)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205555] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,7,7)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU");
                await promotionList.selectPromotion("MENU DISC RP MENU");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205556] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,5,6,7)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205557] Validate Logic When User Apply Promotion Head - Order Pages - Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,7,6)
                await order.addPromotion();
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205558] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
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
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205559] Validate Logic When User Apply Promotion Head - Order Pages - Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
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
                await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 50);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205560] Validate Logic When User Apply Promotion Head - Payment Pages - Discount Bill Rp",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
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
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("BILL DISCOUNT RP");
                await promotionList.selectPromotion("BILL DISCOUNT RP");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205561] Validate Logic When User Apply Promotion Head - Payment Pages - Discount % All Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,8,7)
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % ALL CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % ALL CATEGORY");
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205562] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,6,5)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205563] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount % Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISCOUNT % MENU CATEGORY DETAIL");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205564] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,6,7)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU");
                await promotionList.selectPromotion("DISC LIMIT % MENU");
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205565] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,9,8,7)
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205566] Validate Logic When User Apply Promotion Head - Payment Pages -  Discount Limit % Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,9,8,7)
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("DISC LIMIT % MENU CATEGORY DETAIL");
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205567] Validate Logic When User Apply Promotion Head - Payment Pages - Menu Discount Rp All Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,8,8)
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP ALL CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP ALL CATEGORY");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205568] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,6,6,7)
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU");
                await promotionList.selectPromotion("MENU DISC RP MENU");
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205568] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,8,9,10)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY");
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205569] Validate Logic When User Apply Promotion Head - Payment Pages -  Menu Discount Rp Menu Category Detail",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,11,11,11)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await promotionList.selectPromotion("MENU DISC RP MENU CATEGORY DETAIL");
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205570] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount Rp",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,7,4,2)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("OPEN BILL DISCOUNT RP");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT RP", 400000);
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205571] Validate Logic When User Apply Promotion Head - Payment Pages -  Open Bill Dicount %",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}) => {
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,11,12,13)
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentV2.paymentType(PaymentObject.AddPromo);
                await promotionList.searchPromotion("OPEN BILL DISCOUNT %");
                await promotionList.selectPromotion("OPEN BILL DISCOUNT %", 60);
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, promotionList}, testInfo);
        });

    test("[TC_0205572] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM ALL CATEGORY",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,11,11,11)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM ALL CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205573] Validate Logic When User Apply Promotion - Apply All Qty - FREE ITEM MENU CATEGORY",
        {tag: tags + "@positive"}, async ({tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await makeOrder("AT EXCLUSIVE", bookOrder);
                await order.selectCategoryMenu(MenuList.atCategory.name);
                await orderMenuPaketMahal(order, addOrderV2,2);
                await selectMenuExtra(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderMenuPaketMurah(order, addOrderV2,2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
                await orderSingleMenu(order,1,1,1)
                await order.clickMenuDetail(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("FREE ITEM MENU CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentQrESB(paymentV2);
            }, {tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

});