import {test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";

test.describe.serial("Dine In Test", () => {
    const tag = "@smokeTest @eso @dineIn @applyMembership ";

    let orderPage: OrderPage;
    const branchName = "Denny's Kasablanka";
    const phoneNumber = "083806992528";
    const password = "abcd123";

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
    });

    test("Verify user successfully navigate to the dine-in page using guest mode  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let branchList = new BranchListPage(page);
            let modePage = new ModePage(page);
            let whatsAppPage = new WhatsappPage(page);
            orderPage = new OrderPage(page);

            await whatsAppPage.navigateHere();
            await whatsAppPage.performLoginWhatsAppSubs();
            await branchList.navigateHere();
            await branchList.wait(300);
            await branchList.searchBranch(branchName);
            await branchList.selectBranch(branchName);
            await modePage.performCheckInitialElements();
            await modePage.selectMode(EsoMode.DineIn);
            await orderPage.inputTable(1);
        });

    test("Verify user successfully login to ESB order dine-in mode using Google account  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Login
            // 7. Klik icon google
            // Blocker :
            // No icon google.
        });

    test("Verify user successfully login to ESB order dine-in mode using Facebook account  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Login
            // 7. Klik icon facebook
            // Blocker :
            // No icon facebook.
        });

    test("Verify user successfully login to ESB order dine-in mode using Membership Loop account  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let branchList = new BranchListPage(page);
            let modePage = new ModePage(page);
            orderPage = new OrderPage(page);

            const phoneNumber = "083806992528";
            const password = "abcd123";

            await branchList.searchBranch(branchName);
            await branchList.selectBranch(branchName);
            await modePage.performCheckInitialElements();
            await modePage.selectMode(EsoMode.DineIn);
            await orderPage.inputTable(1);
            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(phoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitMembership();
        });

    test("Verify user successfully login to Ayomakan and open dine-in mode  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Login
            // 1. Kunjungi web ayomakan dan login ayomakan
            // 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan dine in diayomakan
            // 4. Verifiksi login berhasil
            // Blocker :
            // Depend on ayomakan.
        });

    test("Verify user fail to login using Google account  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Login
            // 7. Klik icon google
            // 8. Klik icon close pada pop up
            // Blocker :
            // No icon google.
        });

    test("Verify user fail to login using Facebook account  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Login
            // 7. Klik icon facebook
            // 8. Klik icon close pada pop up
            // Blocker :
            // No icon facebook.
        });

    test("Verify user fail to login using Membership Loop account  ",
        {tag: tag + "@negative"}, async ({page}) => {
            let branchList = new BranchListPage(page);
            let modePage = new ModePage(page);
            orderPage = new OrderPage(page);

            const invalidPhoneNumber = "083811111111";
            const password = "abcd123";

            await branchList.searchBranch(branchName);
            await branchList.selectBranch(branchName);
            await modePage.performCheckInitialElements();
            await modePage.selectMode(EsoMode.DineIn);
            await orderPage.inputTable(1);
            await orderPage.openSideBar();
            await orderPage.openMembershipForm();
            await orderPage.inputPhoneNumberMembership(invalidPhoneNumber);
            await orderPage.inputPasswordMembership(password);
            await orderPage.submitWithExpectaitionFailedResult();
        });
});