import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import HistoryPage from "../../../src/modules/eso/pages/history/history.page";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @orderAndReservationHistory '

    test.beforeEach(async ({page}) => {
        let branchListPage = new BranchListPage(page);
        await branchListPage.navigateHere();
        await branchListPage.wait(300);
    })


    test("Verify user can display the order history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            let whatsappPage = new WhatsappPage(page);
            let branchListPage = new BranchListPage(page);
            let historyPage = new HistoryPage(page);

            await whatsappPage.navigateHere()
            await whatsappPage.performLoginWhatsAppSubs()
            await branchListPage.navigateHere()

            await branchListPage.gotoHistoryPage();
            await historyPage.showOrderHistory();
            await historyPage.hasEmptyHistoryItems();
        })

    test("Verify user can display that the ESB Order transaction history data was not found",
        {tag: tag + '@negative'}, async ({page}) => {
            let branchListPage = new BranchListPage(page);
            let historyPage = new HistoryPage(page);

            await branchListPage.navigateHere();

            await branchListPage.gotoHistoryPage();
            await historyPage.showOrderHistory();
            await historyPage.hasHistoryItems();
        })

    test("Verify user can display the reservation history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            let whatsappPage = new WhatsappPage(page);
            let branchListPage = new BranchListPage(page);
            let historyPage = new HistoryPage(page);

            await whatsappPage.navigateHere()
            await whatsappPage.performLoginWhatsAppSubs()
            await branchListPage.navigateHere()

            await branchListPage.gotoHistoryPage();
            await historyPage.showReservationHistory();
            await historyPage.hasEmptyHistoryItems();
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














