import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import QuickServiceListScenario from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import {safeTest} from "../../../../src/base/utils/safeTest";

test.setTimeout(600000);
test.describe.serial("Quick Service Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";

    const selectMenuBiasa = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
        await order.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, quantity);
    };

    const selectMenuPaket = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuPaketWithNotes = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1, notes: string) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {
                menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName,
                qty: quantity,
                notes: notes
            },
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

    const selectMenuBiasaSpecialPrice = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
        await order.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName, quantity);
    };

    const selectMenuPaketSpecialPrice = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.name);
        await order.selectMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.anggurHijauKawaKawa600ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurPutihOT620ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahOTGold620ml.shortName, qty: quantity, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahKawaKawa600ml.shortName, qty: quantity, notes: null}
        ]);
    };

    const selectMenuPaketSpecialPriceNotes = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1, notes: string) => {
        await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.name);
        await order.selectMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        await addOrderV2.modifyDetailPackage([
            {menuName: MenuList.menuPackages.anggurHijauKawaKawa600ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurPutihOT620ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurMerahOTGold620ml.shortName, qty: quantity, notes: notes},
            {menuName: MenuList.menuPackages.anggurMerahKawaKawa600ml.shortName, qty: quantity, notes: notes}
        ]);
    };

    // const selectMenuExtraSpecialPrice = async (order: OrderScenario, isWithQuantity = false, quantity = 1) => {
    //     await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
    //     await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuExtraSpecialPrice.name);
    //     if (isWithQuantity) {
    //         await order.selectMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName, quantity);
    //     } else {
    //         await order.selectMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName);
    //     }
    // };

    const selectMenuOpenPrice = async (order: OrderScenario, quantity: number = 1) => {
        await order.selectCategoryMenu(MenuList.atOpenPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atOpenPrice.atMenuBiasaOpenPrice.name);
        await order.selectMenu(MenuList.menus.menuOpenPriceChoices.shortName, quantity);
    };

    // const selectExtraMenuItems = async (editOrder: EditOrderScenario) => {
    //     await editOrder.selectMenuExtraCategory(MenuList.anggur.name);
    //     await editOrder.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
    //     await editOrder.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
    // };

    // const selectExtraMenuItemsSpecial = async (editOrder: EditOrderScenario) => {
    //     await editOrder.selectMenuExtraCategory(MenuList.whisky.name);
    //     await editOrder.selectMenuExtra(MenuList.menus.bataviaBlended700ml.shortName);
    //     await editOrder.selectMenuExtra(MenuList.menus.gilbeysWhisky350ml.shortName);
    //     await editOrder.selectMenuExtra(MenuList.menus.pennyPacker700ml.shortName);
    // };

    const makeOrder = async (
        salesMode: "AT EXCLUSIVE" | "AT INCLUSIVE", bookOrder: BookOrderScenario, quickServiceList: QuickServiceListScenario
    ) => {
        await quickServiceList.addOrderQuickService();
        await bookOrder.setPax(2);
        await bookOrder.selectSalesMode(salesMode);
        await bookOrder.applyQuickService();
        await bookOrder.skipCustomerPhoneNumber();
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

    test.beforeEach(async ({terminalID, signPin, tableList, sideNavBar}) => {
        const testWithAuthentication = [
            "[TC_0205264] Validate Logic When User Able To Add Menu Biasa"
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
            tableList.cancelAllQuickServices()
        ]);
    });


    test("[TC_0205264] Validate Logic When User Able To Add Menu Biasa",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205265] Validate Logic When User Able To Add Menu Paket",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205266] Validate Logic When User Able To Add Menu Extra",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2)
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205267] Validate order list ketika user update dengan pilih promo dan back MENU BIASA",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, sideNavBar, tableList, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, sideNavBar, tableList, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, sideNavBar, tableList, editOrderV2}, testInfo);
        });

    test("[TC_0205268] Validate fungsi suggestion notes saat pertama kali membuka pop-up menu BIASA",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.selectSuggestionNotes("COBA AT", "COBA 1");
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205269] Validate logic ketika user mengisi notes dengan > 10 character MENU PAKET ",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA NOTES MENU");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205270] Validate logic button Apply Promo ketika user berhasil melakukan Apply Promo ",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2, 2);
                await addOrderV2.addPromotionMenu();
                await addOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205271] Validate logic button Apply Promo ketika user berhasil melakukan Apply Promo ",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA 1");
                await addOrderV2.addPromotionMenu();
                await addOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205272] Validate Logic When User Able To Edit Qty Menu Biasa",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order);
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205273] Validate Logic When User Able To Edit Qty Menu Paket",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205274] Validate Logic When User Able To Edit Qty Menu Extra",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2,2)
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205275] Validate Logic When User Able To Delete Menu Biasa Sebelum Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order);
                await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.validateMenuNotVisible(MenuList.menus.atMenuBiasaGoreng.name);
            }, {quickServiceList, bookOrder, order}, testInfo);
        });

    test("[TC_0205276] Validate Logic When User Able To Delete Menu Paket Sebelum Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.deleteMenu(MenuList.menus.atMenuPaketMahal.name);
                await order.validateMenuNotVisible(MenuList.menus.atMenuPaketMahal.name);
            }, {quickServiceList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205277] Validate Logic When User Able To Delete Menu Extra Sebelum Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2)
                await addOrderV2.addToCartMenuDetailPackage();
                await order.deleteMenu(MenuList.menus.atMenuPaketMahal.name);
                await order.validateMenuNotVisible(MenuList.menus.atMenuPaketMahal.name);
            }, {quickServiceList, bookOrder, order, addOrderV2}, testInfo);
        });

    test("[TC_0205278] Validate Logic When User Able To Delete Menu Biasa Sesudah Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList}, testInfo);
        });

    test("[TC_0205279] Validate Logic When User Able To Delete Menu Paket Sesudah Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}, testInfo);
        });

    test("[TC_0205280] Validate Logic When User Able To Delete Menu Extra Sesudah Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2,2)
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await order.confirmationCloseTable("Yes");
            }, {quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, addOrderV2}, testInfo);
        });

    test("[TC_0205281] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 3);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}, testInfo);
        });

    test("[TC_0205282] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([3]);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205283] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await selectMenuExtra(addOrderV2, 3);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205284] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order, 5);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.modifyEditHeadPackage([-3]);
                await editOrderV2.actionUpdate();
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, sideNavBar, order, editOrderV2, tableList, paymentV2}, testInfo);
        });

    test("[TC_0205285] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.modifyHeadPackage([7]);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.modifyEditHeadPackage([-4]);
                await editOrderV2.actionUpdate();
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, sideNavBar, tableList, bookOrder, order, addOrderV2, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205286] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(addOrderV2,4);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await selectMenuExtra(addOrderV2, -3);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, editOrderV2, sideNavBar, tableList, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205287] Validate Logic When User Able To Add Menu Biasa With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, editOrderV2, paymentV2}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
            await selectMenuBiasa(order);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrderV2.inputMenuNotesSingelMenu("COBA AT");
            await editOrderV2.actionUpdate();
            await order.saveOrder();
            await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, editOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205288] Validate Logic When User Able To Add Menu Paket With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205289] Validate Logic When User Able To Add Menu Extra With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, addOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await selectMenuExtra(addOrderV2,4);
                await addOrderV2.inputMenuNotesPackageHead("COBA COBA ");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205290] Validate Logic When User Able To Edit Menu Biasa With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasa(order);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.disableInputMenuNotesSingelMenu();
                await editOrderV2.escapeKeyboardV2();
                await editOrderV2.actionCancel();
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205291] Validate Logic When User Able To Edit Menu Paket With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.disableInputMenuNotesPackageHead();
                await editOrderV2.escapeKeyboardV2();
                await editOrderV2.actionCancel();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205292] Validate Logic When User Able To Edit Menu Extra With Notes After Save Order",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuPaketWithNotes(order, addOrderV2, 2, "COBA COBA NOTES BEFORE SAFE");
                await selectMenuExtra(addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
                await editOrderV2.disableInputMenuNotesPackageHead();
                await editOrderV2.escapeKeyboardV2();
                await editOrderV2.actionCancel();
                await order.saveOrder();
                await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, sideNavBar, tableList, editOrderV2, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205293] Validate Logic When User Able To Add Menu Biasa Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2}) => {
            await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
            await selectMenuBiasaSpecialPrice(order, 3);
            await order.saveOrder();
            await paymentQrESB(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2}, testInfo);
        });

    test("[TC_0205294] Validate Logic When User Able To Edit Qty Menu Biasa Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasaSpecialPrice(order);
                await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.modifyEditHeadPackage([15]);
                await editOrderV2.actionUpdate();
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, editOrderV2}, testInfo);
        });

    test("[TC_0205295] Validate Logic When User Able To Edit Qty Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order, paymentV2, editOrderV2, sideNavBar, tableList}) => {
                await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
                await selectMenuBiasaSpecialPrice(order,10);
                await order.saveOrder();
                await sideNavBar.gotoPageTableList();
                await tableList.gotoQuickService();
                await quickServiceList.clickLastSalesNum();
                await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.name);
                await editOrderV2.modifyEditHeadPackage([-7]);
                await editOrderV2.actionUpdate();
                await order.cancelMenuAfterSave("CANCEL MENU");
                await editOrderV2.escapeKeyboard();
                await editOrderV2.actionButtonFooter("Apply");
                await order.saveOrder();
                await paymentCashFull(paymentV2);
            }, {quickServiceList, bookOrder, order, paymentV2, editOrderV2, sideNavBar, tableList}, testInfo);
        });

    test("[TC_0205296] Validate Logic When User Able To Delete Menu Biasa Special Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order},testInfo) => {
            await safeTest(async ({quickServiceList, bookOrder, order}) => {await makeOrder("AT EXCLUSIVE", bookOrder, quickServiceList);
            await selectMenuBiasaSpecialPrice(order,3);
            await order.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await order.validateMenuNotVisible(MenuList.menus.menuSpecialPriceDelights.shortName);
            }, {quickServiceList, bookOrder, order}, testInfo);
        });

    test("[TC_0204029] Validate Logic When User Able To Delete Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuBiasaSpecialPrice(order);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU SPECIAL PRICE");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        });

    test("[TC_0204030] Validate Logic When User Able To Add Menu Biasa Special Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuBiasaSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.inputNotesMenu("Notes Menu Single Special Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204031] Validate Logic When User Able To Add Menu Biasa Special Price With Notes After Save",
        {tag: tag + "@negative"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuBiasaSpecialPrice(order);
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0204032] Validate Logic When User Able To Add Menu Paket Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrder, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204033] Validate Logic When User Able To Edit Qty Menu Paket Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrder, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204034] Validate Logic When User Able To Edit Qty Menu Paket Special Price After Save",
        {tag: tag + "@positive"}, async ({
                                             quickServiceList,
                                             bookOrder,
                                             order,
                                             addOrder,
                                             editOrder,
                                             sideNavBar,
                                             tableList
                                         }) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Back");
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty Special Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204035] Validate Logic When User Able To Delete Menu Paket Special Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrder, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.deleteMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
            await order.validateMenuNotVisible(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        });

    test("[TC_0204036] Validate Logic When User Able To Delete Menu Paket Special Price After Save",
        {tag: tag + "@positive"}, async ({
                                             quickServiceList,
                                             bookOrder,
                                             order,
                                             addOrder,
                                             editOrder,
                                             sideNavBar,
                                             tableList
                                         }) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.deleteMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        });

    test("[TC_0204037] Validate Logic When User Able To Add Menu Paket Special Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, addOrder, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Back");
            await editOrder.inputNotesMenu("Notes Menu Package Special Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204038] Validate Logic When User Able To Add Menu Paket Special Price With Notes After Save",
        {tag: tag + "@negative"}, async ({
                                             quickServiceList,
                                             bookOrder,
                                             order,
                                             addOrder,
                                             editOrder,
                                             sideNavBar,
                                             tableList
                                         }) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0204039] Validate Logic When User Able To Add Menu Open Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204040] Validate Logic When User Able To Edit Qty Menu Open Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204041] Validate Logic When User Able To Edit Qty Menu Open Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty Open Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204042] Validate Logic When User Able To Delete Menu Open Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName);
            await order.validateMenuNotVisible(MenuList.menus.menuOpenPriceChoices.shortName);
        });

    test("[TC_0204043] Validate Logic When User Able To Delete Menu Open Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU OPEN PRICE");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        });

    test("[TC_0204044] Validate Logic When User Able To Add Menu Open Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.inputNotesOpenPrice("Notes Open Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204045] Validate Logic When User Able To Add Menu Open Price With Notes After Save",
        {tag: tag + "@negative"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0204046] Validate Logic When User Able To Add Menu Extra Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204047] Validate Logic When User Able To Edit Qty Menu Extra Special Price",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204048] Validate Logic When User Able To Edit Qty Menu Extra Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty Menu special price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204049] Validate Logic When User Able To Delete Menu Extra Special Price Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.deleteMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await order.validateMenuNotVisible(MenuList.menus.menuExtraSpecialFriedRice.shortName);
        });

    test("[TC_0204050] Validate Logic When User Able To Delete Menu Extra Special Price After Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.deleteMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU OPEN PRICE");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await order.confirmationCloseTable("Yes");
        });

    test("[TC_0204051] Validate Logic When User Able To Add Menu Extra Special Price With Notes Before Save",
        {tag: tag + "@positive"}, async ({quickServiceList, bookOrder, order, editOrder}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.escapeKeyboard();
            await editOrder.inputNotesMenu("Notes Menu Extra Special Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0204052] Validate Logic When User Able To Add Menu Extra Special Price With Notes After Save",
        {tag: tag + "@negative"}, async ({quickServiceList, bookOrder, order, editOrder, sideNavBar, tableList}) => {
            await addNewQuickService(quickServiceList, bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItemsSpecial(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableList.gotoQuickService();
            await quickServiceList.clickLastSalesNum();
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.inputNotesMenuInvisible();
        });
});