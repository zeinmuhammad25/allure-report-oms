import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import HistoryPage from "../../../src/modules/eso/pages/history/history.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import ViewOrderPage from "../../../src/modules/eso/pages/order/viewOrder/viewOrder.page";
import PaymentPage from "../../../src/modules/eso/pages/payment/payment.page";
import {PaymentMethod} from "../../../src/modules/eso/objects/paymentMethod";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @orderAndReservationHistory '

    let branchListPage: BranchListPage;
    const phoneNumber = "83806992528";
    const password = "abcd123";
    const brancName = "Denny's Kasablanka";


    test.beforeEach(async ({page}) => {
        branchListPage = new BranchListPage(page);
        await branchListPage.navigateHere();
        await branchListPage.wait(300);
    })

    test("Verify user can display the order history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            branchListPage = new BranchListPage(page);
            let orderPage = new OrderPage(page)
            let modePage = new ModePage(page);
            let historyPage = new HistoryPage(page);
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await branchListPage.searchBranch(brancName);
            await branchListPage.selectBranch(brancName);
            await modePage.performCheckInitialElements();
            await modePage.selectMode(EsoMode.DineIn);
            await orderPage.inputTable(1);
            await orderPage.performApplyMembershipSubs(phoneNumber, password);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108);
            await orderPage.increaseQty(108);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber('1');
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();

            await branchListPage.navigateHere();
            await branchListPage.gotoHistoryPage();
            await historyPage.showOrderHistory();
            await branchListPage.wait(300);
            await historyPage.hasHistoryItems();
        })

    test("Verify user can display that the ESB Order transaction history data was not found",
        {tag: tag + '@negative'}, async ({page}) => {
            let branchListPage = new BranchListPage(page);
            let historyPage = new HistoryPage(page);

            await branchListPage.navigateHere();

            await branchListPage.gotoHistoryPage();
            await historyPage.showOrderHistory();
            await historyPage.hasEmptyHistoryItems();
        })

    test("Verify user can display the reservation history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            branchListPage = new BranchListPage(page);
            let orderPage = new OrderPage(page)
            let modePage = new ModePage(page);
            let historyPage = new HistoryPage(page);

            await branchListPage.searchBranch(brancName);
            await branchListPage.selectBranch(brancName);
            await modePage.performCheckInitialElements();
            await modePage.selectMode(EsoMode.DineIn);
            await orderPage.inputTable(1);
            await orderPage.performApplyMembershipSubs(phoneNumber, password);
            await branchListPage.navigateHere();

            await branchListPage.gotoHistoryPage();
            await historyPage.showReservationHistory();
            await historyPage.hasHistoryItems();
        })

    test("Verify user can display that the reservation history data was not found",
        {tag: tag + '@negative'}, async ({page}) => {
            let branchListPage = new BranchListPage(page);
            let historyPage = new HistoryPage(page);

            await branchListPage.navigateHere();

            await branchListPage.gotoHistoryPage();
            await historyPage.showReservationHistory();
            await historyPage.hasEmptyHistoryItems();
        })
})














