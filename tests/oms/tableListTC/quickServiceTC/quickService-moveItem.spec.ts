import {test} from "@playwright/test";
import BookOrderComponent from "../../../../src/modules/oms/tableList/components/bookOrder/bookOrder.component";
import OrderPage from "../../../../src/modules/oms/tableList/order/order.page";
import TerminalIDPage from "../../../../src/modules/oms/terminalID/terminalID.page";
import SignPinPage from "../../../../src/modules/oms/signPin/signPin.page";
import QuickServiceListPage from "../../../../src/modules/oms/tableList/quickServiceList/quickServiceList.page";
import SideNavBarComponents from "../../../../src/modules/oms/components/sideNavBar/sideNavBar.components";
import TableListPage from "../../../../src/modules/oms/tableList/tableList.page";
import MenuList from "../../../../src/modules/oms/objects/menuList";
import MoveItemComponents from "../../../../src/modules/oms/tableList/order/components/moveItem/moveItem.components";

test.setTimeout(100000);
test.describe.serial("Quick Service Move Item", () => {
    const tags = "@smokeTest @oms @moveItem ";
    let bookOrderComponent: BookOrderComponent;
    let orderPage: OrderPage;
    let terminalIdPage: TerminalIDPage;
    let signPinPage: SignPinPage;
    let quickServiceListPage: QuickServiceListPage;
    let sideNavBarComponents: SideNavBarComponents;
    let tableListPage: TableListPage;
    let moveItemComponents: MoveItemComponents;


    test.beforeEach(async ({page}) => {
        bookOrderComponent = new BookOrderComponent(page);
        orderPage = new OrderPage(page);
        terminalIdPage = new TerminalIDPage(page);
        signPinPage = new SignPinPage(page);
        quickServiceListPage = new QuickServiceListPage(page);
        sideNavBarComponents = new SideNavBarComponents(page);
        tableListPage = new TableListPage(page);
        moveItemComponents = new MoveItemComponents(page);

        await terminalIdPage.navigateHere();
        await terminalIdPage.performTerminalID();
        await signPinPage.inputPinByTouch("22");
        await signPinPage.submitPin();
    });

    test.afterEach(async ({page}) => {
        // await tableListPage.deleteAllQuickService();
    });

    test("[TC_0204102] Validate Logic when User can Move Item to new Quick Service order from Quick Service to Quick Service",
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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.moveItemToSectionQuickService();
            await moveItemComponents.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItemComponents.actionApplyMoveItem();
        }
    );

    test("[TC_0204103] Validate Logic when User can Move Item to the other order from Quick Service to Quick Service",
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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.moveItemToSectionQuickService();
            await moveItemComponents.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItemComponents.actionApplyMoveItem();
        }
    );

    test("[TC_0204104] Validate Logic when User can Move Item to the other filled order with the same Sales Mode from Quick Service to Quick Service",
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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.moveItemToSectionQuickService();
            await moveItemComponents.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItemComponents.actionApplyMoveItem();
        }
    );

    test("[TC_0204105] Validate Logic when User can Move Item to the empty order with the same Sales Mode from Quick Service to Quick Service",
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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.moveItemToSectionQuickService();
            await moveItemComponents.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItemComponents.actionApplyMoveItem();
        }
    );

    test("[TC_0204106] Validate Logic when User can Navigate to the next Move Item page",
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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.selectQuickService();
            await moveItemComponents.pagination('next');
        }
    );

    test("[TC_0204107] Validate Logic when User can Navigate to the previous Move Item page",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Back
            // Blocker :
            // All move item salesNum are disabled

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
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.moveItemToSectionQuickService();
            await moveItemComponents.moveAllMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await moveItemComponents.actionApplyMoveItem();
        }
    );

    test("[TC_0204108] Validate Logic when User can Navigate to the next Destination Table Page in Move Item",
        {tag: tags + "@positive"}, async ({page}) => {
            await quickServiceListPage.addOrderQuickService();
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.selectQuickService();
            await moveItemComponents.pagination("next");
        }
    );

    test("[TC_0204109] Validate Logic when User can Navigate to the previous Destination Table Page in Move Item",
        {tag: tags + "@positive"}, async ({page}) => {
            await quickServiceListPage.addOrderQuickService();
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.selectQuickService();
            await moveItemComponents.pagination("previous");
        }
    );

    test("[TC_0204110] Validate Logic when User can Move Item to the empty order with all Menu(s) selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service filled order
            //  9. Click button Next
            //  10. Select all menu
            //  11. Click button Apply
            // Blocker :
            // All move item salesNum are disabled
            await quickServiceListPage.addOrderQuickService();
            await bookOrderComponent.selectSalesMode("AT EXCLUSIVE");
            await bookOrderComponent.applyQuickService();
            await bookOrderComponent.skipCustomerPhoneNumber();
            await orderPage.selectCategoryMenu(MenuList.atCategory.name);
            await orderPage.selectCategoryDetailMenu(MenuList.atCategory.atMenuBiasa.name);
            await orderPage.selectMenu(MenuList.atCategory.atMenuBiasa.atMenuBiasaBakar.name);
            await orderPage.saveOrder();
            await sideNavBarComponents.gotoPageTableList();
            await tableListPage.gotoQuickService();
            await quickServiceListPage.selectSalesNum("last");
            await orderPage.moveItem();
            await moveItemComponents.selectQuickService();
            await moveItemComponents.pagination("previous");
        }
    );

    test("[TC_0204111] Validate Logic when User can Move Item to the other filled order with all Menu(s) selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Empty order
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service empty order
            //  9. Click button Next
            //  10. Select all menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204112] Validate Logic when User can Move Item to the empty order with a Menu selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service filled order
            //  9. Click button Next
            //  10. Select one of menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204113] Validate Logic when User can Move Item to the filled order with a Menu selected from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Empty order
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service empty order
            //  9. Click button Next
            //  10. Select one of menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204114] Validate Logic when User can Increase an item with ≥ 1 Qty in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Increase item >1
            //  11. Click button Apply
        }
    );

    test("[TC_0204115] Validate Logic when User can Decrease an item with ≥ 1 Qty selected in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Decrease item >1
            //  11. Click button Apply
        }
    );

    test("[TC_0204116] Validate Logic when User can Move All an item with ≥ 1 Qty in Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7
            //  Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Move all item
            //  11. Click button Apply
        }
    );

    test("[TC_0204117] Validate Logic when User can Select All Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Click button Select All
            //  11. Click button Apply
        }
    );

    test("[TC_0204118] Validate Logic when User can Deselect All Move Item to the other order from Quick Service to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Click button Deselect All
            //  11. Click button Apply
        }
    );

    test("[TC_0204119] Validate Logic when User can undo Move Item action with button Cancel on Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction Quick Service
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Cancel
        }
    );

    test("[TC_0204120] Validate Logic when User cannot select billed order in Move Item from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Not select other transaction
        }
    );

    test("[TC_0204121] Validate Logic when User cannot select current order in Move Item from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select current order
        }
    );

    test("[TC_0204122] Validate Logic when User cannot Move Item to the other filled order with different Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service (Not Inclusive)
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
        }
    );

    test("[TC_0204123] Validate Logic when User cannot Move Item to the other empty order with different Sales Mode from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service (Not Inclusive)
            //  3. Not Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
        }
    );

    test("[TC_0204124] Validate Logic when User can Move Item from Dine-In to Quick Service",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Quick Service (Not Inclusive)
            //  3. Not Order menu
            // Steps:
            //  1. Create transaction Dine In
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Dine In again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select transaction Quick Service
        }
    );

    test("[TC_0204125] Validate Logic when User cannot Move Item while not having access",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  Master POS User Role
            //  1. Access Move Item = Not Active
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
        }
    );

    test("[TC_0204126] Validate Logic when User cannot Move Item without ordered item to the other order from Quick Service to Quick Service",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Not order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Quick Service
            //  8. Select other transaction
            //  9. Click button Next
        }
    );

    test("[TC_0204127] Validate Logic when User cannot Move Item from Quick Service to Quick Service while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Not order menu
        }
    );

    test("[TC_0204128] Validate Logic when User can Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Choose table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204129] Validate Logic when User can Move Item from Quick Service to Dine-In other filled table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In filled
            //  8. Choose table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204130] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with the same Sales Mode",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Not Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In empty
            //  8. Choose table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204131] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In filled
            //  8. Choose table
            //  9. Click button Next
            //  10. Select all menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204132] Validate Logic when User can Move Item from Quick Service to Dine-In filled table with all Menu(s) selected",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Not Order menu
            // Steps:
            //  1. Create transaction Quick Service

            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In empty
            //  8. Choose table
            //  9. Click button Next
            //  10. Select all menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204133] Validate Logic when User can Move Item from Quick Service to Dine-In empty table with a Menu selected",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In filled
            //  8. Choose table
            //  9. Click button Next
            //  10. Selected menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204134] Validate Logic when User can Move Item to the filled table with a Menu selected from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Create transaction Dine In
            //  2. Choose sales mode Inclusive
            //  3. Not Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In empty
            //  8. Choose table
            //  9. Click button Next
            //  10. Selected menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204135] Validate Logic when User can Increase an item with ≥ 1 Qty in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
            //  10. Increase item >1
            //  11. Click button Apply
        }
    );

    test("[TC_0204136] Validate Logic when User can Decrease an item with ≥ 1 Qty selected in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
            //  10. Decrease item >1
            //  11. Click button Apply
        });

    test("[TC_0204137] Validate Logic when User can Move All an item with ≥ 1 Qty in Move Item from Quick Service to Dine-In other table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
            //  10. Move all item
            //  11. Click button Apply
        }
    );

    test("[TC_0204138] Validate Logic when User can Select All Move Item to the other order from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
            //  10. Click button Select All
            //  11. Click button Apply
        }
    );

    test("[TC_0204139] Validate Logic when User can Deselect All Move Item to the other order from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
            //  10. Click button Deselect All
            //  11. Click button Apply
        }
    );

    test("[TC_0204140] Validate Logic when User cannot Move Item from Quick Service to the other filled table with different Sales Mode on Dine-In",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Choose sales mode Inclusive
            //  4. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
        }
    );

    test("[TC_0204141] Validate Logic when User cannot Move Item from Quick Service to the other empty table with different Sales Mode in different Table Section on Dine-In",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Choose sales mode Inclusive
            //  4. Not Order menu
            // Steps:
            //  1. Create
            // transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
        }
    );

    test("[TC_0204142] Validate Logic when User cannot Move Item without ordered item from Quick Service to Dine-In table",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Not order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In
            //  9. Click button Next
        }
    );

    test("[TC_0204143] Validate Logic when User can Move Item to emptied table from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Not order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In Parent Merge Table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204144] Validate Logic when User can Move Item to filled table from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In Parent Merge Table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204145] Validate Logic when User can Move Item from Quick Service to Dine-In Parent Merge Table",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select other transaction Dine In Parent Merge Table
            //  9. Click button Next
            //  10. Select menu
            //  11. Click button Apply
        }
    );

    test("[TC_0204146] Validate Logic when User cannot select current table in Move Item from Quick Service to Dine-In",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select current order
        }
    );

    test("[TC_0204147] Validate Logic when User cannot select billed table in Move Item from Quick Service to Dine-In",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In
            //  3. Order menu
            //  4. Print Bill
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select transaction Dine In
        }
    );

    test("[TC_0204148] Validate Logic when User can Move Item to Child Merge Table from Quick Service to Dine-In",
        {tag: tags + "@positive"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select transaction Dine In child merge table
        }
    );

    test("[TC_0204149] Validate Logic when User cannot Move Item to emptied order from Quick Service to Dine-In Child Merge Table with different sales mode",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Sales Mode Inclusive
            //  4. Not Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select transaction Dine In child merge table
        }
    );

    test("[TC_0204150] Validate Logic when User cannot Move Item to filled table from Child Merge Table from Quick Service to Dine-In with different sales mode",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            //  2. Open other transaction Dine In Merge Table
            //  3. Sales Mode Inclusive
            //  4. Order menu
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode Not Inclusive
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select transaction Dine In child merge table
        }
    );

    test("[TC_0204151] Validate Logic when User cannot Move Item from Quick Service to Dine-In while having no ordered items and not saving order first",
        {tag: tags + "@negative"}, async ({page}) => {
            //TODO :
            // Precondition:
            //  POS
            //  1. Open POS
            // Steps:
            //  1. Create transaction Quick Service
            //  2. Choose Sales Mode
            //  3. Order menu
            //  4. Click Save Order
            //  5. Click transaction Quick Service again
            //  6. Click button Move Item
            //  7. Click section Dine In
            //  8. Select transaction Dine In child merge table
        }
    );
});