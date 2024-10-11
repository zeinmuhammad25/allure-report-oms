import {Page, test} from "@playwright/test";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import ViewOrderPage from "../../../src/modules/eso/pages/order/viewOrder/viewOrder.page";
import PaymentPage from "../../../src/modules/eso/pages/payment/payment.page";
import {PaymentMethod} from "../../../src/modules/eso/objects/paymentMethod";
import PromotionPage from "../../../src/modules/eso/pages/payment/promotion/promotion.page";

test.describe.serial("Pick Up Test", () => {
    const tag = "@smokeTest @eso @pickUp @language ";

    let orderPage: OrderPage;
    const branchName = "Denny's Kasablanka";
    const phoneNumber = "083806992528";
    const password = "abcd123";

    const loginMembership = async (page: Page, loginAsGuestFirst: boolean = false): Promise<void> => {
        let branchList = new BranchListPage(page);
        let modePage = new ModePage(page);
        let whatsAppPage = new WhatsappPage(page);
        orderPage = new OrderPage(page);
        if (loginAsGuestFirst) {
            await whatsAppPage.navigateHere();
            await whatsAppPage.performLoginWhatsAppSubs();
        }

        await branchList.navigateHere();
        await branchList.wait(300);
        await branchList.searchBranch(branchName);
        await branchList.selectBranch(branchName);
        await modePage.performCheckInitialElements();
        await modePage.selectMode(EsoMode.PickUp);
        await orderPage.performApplyMembershipSubs(phoneNumber, password);
    };

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
    });

    test("Verify user can successfully complete a pickup transaction with OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can successfully complete a pickup transaction with DANA payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can generate a pickup transaction QR code",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentType();
            await paymentPage.confirmPayment("/order/qrData");
        });

    test("Verify user can successfully complete a pickup order with single menu with notes and payment via LinkAja",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.LinkAja);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a pickup order with single menu with notes and payment via GoPay",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("Manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.GoPay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can generate a pickup transaction QR code with sweet menu notes",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("Manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a pickup transaction with a 25k promo and payment via OVO",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot apply promo amount 25k for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a pickup transaction with 35% All Category promo and payment via OVO",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot apply promo All Category 35% for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a pickup transaction with 10% Menu Category promo and payment via OVO",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo()
        });

    test("Verify user cannot apply promo Category 10% for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a pickup transaction with special price promo and payment via OVO",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await orderPage.wait(300);
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await orderPage.wait(300);
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can successfully complete a pickup transaction with 3 online voucher types and payment via Shopee",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher online type amount
            // 11. Payment menggunakan shopee
            // Blocker :
            // How to apply 3 voucher at once?
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user cannot apply expired voucher type amount as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher online type amount yang expired
            // Blocker :
            // Expired Voucher?
        });

    test("Verify user can successfully complete a pickup transaction with 5 ESB vouchers and payment via Shopee",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 5 vocher esb
            // 12. Payment menggunakan dana
            // Blocker :
            // How to add 5 voucher at once?
        });

    test("Verify user cannot apply expired voucher esb as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher esb yang expired
            // Blocker :
            // No expired voucher yet
        });

    test("Verify user can successfully complete a pickup transaction with 1 offline voucher and payment via OVO",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline
            // 11. Payment menggunakan ovo
            // Blocker :
            // Wich one is offline voucher?
        });

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline yang expired
            // Blocker :
            // No expired voucher yet
        });

});