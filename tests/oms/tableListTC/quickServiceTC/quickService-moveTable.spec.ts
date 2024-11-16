import {test} from "@playwright/test";
import PromotionListComponent
    from "../../../../src/modules/oms/tableList/components/promotionList/promotionList.component";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import AddOrderComponent from "../../../../src/modules/oms/tableList/order/components/addOrder/addOrder.component";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";
import MenuList from "../../../../src/modules/oms/objects/menuList";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Table", () => {
    const tags = "@smokeTest @oms @moveTable ";

    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let addOrderComponent: AddOrderComponent;
    let promotionListComponent: PromotionListComponent;
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let quickServiceListPage: QuickServiceListPage;
    let sideNavBarComponents: SideNavBarComponents;

    test.beforeEach(async ({page}) => {
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        addOrderComponent = new AddOrderComponent(page);
        promotionListComponent = new PromotionListComponent(page);
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        quickServiceListPage = new QuickServiceListPage(page);
        sideNavBarComponents = new SideNavBarComponents(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPin();
        await quickServiceListPage.addOrderQuickService();
    });


    test("[TC_0204095] Validate Logic when User can Move Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table
            //     8. Click button Apply

            await bookOrderComponent.setPax(2);
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuPaket.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuPaket.atMenuPaketMahal.name);
            await addOrderComponent.modifyMenuDetailPackage([
                {menuName: MenuList.menuPackages.bombaySapphireDryGin750ml.shortName, qty: "max", notes: "test"}
            ]);
            await addOrderComponent.wait(300);
            await addOrderComponent.applyMenuDetailPackage();
            await orderPage.wait(300);
            await orderPage.addPromotion();
            await promotionListComponent.selectPromotion("BILL DISCOUNT RP");
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
        }
    );

    test("[TC_0204096] Validate Logic when user cannot Move Table from Quick Service to Dine-In filled table",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //     2. Open table 3 Dine In
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table 3
        }
    );

    test("[TC_0204097] Validate Logic when user cannot Move Table from Quick Service to Dine-In while table is not selected",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Not select table anything
        }
    );

    test("[TC_0204098] Validate Logic when user cannot Move Table while not having access",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //     Master POS User Role
            //     1. Access Move Table = Not Active
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
        }
    );

    test("[TC_0204099] Validate Logic when User can cancel Move Table action with button Cancel",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Click button Cancel
        }
    );

    test("[TC_0204100] Validate Logic when User can Move Table from Quick Service to Dine-In while having no ordered items",
        {tag: tags + "@positive"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
            //     4. Click Save Order
            //     5. Click transaction Quick Service again
            //     6. Click button Move Table
            //     7. Choose table
            //     8. Click button Apply
        }
    );

    test("[TC_0204101] Validate Logic when User cannot Move Table from Quick Service to Dine-In while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({page}) => {
            // TODO:
            //  Precondition:
            //     POS
            //     1. Open POS
            //  Steps:
            //     1. Create transaction Quick Service
            //     2. Choose Sales Mode
            //     3. Order menu
        }
    );

});
