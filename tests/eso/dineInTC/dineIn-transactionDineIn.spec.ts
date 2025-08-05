import {Page, test} from "@playwright/test";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";
import {PaymentMethod} from "../../../src/modules/eso/objects/paymentMethod";
import ViewOrderPage from "../../../src/modules/eso/pages/order/viewOrder/viewOrder.page";
import PaymentPage from "../../../src/modules/eso/pages/payment/payment.page";
import PromotionPage from "../../../src/modules/eso/pages/payment/promotion/promotion.page";

test.describe.serial("Dine In Test", () => {
    const tag = "@smokeTest @eso @dineIn @transactionDineIn ";

    let orderPage: OrderPage;
    const branchName = "Denny's Kasablanka";
    const phoneNumber = process.env.ESO_LOOP_MEMBER_USER;
    const password = process.env.ESO_LOOP_MEMBER_PASS;

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
        await modePage.selectMode(EsoMode.DineIn);
        await orderPage.inputTable(1);
        await orderPage.performApplyMembershipSubs(phoneNumber, password);
    };

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
    });

    test("Verify user successfully complete a dine-in transaction with OVO payment  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user successfully complete a dine-in transaction with DANA payment  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can generate a dine-in transaction QR code  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentType();
            await paymentPage.confirmPayment("/order/qrData");
        });

    test("Verify user successfully complete a dine-in order with single menu with notes and payment via LinkAja  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.LinkAja);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user successfully complete a dine-in order with single menu with notes and payment via GoPay  ",
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
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.GoPay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can generate a dine-in transaction QR code with sweet menu notes  ",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("Manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentType();
            await paymentPage.confirmPayment("/order/qrData");
        });

    test("Verify user successfully complete a dine-in transaction with a 25k promo and payment via OVO  ",
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
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await orderPage.wait(300);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can trigger validation when the promo 25k cannot be used for QRIS payment  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo amount 25k
            // 11. Payment menggunakan qris
            // Blocker :
            // No Validation even using Qris
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await orderPage.wait(300);
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user successfully complete a dine-in transaction with 35% All Category promo and payment via OVO  ",
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
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can trigger validation when the promo All Category 35% cannot be used for QRIS payment  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan qris
            // Blocker :
            // How to make it cannot be used?

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment();
        });

    test("Verify user successfully complete a dine-in transaction with 10% Menu Category promo and payment via OVO  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan ovo

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can trigger validation when the promo Menu Category 10% cannot be used for QRIS payment  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan dana
            // Blocker :
            // How to make it cannot be used?

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user successfully complete a dine-in transaction with special price promo and payment via OVO  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo spesial price
            // 11. Pilih payment ovo
            // Blocker :
            // There is no promo special price

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user successfully complete a dine-in transaction with 3 online voucher types and payment via Shopee  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher online type amount
            // 11. Payment menggunakan shopee
            // Blocker :
            // Only available for Mobile

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can trigger validation when voucher type amount is not found  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher online type amount yang expired
            // Blocker :
            // Need to add Expired Vucher
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.confirmPaymentOvo();

        });

    test("Verify user successfully complete a dine-in transaction with 5 ESB vouchers and payment via Shopee  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 5 vocher esb
            // 12. Payment menggunakan dana
            // Blocker :
            // No button login google after login as guest

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);

        });

    test("Verify user can trigger validation when voucher esb is not found  ",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher esb yang expired
            // Blocker :
            // How to know wich one is ESB Voucher
            // Need to add Expired Vuocher
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user successfully complete a dine-in transaction with 1 offline voucher and payment via OVO  ",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline
            // 11. Payment menggunakan ovo
            // Blocker :
            //
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can trigger validation when voucher offline is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline yang expired
            // Blocker :
            // How to know wich one is Offline Voucher
            // Need to add Expired Vuocher
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.continueToPayment();
            await paymentPage.inputTableNumber("1");
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.confirmPaymentOvo();
        });
});