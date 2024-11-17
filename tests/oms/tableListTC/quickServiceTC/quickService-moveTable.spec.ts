import {test} from "@playwright/test";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import MoveTableComponent from "../../../../src/modules/oms/tableList/order/components/moveTable/moveTable.component";
import Table from "../../../../src/modules/oms/objects/table";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Table", () => {
    const tags = "@smokeTest @oms @moveTable ";

    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let quickServiceListPage: QuickServiceListPage;
    let sideNavBarComponents: SideNavBarComponents;
    let tableListPage: TableListPage;
    let moveTableComponent: MoveTableComponent;

    test.beforeEach(async ({page}) => {
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        quickServiceListPage = new QuickServiceListPage(page);
        sideNavBarComponents = new SideNavBarComponents(page);
        tableListPage = new TableListPage(page);
        moveTableComponent = new MoveTableComponent(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPin();
    });


    test("[TC_0204095] Validate Logic when User can Move Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            await quickServiceListPage.addOrderQuickService();
            await bookOrderComponent.setPax(2);
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.selectTopSalesNum();
            await orderPage.moveTable();
            await moveTableComponent.autoMoveTable();
        }
    );

    test("[TC_0204096] Validate Logic when user cannot Move Table from Quick Service to Dine-In filled table",
        {tag: tags + "@negative"}, async ({page}) => {

            //  Precondition:
            await quickServiceListPage.addOrderQuickService();
            await bookOrderComponent.setPax(2);
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.selectTable(Table.acRoom.ac3.name);
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.bookAndOrder();
            await bookOrderComponent.skipCustomerPhoneNumber();
            //  Steps:
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.selectTopSalesNum();
            await orderPage.moveTable();
            await moveTableComponent.selectRoom(Table.acRoom.name);
            await moveTableComponent.disableButtonByLabel(Table.acRoom.ac3.name);
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
