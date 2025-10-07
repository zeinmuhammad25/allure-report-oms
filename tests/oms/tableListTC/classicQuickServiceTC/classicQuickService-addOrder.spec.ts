import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import OrderClassicScenario from "../../../../src/modules/oms/tableList/order/orderClassic.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import BookOrderClassicScenario from "../../../../src/modules/oms/tableList/components/bookOrderClassic/bookOrderClassic.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";
import {ToolsTabs} from "../../../../src/modules/oms/tools/ToolsTabs";
import SignPinLocator from "../../../../src/modules/oms/signPin/signPin.locator";

test.setTimeout(600000);
test.describe.serial("Quick Service Classic Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const selectMenuBiasa = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const selectMenuBiasaMultiple = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await orderClassic.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
        await orderClassic.selectMenu(MenuList.menus.atMenuBiasaRebus.name, quantity);
    };

    const selectMenuPaketMahal = async (orderClassic: OrderClassicScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuPaketMurah = async (orderClassic: OrderClassicScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMurah.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.bataviaBlended700ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.baileysOriginal700ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuExtraAlpa = async (addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await addOrderV2.selectPackageGroup("Menu Extra");
        await addOrderV2.extraCategory(MenuList.atCategory.name);
        await addOrderV2.modifyExtraPackage([
            {menuName: MenuList.menus.atMenuExtraAlpha.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuExtraBeta = async (addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await addOrderV2.selectPackageGroup("Menu Extra");
        await addOrderV2.extraCategory(MenuList.atCategory.name);
        await addOrderV2.modifyExtraPackage([
            {menuName: MenuList.menus.atMenuExtraBeta.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuPaketWithNotes = async (orderClassic: OrderClassicScenario, addOrderV2: AddOrderV2Scenario, quantity = 1, notes: string) => {
        await orderClassic.selectCategoryMenu(MenuList.atCategory.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await orderClassic.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {
                menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName,
                qty: quantity,
                notes: notes
            },
            {
                menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName,
                qty: quantity,
                notes: notes
            },
            {
                menuName: MenuList.menuPackages.sprite250ml.shortName,
                qty: quantity,
                notes: notes
            }
        ]);
    };

    const selectMenuExtra = async (addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await addOrderV2.selectPackageGroup("Menu Extra");
        await addOrderV2.extraCategory(MenuList.atCategory.name);
        await addOrderV2.modifyExtraPackage([
            {menuName: MenuList.menus.atMenuExtraAlpha.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuBiasaSpecialPrice = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
        await orderClassic.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName, quantity);
    };

    const selectMenuBiasaSpecialPriceMultiple = async (orderClassic: OrderClassicScenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
        await orderClassic.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName, quantity);
        await orderClassic.selectMenu(MenuList.menus.menuSpecialPriceOffers.shortName, quantity);
    };

    const selectMenuPaketSpecialPrice = async (orderClassic: OrderClassicScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await orderClassic.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.name);
        await orderClassic.selectMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.anggurHijauKawaKawa600ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurPutihOT620ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahOTGold620ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahKawaKawa600ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuPaketSpecialPriceNotes = async (orderClassic: OrderClassicScenario, addOrderV2: AddOrderV2Scenario, quantity = 1, notes: string) => {
        await orderClassic.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.name);
        await orderClassic.selectMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.anggurHijauKawaKawa600ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurPutihOT620ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurMerahOTGold620ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurMerahKawaKawa600ml.shortName, qty: quantity, notes: notes}
        ]);
    };

    const selectMenuOpenPrice = async (orderClassic: OrderClassicScenario, quantity: number = 1) => {
        await orderClassic.categoryNext(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryMenu(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atOpenPrice.atMenuBiasaOpenPrice.name);
        await orderClassic.selectMenu(MenuList.menus.menuOpenPriceChoices.shortName, quantity);
    };

    const selectMenuOpenPriceChoices = async (orderClassic: OrderClassicScenario, quantity: number = 1) => {
        await orderClassic.categoryNext(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryMenu(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atOpenPrice.atMenuBiasaOpenPrice.name);
        await orderClassic.selectMenu(MenuList.menus.menuOpenPriceChoices.shortName, quantity);
    };

    const selectMenuOpenPriceExclusive = async (orderClassic: OrderClassicScenario, quantity: number = 1) => {
        await orderClassic.categoryNext(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryMenu(MenuList.atOpenPrice.name);
        await orderClassic.selectCategoryDetailMenu(MenuList.atOpenPrice.atMenuBiasaOpenPrice.name);
        await orderClassic.selectMenu(MenuList.menus.menuOpenPriceExclusive.shortName, quantity);
    };

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrderClassic: BookOrderClassicScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await bookOrderClassic.setPax(2);
        await bookOrderClassic.selectSalesMode(salesMode);
        await bookOrderClassic.applyQuickService();
        await bookOrderClassic.skipCustomerPhoneNumber();
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
        await paymentV2.closePopUpPaymentSuccessFul();
    };

    test.beforeEach(async ({terminalID, signPin}) => {
        const testWithAuthentication = [
            "[TCAT_OMS_CQSBO_0001] Validate Logic When User Able To Add Menu Biasa",
            "[TCAT_OMS_CQSBO_0002] Validate Logic When User Able To Add Menu Paket",
            "[TCAT_OMS_CQSBO_0003] Validate Logic When User Able To Add Menu Extra",
            "[TCAT_OMS_CQSBO_0004] Validate Logic When User Able To Edit Qty Menu Biasa",
            "[TCAT_OMS_CQSBO_0005] Validate Logic When User Able To Edit Qty Menu Paket",
            "[TCAT_OMS_CQSBO_0006] Validate Logic When User Able To Edit Qty Menu Extra",
            "[TCAT_OMS_CQSBO_0007] Validate Logic When User Able To Delete Menu Biasa before Save Order",
            "[TCAT_OMS_CQSBO_0008] Validate Logic When User Able To Delete Menu Paket before Save Order",
            "[TCAT_OMS_CQSBO_0009] Validate Logic When User Able To Delete Menu Extra before Save Order",
            "[TCAT_OMS_CQSBO_0010] Validate Logic When User Able To Delete Menu Biasa after Save Order",
            "[TCAT_OMS_CQSBO_0011] Validate Logic When User Able To Delete Menu Paket after Save Order",
            "[TCAT_OMS_CQSBO_0012] Validate Logic When User Able To Delete Menu Extra after Save Order",
            "[TCAT_OMS_CQSBO_0013] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Increase Qty",
            "[TCAT_OMS_CQSBO_0014] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Increase Qty",
            "[TCAT_OMS_CQSBO_0015] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Increase Qty",
            "[TCAT_OMS_CQSBO_0016] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Decrease Qty",
            "[TCAT_OMS_CQSBO_0017] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Decrease Qty",
            "[TCAT_OMS_CQSBO_0018] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Decrease Qty",
            "[TCAT_OMS_CQSBO_0019] Validate Logic When User Able To Add Menu Biasa With Notes Before Save Order",
            "[TCAT_OMS_CQSBO_0020] Validate Logic When User Able To Add Menu Paket With Notes Before Save Order",
            "[TCAT_OMS_CQSBO_0021] Validate Logic When User Able To Add Menu Extra With Notes Before Save Order",
            "[TCAT_OMS_CQSBO_0022] Validate Logic When User Able To Edit Menu Biasa With Notes After Save Order",
            "[TCAT_OMS_CQSBO_0023] Validate Logic When User Able To Edit Menu Paket With Notes After Save Order",
            "[TCAT_OMS_CQSBO_0024] Validate Logic When User Able To Edit Menu Extra With Notes After Save Order",
            "[TCAT_OMS_CQSBO_0025] Validate Logic When User Able To Add Menu Biasa Special Price",
            "[TCAT_OMS_CQSBO_0026] Validate Logic When User Able To Edit Qty Menu Biasa Special Price",
            "[TCAT_OMS_CQSBO_0027] Validate Logic When User Able To Edit Qty Menu Biasa Special Price After Save",
            "[TCAT_OMS_CQSBO_0028] Validate Logic When User Able To Delete Menu Biasa Special Price Before Save",
            "[TCAT_OMS_CQSBO_0029] Validate Logic When User Able To Delete Menu Biasa Special Price After Save",
            "[TCAT_OMS_CQSBO_0030] Validate Logic When User Able To Add Menu Biasa Special Price With Notes Before Save",
            "[TCAT_OMS_CQSBO_0031] Validate Logic When User Able To Add Menu Biasa Special Price With Notes After Save",
            "[TCAT_OMS_CQSBO_0032] Validate Logic When User Able To Add Menu Paket Special Price",
            "[TCAT_OMS_CQSBO_0033] Validate Logic When User Able To Edit Qty Menu Paket Special Price",
            "[TCAT_OMS_CQSBO_0034] Validate Logic When User Able To Edit Qty Menu Paket Special Price After Save",
            "[TCAT_OMS_CQSBO_0035] Validate Logic When User Able To Delete Menu Paket Special Price Before Save",
            "[TCAT_OMS_CQSBO_0036] Validate Logic When User Able To Delete Menu Paket Special Price After Save",
            "[TCAT_OMS_CQSBO_0037] Validate Logic When User Able To Add Menu Paket Special Price With Notes Before Save",
            "[TCAT_OMS_CQSBO_0038] Validate Logic When User Able To Add Menu Paket Special Price With Notes After Save",
            "[TCAT_OMS_CQSBO_0039] Validate Logic When User Able To Add Menu Open Price",
            "[TCAT_OMS_CQSBO_0040] Validate Logic When User Able To Edit Qty Menu Open Price",
            "[TCAT_OMS_CQSBO_0041] Validate Logic When User Able To Edit Qty Menu Open Price After Save",
            "[TCAT_OMS_CQSBO_0042] Validate Logic When User Able To Delete Menu Open Price Before Save",
            "[TCAT_OMS_CQSBO_0043] Validate Logic When User Able To Delete Menu Open Price After Save",
            "[TCAT_OMS_CQSBO_0044] Validate Logic When User Able To Add Menu Open Price With Notes Before Save",
            "[TCAT_OMS_CQSBO_0045] Validate Logic When User Able To Add Menu Open Price With Notes After Save",
            "[TCAT_OMS_CQSBO_0046] Validate Logic When User Able To Add Menu Extra Special Price",
            "[TCAT_OMS_CQSBO_0047] Validate Logic When User Able To Edit Qty Menu Extra Special Price",
            "[TCAT_OMS_CQSBO_0048] Validate Logic When User Able To Edit Qty Menu Extra Special Price After Save",
            "[TCAT_OMS_CQSBO_0049] Validate Logic When User Able To Delete Menu Extra Special Price Before Save",
            "[TCAT_OMS_CQSBO_0050] Validate Logic When User Able To Delete Menu Extra Special Price After Save",
            "[TCAT_OMS_CQSBO_0051] Validate Logic When User Able To Add Menu Extra Special Price With Notes Before Save",
            "[TCAT_OMS_CQSBO_0052] Validate Logic When User Able To Add Menu Extra Special Price With Notes After Save"
        ];

        if (testWithAuthentication.includes(test.info().title)) {
            await terminalID.goHere();
            await terminalID.performTerminalID();
            await signPin.inputPinByTouch("22");
            await signPin.validateShowStarCashClassic("20.000");
            await signPin.storeAuthState();
        }
        //await tableList.goHere();

    });

    test.afterEach(async ({tableList}) => {
        await Promise.all([
            tableList.cancelAllQuickServices()
        ]);
    });


    test("[TCAT_OMS_CQSBO_0001] Validate Logic When User Able To Add Menu Biasa",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic, 3);
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0002] Validate Logic When User Able To Add Menu Paket",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0003] Validate Logic When User Able To Add Menu Extra",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2)
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0004] Validate Logic When User Able To Edit Qty Menu Biasa",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic);
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0005] Validate Logic When User Able To Edit Qty Menu Paket",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0006] Validate Logic When User Able To Edit Qty Menu Extra",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2,2)
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0007] Validate Logic When User Able To Delete Menu Biasa before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic);
                await orderClassic.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await orderClassic.validateMenuNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            }, {quickServiceList, bookOrderClassic, orderClassic}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0008] Validate Logic When User Able To Delete Menu Paket before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.deleteMenu(MenuList.menus.atMenuPaketMahal.name);
                await orderClassic.validateMenuNotVisible(MenuList.menus.atMenuPaketMahal.name);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0009] Validate Logic When User Able To Delete Menu Extra before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2)
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.deleteMenu(MenuList.menus.atMenuPaketMahal.name);
                await orderClassic.validateMenuNotVisible(MenuList.menus.atMenuPaketMahal.name);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0010] Validate Logic When User Able To Delete Menu Biasa after Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaMultiple(orderClassic);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0011] Validate Logic When User Able To Delete Menu Paket after Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await selectMenuPaketMurah(orderClassic, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0012] Validate Logic When User Able To Delete Menu Extra after Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2,2)
                await addOrderV2.addToCartMenuDetailPackage();
                await selectMenuPaketMurah(orderClassic, addOrderV2);
                await selectMenuExtraBeta(addOrderV2,2)
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0013] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic, 5);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([2]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0014] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2, 3);
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([2]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0015] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar,addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2, 5);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await selectMenuExtraAlpa(addOrderV2, 2);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0016] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic, 5);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([-3]);
                await editOrderV2.actionUpdate();
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, sideNavBar, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0017] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await addOrderV2.modifyHeadPackage([7]);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([-4]);
                await editOrderV2.actionUpdate();
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, sideNavBar, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0018] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketMahal(orderClassic, addOrderV2);
                await selectMenuExtraAlpa(addOrderV2,5);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await selectMenuExtraAlpa(addOrderV2, -3);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0019] Validate Logic When User Able To Add Menu Biasa With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic);
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.inputMenuNotesSingelMenu("COBA AT");
                await editOrderV2.actionUpdate();
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0020] Validate Logic When User Able To Add Menu Paket With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketWithNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0021] Validate Logic When User Able To Add Menu Extra With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketWithNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await selectMenuExtra(addOrderV2,4);
                await addOrderV2.inputMenuNotesPackageHead("COBA COBA ");
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0022] Validate Logic When User Able To Edit Menu Biasa With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasa(orderClassic);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.disableInputMenuNotesSingelMenu();
                await editOrderV2.escapeKeyboardV2();
                await editOrderClassic.actionCancelV2();
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0023] Validate Logic When User Able To Edit Menu Paket With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketWithNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.disableInputMenuNotesPackageHead();
                await editOrderV2.escapeKeyboardV2();
                await editOrderClassic.actionCancelV2();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0024] Validate Logic When User Able To Edit Menu Extra With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketWithNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.disableInputMenuNotesPackageHead();
                await editOrderV2.escapeKeyboardV2();
                await editOrderClassic.actionCancelV2();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, sideNavBar, editOrderClassic, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0025] Validate Logic When User Able To Add Menu Biasa Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic, 3);
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0026] Validate Logic When User Able To Edit Qty Menu Biasa Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic);
                await orderClassic.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.modifyEditHeadPackage([15]);
                await editOrderV2.actionUpdate();
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0027] Validate Logic When User Able To Edit Qty Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic,10);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.modifyEditHeadPackage([-7]);
                await editOrderV2.actionUpdate();
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0028] Validate Logic When User Able To Delete Menu Biasa Special Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic, 3);
                await orderClassic.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
                await orderClassic.validateMenuNotVisible(MenuList.menus.menuSpecialPriceDelights.shortName);
            }, {quickServiceList, bookOrderClassic, orderClassic}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0029] Validate Logic When User Able To Delete Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPriceMultiple(orderClassic,3);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.menus.menuSpecialPriceDelights.name);
                await orderClassic.cancelMenuAfterSave("CANCEL MENU AFTER SAVE");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0030] Validate Logic When User Able To Add Menu Biasa Special Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic, 5);
                await orderClassic.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.inputMenuNotesSingelMenu("COBA NOTES BEFORE SAFE SPECIAL PRICE");
                await editOrderV2.actionUpdate();
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0031] Validate Logic When User Able To Add Menu Biasa Special Price With Notes After Save",
        {tag: tag + "@negative"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, editOrderClassic, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, editOrderClassic, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuBiasaSpecialPrice(orderClassic);
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.disableInputMenuNotesSingelMenu();
                await editOrderV2.escapeKeyboardV2();
                await editOrderClassic.actionCancelV2();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, editOrderClassic, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0032] Validate Logic When User Able To Add Menu Paket Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0033] Validate Logic When User Able To Edit Qty Menu Paket Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
                await editOrderV2.modifyEditHeadPackage([5]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0034] Validate Logic When User Able To Edit Qty Menu Paket Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
                await editOrderV2.modifyEditHeadPackage([5]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
                await editOrderV2.modifyEditHeadPackage([-3]);
                await editOrderV2.actionUpdate();
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0035] Validate Logic When User Able To Delete Menu Paket Special Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await orderClassic.deleteMenu(MenuList.menus.menuPaketSpecialSelections.shortName);
                await orderClassic.validateMenuNotVisible(MenuList.menus.menuSpecialPriceDelights.shortName);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0036] Validate Logic When User Able To Delete Menu Paket Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, sideNavBar ,tableList, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, sideNavBar, tableList, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.menus.menuPaketSpecialSelections.shortName);
                await orderClassic.validateMenuNotVisible(MenuList.menus.menuSpecialPriceDelights.shortName);
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await orderClassic.confirmationCloseOrder("Yes");
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, sideNavBar ,tableList, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0037] Validate Logic When User Able To Add Menu Paket Special Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPriceNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.inputMenuNotesPackageHead("COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0038] Validate Logic When User Able To Add Menu Paket Special Price With Notes After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, orderClassic, addOrderV2, paymentV2, sideNavBar, editOrderClassic, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, orderClassic, addOrderV2, paymentV2, sideNavBar, editOrderClassic, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketSpecialPriceNotes(orderClassic, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.inputMenuNotesPackageHead("COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
                await editOrderV2.escapeKeyboardV2();
                await editOrderV2.disableInputMenuNotesAddedPackageHead();
                await editOrderClassic.actionCancelV2();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, orderClassic, addOrderV2, paymentV2, sideNavBar, editOrderClassic, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0039] Validate Logic When User Able To Add Menu Open Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0040] Validate Logic When User Able To Edit Qty Menu Open Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await orderClassic.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
                await editOrderV2.modifyEditHeadPackage([5]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0041] Validate Logic When User Able To Edit Qty Menu Open Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
                await editOrderV2.modifyEditHeadPackage([5]);
                await editOrderV2.actionUpdate();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, tableList}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0042] Validate Logic When User Able To Delete Menu Open Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await orderClassic.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName);
                await orderClassic.validateMenuNotVisible(MenuList.menus.menuOpenPriceChoices.shortName);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0043] Validate Logic When User Able To Delete Menu Open Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPriceChoices(orderClassic); //Menu 1
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await selectMenuOpenPriceExclusive(orderClassic); //Menu 2
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await new Promise(resolve => setTimeout(resolve, 1000));

                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName); //Delete Menu 1
                await orderClassic.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, sideNavBar, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0044] Validate Logic When User Able To Add Menu Open Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.inputNoteMenuOpenPrice("TEST NOTES OPEN PRICE");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0045] Validate Logic When User Able To Add Menu Open Price With Notes After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, editOrderClassic}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, editOrderClassic}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuOpenPrice(orderClassic);
                await editOrderV2.inputPriceMenuOpenPrice("100.000");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.applyOpenPrice();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await sideNavBar.gotoPageTableList();
                await quickServiceList.clickLastSalesNum();
                await orderClassic.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
                await editOrderV2.disableInputMenuNotesSingelMenu();
                await editOrderV2.escapeKeyboardV2();
                await editOrderClassic.actionCancelV2();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, editOrderV2, paymentV2, sideNavBar, editOrderClassic}, testInfo);
        });

    test("[TCAT_OMS_CQSBO_0046] Validate Logic When User Able To Add Menu Extra Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrderClassic, quickServiceList);
                await selectMenuPaketSpecialPrice(orderClassic, addOrderV2, 2);
                await selectMenuExtra(addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await new Promise(resolve => setTimeout(resolve, 1000));
                await orderClassic.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrderClassic, orderClassic, addOrderV2, paymentV2}, testInfo);
        });

});