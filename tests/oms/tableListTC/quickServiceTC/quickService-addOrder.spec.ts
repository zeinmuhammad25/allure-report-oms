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

test.describe.serial("Quick Service Add Order", () => {
    const tag = "@smokeTest @oms @quickService @addOrder ";
    const menuCategory = MenuList.atCategory.name;

    const menuCategoryDetailSingleMenu = MenuList.categoryDetail.atMenuBiasa.name;
    const menuSingleOption = {
        atMenuBiasaRebus: MenuList.menus.atMenuBiasaRebus.name,
        atMenuBiasaBakar: MenuList.menus.atMenuBiasaRebus.name,
        atMenuBiasaGoreng: MenuList.menus.atMenuBiasaRebus.name
    };

    const menuCategoryDetailExtraMenu = MenuList.categoryDetail.atMenuExtra.name;
    const menuExtra = MenuList.menus.atMenuExtraAlpha.name;
    const menuExtraCategory = MenuList.anggur.name;
    const menuExtraOptions = {
        anggurHijauKawaKawa600ml: MenuList.menus.anggurHijauKawaKawa600ml.shortName,
        anggurMerahOT620ml: MenuList.menus.anggurMerahOT620ml.shortName
    };

    const menuCategoryDetailPackageMenu = MenuList.categoryDetail.atMenuPaket.name;
    const menuPackage = MenuList.menus.atMenuPaketMahal.name;
    const menuPackageOptions = {
        bombaySapphireDryGin750ml: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName,
        sababayWhiteVelvet750ml: MenuList.menuPackages.sababayWhiteVelvet750ml.shortName,
        gilbeysWhisky350ml: MenuList.menuPackages.gilbeysWhisky350ml.shortName,
        sprite250ml: MenuList.menuPackages.sprite250ml.shortName
    };

    test.beforeEach(async ({page}) => {
        let terminalIdPage = new TerminalIDPage(page);
        let signPinPage = new SignPinPage(page);
        let tableListPage = new TableListPage(page);
        let bookOrderPage = new BookOrderComponent(page);
        let quickServiceListPage = new QuickServiceListPage(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.wait(2000);
        await signPinPage.inputPinByTouch("22");
        await signPinPage.validateShowStarCash("20.000");
        await tableListPage.gotoQuickService();
        await quickServiceListPage.addOrderQuickService();
        await bookOrderPage.setPax(3);
        await bookOrderPage.selectSalesMode("AT EXCLUSIVE");
        await bookOrderPage.applyQuickService();
        await bookOrderPage.skipCustomerPhoneNumber();

    });

    test("[TC_0204001] Validate Logic When User Able To Add Menu Biasa",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.saveOrder();
        });

    test("[TC_0204002] Validate Logic When User Able To Add Menu Paket",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);
            let addOrderComponent = new AddOrderComponent(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204003] Validate Logic When User Able To Add Menu Extra",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.saveOrder();
        });


    test("[TC_0204004] Validate Logic When User Able To Edit Qty Menu Biasa",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await editOrder.editQtySelector(2);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });


    test("[TC_0204005] Validate Logic When User Able To Edit Qty Menu Paket",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);
            let addOrderComponent = new AddOrderComponent(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.clickMenuDetail(menuPackage);
            await orderMenu.wait(2000);
            await editOrder.editQtySelector(2);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204006] Validate Logic When User Able To Edit Qty Menu Extra",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.editQtySelector(2);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204007] Validate Logic When User Able To Delete Menu Biasa Sebelum Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.wait(3000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204008] Validate Logic When User Able To Delete Menu Paket Sebelum Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);
            let addOrderComponent = new AddOrderComponent(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.deleteMenu(menuPackage);
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204009] Validate Logic When User Able To Delete Menu Extra Sebelum Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.deleteMenu(menuExtra);
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204010] Validate Logic When User Able To Delete Menu Biasa Sesudah Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.wait(2000);
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.deleteMenu(menuSingleOption.atMenuBiasaRebus);
            await orderMenu.wait(2000);
            await orderMenu.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.confirmationCloseTable("Yes");


        });

    test("[TC_0204011] Validate Logic When User Able To Delete Menu Paket Sesudah Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.deleteMenu(menuPackage);
            await orderMenu.wait(2000);
            await orderMenu.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.confirmationCloseTable("Yes");

        });

    test("[TC_0204012] Validate Logic When User Able To Delete Menu Extra Sesudah Save Order",
        {tag: tag + "@positive"}, async ({page}) => {

            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.deleteMenu(menuExtra);
            await orderMenu.wait(2000);
            await orderMenu.cancelMenuAfterSave("CANCEL MENU");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.confirmationCloseTable("Yes");
        });

    test("[TC_0204013] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng, 3);
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.wait(2000);
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuSingleOption.atMenuBiasaGoreng);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204014] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuPackage);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204015] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Increase Qty",
        {tag: tag + "@positive"}, async ({page}) => {

            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra, 5);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.editQtySelector(7);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204016] Validate Logic When User Able To Edit Qty Menu Biasa After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng, 5);
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.wait(2000);
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuSingleOption.atMenuBiasaGoreng);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204017] Validate Logic When User Able To Edit Qty Menu Paket After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Back");
            await editOrder.actionButtonFooter("Back");
            await editOrder.editQtySelector(5);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuPackage);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204018] Validate Logic When User Able To Edit Qty Menu Extra After Save Order > Decrease Qty",
        {tag: tag + "@positive"}, async ({page}) => {

            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra, 5);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.editQtySelector(3);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.cancelMenuAfterSave("Decrease Qty");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204019] Validate Logic When User Able To Add Menu Biasa With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.clickMenuDetail(menuSingleOption.atMenuBiasaGoreng);
            await editOrder.inputNotesMenu("Notes Menu Single");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();

        });

    test("[TC_0204020] Validate Logic When User Able To Add Menu Paket With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);
            let addOrderComponent = new AddOrderComponent(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);

            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Back");
            await editOrder.actionButtonFooter("Back");
            await editOrder.inputNotesMenu("Notes Menu Package");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204021] Validate Logic When User Able To Add Menu Extra With Notes Before Save Order",
        {tag: tag + "@positive"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.inputNotesMenu("Notes Menu Extra");
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
        });

    test("[TC_0204022] Validate Logic When User Able To Edit Menu Biasa With Notes After Save Order",
        {tag: tag + "@negative"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);


            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailSingleMenu);
            await orderMenu.selectMenu(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await orderMenu.wait(2000);
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuSingleOption.atMenuBiasaGoreng);
            await orderMenu.wait(2000);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0204023] Validate Logic When User Able To Edit Menu Paket With Notes After Save Order",
        {tag: tag + "@negative"}, async ({page}) => {
            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let addOrderComponent = new AddOrderComponent(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailPackageMenu);
            await orderMenu.selectMenu(menuPackage);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: menuPackageOptions.sababayWhiteVelvet750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.bombaySapphireDryGin750ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.gilbeysWhisky350ml, qty: 2, notes: null},
                {menuName: menuPackageOptions.sprite250ml, qty: 2, notes: null}
            ]);
            await editOrder.wait(2000);
            await editOrder.actionButtonFooter("Apply");
            await orderMenu.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuPackage);
            await orderMenu.wait(2000);
            await editOrder.inputNotesMenuInvisible();
        });

    test("[TC_0204024] Validate Logic When User Able To Edit Menu Extra With Notes After Save Order",
        {tag: tag + "@negative"}, async ({page}) => {

            let orderMenu = new OrderPage(page);
            let sideNavBar = new SideNavBarComponents(page);
            let tableListPage = new TableListPage(page);
            let quickServiceListPage = new QuickServiceListPage(page);
            let editOrder = new EditOrderComponents(page);

            await orderMenu.selectCategoryMenu(menuCategory);
            await orderMenu.selectCategoryDetailMenu(menuCategoryDetailExtraMenu);
            await orderMenu.selectMenu(menuExtra, 5);
            await orderMenu.clickMenuDetail(menuExtra);
            await editOrder.escapeKeyboard();
            await editOrder.actionButtonFooter("Next");
            await editOrder.actionButtonFooter("Next");
            await editOrder.selectMenuExtraCategory(menuExtraCategory);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurHijauKawaKawa600ml);
            await editOrder.selectMenuExtra(menuExtraOptions.anggurMerahOT620ml);
            await editOrder.actionButtonFooter("Apply");
            await editOrder.wait(2000);
            await orderMenu.saveOrder();
            await sideNavBar.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.fetchSalesNums();
            await quickServiceListPage.clickLastSalesNum();
            await quickServiceListPage.wait(2000);
            await orderMenu.clickMenuDetail(menuExtra);
            await orderMenu.wait(2000);
            await editOrder.inputNotesMenuInvisible();

        });


});