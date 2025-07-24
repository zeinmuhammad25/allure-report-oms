import {test} from "../../injection";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import Table from "../../../../src/modules/oms/objects/table";
import OrderScenario from "../../../../src/modules/oms/tableList/order/order.scenario";
import BookOrderScenario from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.scenario";
import AddOrderScenario from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.scenario";
import EditOrderScenario from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.scenario";
import {safeTest} from "../../../../src/base/utils/safeTest";
import PaymentList from "../../../../src/modules/oms/objects/paymentList";
import PaymentV2Scenario from "../../../../src/modules/oms/tableList/paymentV2/paymentV2.scenario";
import AddOrderV2Scenario from "../../../../src/modules/oms/tableList/order/components/addOrderV2/addOrderV2.scenario";

test.setTimeout(100000);
test.describe.serial("Ordering Dine In Order Menu", () => {
    const tags = "@smokeTest @oms @orderingDineIn @orderMenu ";

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

    const selectMenuPaketWithNotes = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atCategory.name);
        await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
        await order.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
        await addOrderV2.modifyDetailPackage([
            {
                menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName,
                qty: quantity,
                notes: "test notes detail paket 1"
            },
            {
                menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName,
                qty: quantity,
                notes: "test notes detail paket 2"
            },
            {
                menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName,
                qty: quantity,
                notes: "test notes detail paket 3"
            },
            {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: quantity, notes: "test notes detail paket 4"}
        ]);
    };

    const selectMenuExtra = async (order: OrderScenario, addOrderV2: AddOrderV2Scenario, quantity = 1) => {
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

    const selectMenuPaketSpecialPrice = async (order: OrderScenario, addOrder: AddOrderScenario) => {
        await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.name);
        await order.selectMenu(MenuList.atSpecialPrice.atMenuPaketSpecialPrice.menuPaketSpecialSelections.shortName);
        await addOrder.modifyMenuDetailPackage([
            {menuName: MenuList.menuPackages.anggurHijauKawaKawa600ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.anggurPutihOT620ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahOTGold620ml.shortName, qty: 2, notes: null},
            {menuName: MenuList.menuPackages.anggurMerahKawaKawa600ml.shortName, qty: 2, notes: null}
        ]);
    };

    const selectMenuExtraSpecialPrice = async (order: OrderScenario, quantity = 1) => {
        await order.selectCategoryMenu(MenuList.atSpecialPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuExtraSpecialPrice.name);
        await order.selectMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName, quantity);
    };

    const selectMenuOpenPrice = async (order: OrderScenario, quantity: number = 1) => {
        await order.selectCategoryMenu(MenuList.atOpenPrice.name);
        await order.selectCategoryDetailMenu(MenuList.atOpenPrice.atMenuBiasaOpenPrice.name);
        await order.selectMenu(MenuList.menus.menuOpenPriceChoices.shortName, quantity);
    };

    const selectExtraMenuItems = async (editOrder: EditOrderScenario) => {
        await editOrder.selectMenuExtraCategory(MenuList.anggur.name);
        await editOrder.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
        await editOrder.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
    };

    const salesModeInclusive = async (bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode("AT INCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const salesModeExclusive = async (bookOrder: BookOrderScenario) => {
        await bookOrder.selectSalesMode("AT EXCLUSIVE");
        await bookOrder.bookAndOrder();
        await bookOrder.skipCustomerPhoneNumber();
    };

    const paymentCashFull = async (paymentV2: PaymentV2Scenario) => {
        await paymentV2.paymentType(PaymentList.PaymentType.Cash);
        await paymentV2.paymentMethod(PaymentList.PaymentMethod.CashPayment);
        await paymentV2.paymentFullAmount();
        await paymentV2.actionPayment(PaymentList.ActionPayment.SavePayment);
        await paymentV2.payPayment();
    };


    test.beforeEach(async () => {
    });

    test.afterEach(async () => {
        await Promise.all([]);
    });

    test("Setup", {}, async ({terminalID, signPin}) => {
        await terminalID.goHere();
        await terminalID.performTerminalID();
        await signPin.inputPinByTouch("22");
        await signPin.validateShowStarCash("20.000");
        await signPin.storeAuthState();
    });

    test("[TC_0205001] Validate logic when user able to add Menu Biasa",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuBiasa(order, 3);
                await order.validateQtyOrderWithMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2}, testInfo);
        });

    test("[TC_0205002] Validate logic when user able to add Menu Paket",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2}, testInfo);

        });

    test("[TC_0205003] Validate logic when user able to add Menu Extra",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2);
                await selectMenuExtra(order, addOrderV2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac3.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2}, testInfo);
        });

    test("[TC_0205004] Validate logic when user able to edit qty Menu Biasa",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await salesModeInclusive(bookOrder);
                await selectMenuBiasa(order, 2);
                await order.validateQtyOrderWithMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac4.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2}, testInfo);
        });

    test("[TC_0205005] Validate logic when user able to edit qty Menu Paket",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, addOrderV2, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205006] Validate logic when user able to edit qty Menu Extra",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, addOrderV2, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await selectMenuExtra(order, addOrderV2, 3);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205007] Validate order list ketika user update dengan pilih promo dan back MENU BIASA ",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, editOrderV2, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuBiasa(order, 3);
                await order.validateQtyOrderWithMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.addPromotionMenu();
                await editOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await order.saveOrder();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, editOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205008][Validate fungsi suggestion notes saat pertama kali membuka pop-up menu BIASA",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrderV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, editOrderV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuBiasa(order, 3);
                await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
                await editOrderV2.selectSuggestionNotes("COBA AT", "COBA 1");
                await order.validateQtyOrderWithMenu(MenuList.menus.atMenuBiasaGoreng.name);
            }, {order, tableList, bookOrder, editOrderV2}, testInfo);
        });

    test("[TC_0205009] Validate logic ketika user mengisi notes dengan > 10 character MENU PAKET",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, addOrderV2, paymentV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr4.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
            }, {order, tableList, bookOrder, addOrderV2, paymentV2}, testInfo);
        });

    test("[TC_0205010] Validate logic button Apply Promo ketika user berhasil melakukan Apply Promo",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2, addOrderV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await addOrderV2.addPromotionMenu();
                await addOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2, addOrderV2}, testInfo);
        });

    test("[TC_0205011] Validate logic button Apply Notes ketika user berhasil melakukan Apply Notes",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, paymentV2, addOrderV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, paymentV2, addOrderV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaketWithNotes(order, addOrderV2, 2);
                await addOrderV2.addPromotionMenu();
                await addOrderV2.applyViaSearchPromotionMenu("MENU DISC RP ALL CATEGORY");
                await addOrderV2.addToCartMenuDetailPackage();
                await order.validateQtyOrderWithMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await order.printNowPrintingSetting();
                await order.gotoPayment();
                await paymentCashFull(paymentV2);
            }, {order, tableList, bookOrder, paymentV2, addOrderV2}, testInfo);
        });


    test("[TC_0205012] Validate logic when user able to delete menu biasa before Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.acRoom.name);
                await tableList.selectTable(Table.acRoom.ac1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuBiasa(order, 2);
                await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
                await order.saveOrder();
            }, {order, tableList, bookOrder}, testInfo);
        });

    test("[TC_0205013] Validate logic when user able to delete menu paket before Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, addOrderV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr2.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
            }, {order, tableList, bookOrder, addOrderV2}, testInfo);
        });

    test("[TC_0205014] Validate Logic When User Able To Delete Menu Extra Sebelum Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrderV2}, testInfo) => {
            await safeTest(async ({order, tableList, bookOrder, addOrderV2}) => {
                await tableList.goHere();
                await tableList.selectRoom(Table.smokingRoom.name);
                await tableList.selectTable(Table.smokingRoom.sr1.name);
                await salesModeInclusive(bookOrder);
                await selectMenuPaket(order, addOrderV2, 2);
                await selectMenuExtra(order, addOrderV2, 3);
                await addOrderV2.addToCartMenuDetailPackage();
                await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
                await order.saveOrder();
            }, {order, tableList, bookOrder, addOrderV2}, testInfo);
        });

    test("[TC_0205010] Validate logic when user able to delete Menu Biasa after Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205011] Validate logic when user able to Delete Menu Paket after Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, addOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaket(order, addOrder, 2);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205012] Validate logic when user able to Delete Menu Extra before Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtra(order, 2);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.escapeKeyboard();
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.atMenuExtraAlpha.name);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205013] Validate logic when user able to edit qty Menu Biasa after Save Order > Increase Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205014] Validate logic when user able to edit qty Menu Paket after Save Order > Increase Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaket(order, addOrder, 5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205015] Validate logic when user able to edit qty Menu Extra after Save Order > Increase Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtra(order, 5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205016] Validate logic when user able to edit qty Menu Biasa after Save Order > Decrease Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205017] Validate logic when user able to edit qty Menu Paket after Save Order > Decrease Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaket(order, addOrder, 5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205018] Validate logic when user able to edit qty Menu Extra after Save Order > Decrease Qty",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtra(order, 5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205019] Validate logic when user able to add notes to Menu Biasa before Save Order",
        {tag: tags + "@positive"}, async ({tableList, order, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 2);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205020] Validate logic when user able to add Menu Paket with notes before Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaket(order, addOrder, 5);
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205021] Validate logic when user able to add Menu Extra with notes before Save Order",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtra(order, 5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205022] Validate logic when user able to add notes to Menu Biasa after Save Order",
        {tag: tags + "@negative"}, async ({tableList, order, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasa(order, 2);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205023] Validate logic when user able to add notes to Menu Paket after Save Order",
        {tag: tags + "@negative"}, async ({tableList, order, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaket(order, addOrder, 5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuPaketMahal.name);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205024] Validate logic when user able to add notes to Menu Extra after Save Order",
        {tag: tags + "@negative"}, async ({tableList, order, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtra(order, 5);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205025] Validate logic when user able to add Menu Biasa Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 3);
            await order.saveOrder();
        });

    test("[TC_0205026] Validate logic when user able to edit qty Menu Biasa Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.saveOrder();
        });

    test("[TC_0205027] Validate logic when user able to edit qty Menu Biasa Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205028] Validate logic when user able to edit qty Menu Biasa Special Price before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.editQtySelector(6);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205029] Validate logic when user able to edit qty Menu Biasa Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205030] Validate logic when user able to add Menu Biasa Special Price with Notes before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205031] Validate logic when user able to add Menu Biasa Special Price with Notes after Save",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuBiasaSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205032] Validate logic when user able to add Menu Paket Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205033] Validate logic when user able to edit qty Menu Paket Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
            await editOrder.editQtySelector(4);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205034] Validate logic when user able to edit qty Menu Paket Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205035] Validate logic when user able to delete Menu Paket Special Price before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.deleteMenu(MenuList.menus.menuPaketSpecialSelections.shortName);
            await order.saveOrder();
        });

    test("[TC_0205036] Validate logic when user able to delete Menu Paket Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.menuPaketSpecialSelections.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205037] Validate logic when user able to add Menu Paket Special Price with notes before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205038] Validate logic when user able to add Menu Paket Special Price with notes after Save",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, editOrder, addOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuPaketSpecialPrice(order, addOrder);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuPaketSpecialSelections.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205039] Validate logic when user able to add Menu Open Price Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205040] Validate logic when user able to edit qty Menu Open Price Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205041] Validate logic when user able to edit qty Menu Open Price Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205042] Validate logic when user able to delete Menu Open Price Special Price before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName);
            await order.validateMenuNotVisible(MenuList.menus.menuOpenPriceChoices.shortName);
        });

    test("[TC_0205043] Validate logic when user able to delete Menu Open Price Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.menuOpenPriceChoices.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU OPEN PRICE");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205044] Validate logic when user able to add Menu Open Price Special Price with notes before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.inputNotesOpenPrice("Notes Open Price");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205045] Validate logic when user able to add Menu Open Price Special Price with notes after Save",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuOpenPrice(order);
            await editOrder.inputPriceMenu("20.000");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuOpenPriceChoices.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205046] Validate logic when user able to add Menu Extra Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.saveOrder();
        });

    test("[TC_0205047] Validate logic when user able to edit qty Menu Extra Special Price",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205048] Validate logic when user able to edit qty Menu Extra Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await order.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205049] Validate logic when user able to delete Menu Extra Special Price before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order, 5);
            await order.deleteMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await order.saveOrder();
        });

    test("[TC_0205050] Validate logic when user able to delete Menu Extra Special Price after Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.deleteMenu(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await order.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205051] Validate logic when user able to add Menu Extra Special Price with notes before Save",
        {tag: tags + "@positive"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order, 5);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.inputNotesMenu("Test");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await order.saveOrder();
        });

    test("[TC_0205052] Validate logic when user able to add Menu Extra Special Price with notes after Save",
        {tag: tags + "@negative"}, async ({order, tableList, bookOrder, editOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeInclusive(bookOrder);
            await selectMenuExtraSpecialPrice(order, 5);
            await order.saveOrder();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await order.clickMenuDetail(MenuList.menus.menuExtraSpecialFriedRice.shortName);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0205202] Validate Quantity for Menu and Subtotal of Menu Exclusive Price",
        {tag: tags + "@positive"}, async ({order, tableList, addOrder, editOrder, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeExclusive(bookOrder);
            await selectMenuBiasa(order, 6);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await selectMenuExtra(order);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.escapeKeyboard();
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await selectMenuPaket(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.validateQtyOrderWithMenu(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name
                ]
            );
            await order.validatePriceExclusiveWithSubtotal(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name],
                [
                    MenuList.menus.anggurHijauKawaKawa600ml.shortName, MenuList.menus.anggurMerahOT620ml.shortName,
                    MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, MenuList.menuPackages.sprite250ml.shortName,
                    MenuList.menuPackages.gilbeysWhisky350ml.shortName
                ]);
            await order.saveOrder();
        });

    test("[TC_0205203] Validate Quantity for Menu and Subtotal of Menu Exclusive Price After Reducing Menu Quantity",
        {tag: tags + "@positive"}, async ({order, tableList, addOrder, editOrder, bookOrder}) => {
            await tableList.goHere();
            await tableList.selectRoom(Table.acRoom.name);
            await tableList.selectTable(Table.acRoom.ac1.name);
            await salesModeExclusive(bookOrder);
            await selectMenuBiasa(order, 6);
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await selectMenuExtra(order);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.escapeKeyboard();
            await selectExtraMenuItems(editOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await order.selectCategoryMenu(MenuList.atCategory.name);
            await selectMenuPaket(order, addOrder);
            await editOrder.actionButtonFooter("Apply");
            await order.validateQtyOrderWithMenu(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name
                ]
            );
            await order.validatePriceExclusiveWithSubtotal(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name],
                [
                    MenuList.menus.anggurHijauKawaKawa600ml.shortName, MenuList.menus.anggurMerahOT620ml.shortName,
                    MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, MenuList.menuPackages.sprite250ml.shortName,
                    MenuList.menuPackages.gilbeysWhisky350ml.shortName
                ]);
            await order.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrder.editQtySelector(2);
            await editOrder.actionButtonFooter("Apply");
            await order.validateQtyOrderWithMenu(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name
                ]
            );
            await order.validatePriceExclusiveWithSubtotal(
                [
                    MenuList.menus.atMenuBiasaGoreng.name, MenuList.menus.atMenuExtraAlpha.name,
                    MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name],
                [
                    MenuList.menus.anggurHijauKawaKawa600ml.shortName, MenuList.menus.anggurMerahOT620ml.shortName,
                    MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, MenuList.menuPackages.sprite250ml.shortName,
                    MenuList.menuPackages.gilbeysWhisky350ml.shortName
                ]);
            await order.saveOrder();
        });


});
