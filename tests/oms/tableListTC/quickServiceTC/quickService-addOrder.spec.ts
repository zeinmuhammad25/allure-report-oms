import {test} from "@playwright/test";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import EditOrderComponents from "../../../../src/modules/oms/tableList/order/components/editOrder/editOrder.components";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";

test.setTimeout(600000);
test.describe.serial("Quick Service Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let tableListPage: TableListPage;
    let quickServiceListPage: QuickServiceListPage;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let bookOrderComponent: BookOrderComponent;
    let sideNavBarComponents: SideNavBarComponents;
    let editOrderComponents: EditOrderComponents;

    test.beforeEach(async ({page}) => {
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        tableListPage = new TableListPage(page);
        quickServiceListPage = new QuickServiceListPage(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        bookOrderComponent = new BookOrderComponent(page);
        sideNavBarComponents = new SideNavBarComponents(page);
        editOrderComponents = new EditOrderComponents(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.wait(2000);
        await signPinPage.inputPinByTouch("22");
        await signPinPage.validateShowStarCash("20.000");
        await tableListPage.gotoQuickService();
        await quickServiceListPage.addOrderQuickService();
        await bookOrderComponent.setPax(3);
        await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
        await bookOrderComponent.applyQuickService();
        await bookOrderComponent.skipCustomerPhoneNumber();
    });

    test("[TC_0204001] Validate Logic When User Able To Add Menu Biasa",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.saveOrder();
        });

    test("[TC_0204002] Validate Logic When User Able To Add Menu Paket",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204003] Validate Logic When User Able To Add Menu Extra",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.saveOrder();
        });

    test("[TC_0204004] Validate Logic When User Able To Edit Qty Menu Biasa",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrderComponents.editQtySelector(2);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204005] Validate Logic When User Able To Edit Qty Menu Paket",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.clickMenuDetail(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await orderPage.wait(2000);
            await editOrderComponents.editQtySelector(2);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204006] Validate Logic When User Able To Edit Qty Menu Extra",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.editQtySelector(2);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204007] Validate Logic When User Able To Delete Menu Biasa Sebelum Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(3000);
            await orderPage.saveOrder();
        });

    test("[TC_0204008] Validate Logic When User Able To Delete Menu Paket Sebelum Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204009] Validate Logic When User Able To Delete Menu Extra Sebelum Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204010] Validate Logic When User Able To Delete Menu Biasa Sesudah Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(2000);
            await orderPage.cancelMenuAfterSave("CANCEL MENU");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.confirmationCloseTable("Yes");
        });

    test("[TC_0204011] Validate Logic When User Able To Delete Menu Paket Sesudah Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.deleteMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await orderPage.wait(2000);
            await orderPage.cancelMenuAfterSave("CANCEL MENU");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.confirmationCloseTable("Yes");
        });

    test("[TC_0204012] Validate Logic When User Able To Delete Menu Extra Sesudah Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.wait(2000);
            await orderPage.cancelMenuAfterSave("CANCEL MENU");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.confirmationCloseTable("Yes");
        });

    test("[TC_0204013] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, 3);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrderComponents.editQtySelector(7);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204014] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await editOrderComponents.editQtySelector(7);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204015] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name, 3);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.editQtySelector(7);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204016] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name, 5);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrderComponents.editQtySelector(3);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.cancelMenuAfterSave("Decrease Qty");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204017] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Back");
            await editOrderComponents.actionButtonFooter("Back");
            await editOrderComponents.editQtySelector(5);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await editOrderComponents.editQtySelector(3);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.cancelMenuAfterSave("Decrease Qty");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204018] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name, 5);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.editQtySelector(3);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.cancelMenuAfterSave("Decrease Qty");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204019] Validate Logic When User Able To Add Menu Biasa With Notes Before Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await editOrderComponents.inputNotesMenu("Notes Menu Single");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204020] Validate Logic When User Able To Add Menu Paket With Notes Before Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Back");
            await editOrderComponents.actionButtonFooter("Back");
            await editOrderComponents.inputNotesMenu("Notes Menu Package");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204021] Validate Logic When User Able To Add Menu Extra With Notes Before Save Order",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.inputNotesMenu("Notes Menu Extra");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204022] Validate Logic When User Able To Edit Menu Biasa With Notes After Save Order",
        {tag: tag + "@negative"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuBiasaGoreng.name);
            await orderPage.wait(2000);
            await editOrderComponents.inputNotesMenuInvisible();
        });

    test("[TC_0204023] Validate Logic When User Able To Edit Menu Paket With Notes After Save Order",
        {tag: tag + "@negative"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.gilbeysWhisky350ml.shortName, qty: 2, notes: null},
                {menuName: MenuList.menuPackages.sprite250ml.shortName, qty: 2, notes: null}
            ]);
            await editOrderComponents.wait(2000);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await orderPage.wait(2000);
            await editOrderComponents.inputNotesMenuInvisible();
        });

    test("[TC_0204024] Validate Logic When User Able To Edit Menu Extra With Notes After Save Order",
        {tag: tag + "@negative"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuExtra.name);
            await orderPage.selectMenu(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.actionButtonFooter("Next");
            await editOrderComponents.selectMenuExtraCategory(MenuList.anggur.name);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurHijauKawaKawa600ml.shortName);
            await editOrderComponents.selectMenuExtra(MenuList.menus.anggurMerahOT620ml.shortName);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.atMenuExtraAlpha.name);
            await orderPage.wait(2000);
            await editOrderComponents.inputNotesMenuInvisible();
        });

    test("[TC_0204025] Validate Logic When User Able To Add Menu Biasa Special Price",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atSpecialPrice.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
            await orderPage.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.saveOrder();
        });

    test("[TC_0204026] Validate Logic When User Able To Edit Qty Menu Biasa Special Price",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atSpecialPrice.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
            await orderPage.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrderComponents.editQtySelector(2);
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204027] Validate Logic When User Able To Edit Qty Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atSpecialPrice.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
            await orderPage.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName, 5);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.clickMenuDetail(MenuList.menus.menuSpecialPriceDelights.shortName);
            await editOrderComponents.editQtySelector(3);
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.cancelMenuAfterSave("Decrease Qty");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await editOrderComponents.wait(2000);
            await orderPage.saveOrder();
        });

    test("[TC_0204028] Validate Logic When User Able To Delete Menu Biasa Special Price Before Save",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atSpecialPrice.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
            await orderPage.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.wait(3000);
            await orderPage.saveOrder();
        });

    test("[TC_0204029] Validate Logic When User Able To Delete Menu Biasa Special Price After Save",
        {tag: tag + "@positive"}, async () => {
            await orderPage.selectCategoryMenu(MenuList.atSpecialPrice.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atSpecialPrice.atMenuBiasaSpecialPrice.name);
            await orderPage.selectMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.wait(2000);
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderPage.deleteMenu(MenuList.menus.menuSpecialPriceDelights.shortName);
            await orderPage.wait(2000);
            await orderPage.cancelMenuAfterSave("CANCEL MENU SPECIAL PRICE");
            await editOrderComponents.escapeKeyboard();
            await editOrderComponents.actionButtonFooter("Apply");
            await orderPage.wait(2000);
            await orderPage.saveOrder();
            await orderPage.confirmationCloseTable("Yes");
        });






});