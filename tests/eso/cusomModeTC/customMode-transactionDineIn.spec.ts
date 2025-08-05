import {Page, test} from "@playwright/test";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import {PaymentMethod} from "../../../src/modules/eso/objects/paymentMethod";
import ViewOrderPage from "../../../src/modules/eso/pages/order/viewOrder/viewOrder.page";
import PaymentPage from "../../../src/modules/eso/pages/payment/payment.page";
import PromotionPage from "../../../src/modules/eso/pages/payment/promotion/promotion.page";

test.describe.serial("Custom Mode Test", () => {
    const tag = "@smokeTest @eso @customMode @transactionDineIn ";

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
        await modePage.selectMode(EsoMode.Custom);
        await orderPage.inputRoom("Meeting Room");
        await orderPage.performApplyMembershipSubs(phoneNumber, password);
    };

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
    });


    test("Verify user can successfully complete a custom mode transaction using OVO payment",
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

    test("Verify user can successfully complete a custom mode transaction using Dana payment",
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

    test("Verify user can generate a QR code for a custom mode transaction",
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

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via LinkAja",
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
            await paymentPage.selectPaymentMethod(PaymentMethod.LinkAja);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via GoPay",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("menu manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.GoPay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can generate a QR code for a custom mode transaction and include notes for a sweet menu",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("menu manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentType();
            await paymentPage.confirmPayment("/order/qrData");
        });

    test("Verify user can successfully complete a custom mode transaction with a 25k promo and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("menu manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await orderPage.wait(300);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot use the promo amount 25k for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("menu manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await orderPage.wait(300);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a custom mode transaction with a 35% All Category promo and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.addNotes("menu manis");
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await orderPage.wait(300);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot use the promo All Category 35% for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan qris
        });

    test("Verify user can successfully complete a custom mode transaction with a 10% Menu Category promo and OVO payment",
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
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot use the promo Menu Category 10% for QRIS payment",
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
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a custom mode transaction with a special price promo and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo spesial price
            // 11. Pilih payment ovo
            // Blocker :
            // Which one is Promo Special price?

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
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user can successfully complete a custom mode transaction with 3 online vouchers and Shopee payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher online type amount
            // 11. Payment menggunakan shopee
            // Blocker :
            // How to apply multiple voucher ?

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
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user cannot apply voucher online type amount as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher online type amount yang expired
            // Blocker :
            // No expired voucher available

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
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a custom mode transaction with 5 ESB vouchers and Shopee payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 5 vocher esb
            // 12. Payment menggunakan dana
            // Blocker :
            // How to apply multiple voucher


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
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user cannot apply voucher esb as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher esb yang expired
            // Blocker :
            // No expired voucher available

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
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a custom mode transaction with 1 offline voucher and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline
            // 11. Payment menggunakan ovo
            // Blocker :
            // which one is voucher offline


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
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot apply voucher offline as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline yang expired
            // Blocker :
            // No expired voucher

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
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment("/order");
        });
});