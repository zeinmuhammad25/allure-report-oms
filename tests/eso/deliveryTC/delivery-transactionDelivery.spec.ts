import {Page, test} from "@playwright/test";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import WhatsappPage from "../../../src/modules/eso/pages/login/whatsapp/whatsapp.page";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";
import ViewOrderPage from "../../../src/modules/eso/pages/order/viewOrder/viewOrder.page";
import {DeliveryCourier} from "../../../src/modules/eso/objects/deliveryCourier";
import PaymentPage from "../../../src/modules/eso/pages/payment/payment.page";
import {PaymentMethod} from "../../../src/modules/eso/objects/paymentMethod";
import PromotionPage from "../../../src/modules/eso/pages/payment/promotion/promotion.page";

test.describe.serial("Delivery Test", () => {
    const tag = "@smokeTest @eso @delivery @transactionDelivery ";

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
        await modePage.selectMode(EsoMode.Delivery);
        await orderPage.performApplyMembershipSubs(phoneNumber, password);
    };

    test.beforeEach(async ({page}) => {
        let branchList = new BranchListPage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
    });

    test("Verify user can successfully complete a delivery transaction using Dana payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a delivery transaction with single, extra, and package menu with notes on extra and payment via QRIS",
        {tag: tag + "@positive"}, async ({page}) => {

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 3);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.selectPaymentMethod(PaymentMethod.Qris);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a delivery transaction with 25k promo and BCA VA payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.BcaVA);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 25K");
            await promotionPage.selectPromo("PROMO 25K");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a delivery transaction with 35% All Category promo and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot use the promo All Category 35% for Dana payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 30%");
            await promotionPage.selectPromo("PROMO 30%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment("/order");
        });

    test("Verify user can successfully complete a delivery transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + "@positive"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Ovo);
            await paymentPage.confirmPaymentOvo();
        });

    test("Verify user cannot use the promo Menu Category 10% for Dana payment",
        {tag: tag + "@negative"}, async ({page}) => {
            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.Dana);
            await paymentPage.confirmPayment('/order');
        });

    test("Verify user can successfully complete a delivery transaction with 3 online vouchers and Shopee payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single ,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih gojek
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher online type amount
            // 11. Payment menggunakan shopee

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GoSend);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment('/order');
        });

    test("Verify user cannot apply 1 online voucher as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single ,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih gojek
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher online type amount yang tidak terdaftar pada branch
            // Blocker :
            // Which one is voucher offline?

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GoSend);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment('/order');
        });

    test("Verify user cannot apply 1 offline voucher as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single ,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih gojek
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline type amount yang tidak terdaftar pada branch

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment('/order');
        });

    test("Verify user can successfully complete a delivery transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + "@positive"}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single ,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih gojek
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher offline type amount
            // 11. Payment menggunakan shopee

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment('/order');
        });

    test("Verify user cannot apply 1 offline type amount voucher as it is not found",
        {tag: tag + "@negative"}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single ,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih gojek
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline type amount yang tidak terdaftar pada branch

            let viewOrderPage = new ViewOrderPage(page);
            let paymentPage = new PaymentPage(page);
            let promotionPage = new PromotionPage(page);

            await loginMembership(page);
            await orderPage.addMenu(108);
            await orderPage.increaseQty(108, 5);
            await orderPage.wait(300);
            await orderPage.goToViewOrder();
            await viewOrderPage.selectCourierButton(DeliveryCourier.GrabExpress);
            await viewOrderPage.continueToPayment();
            await paymentPage.addPromotion();
            await promotionPage.searchPromo("PROMO 10%");
            await promotionPage.selectPromo("PROMO 10%");
            await promotionPage.applyPromo();
            await paymentPage.selectPaymentMethod(PaymentMethod.ShopeePay);
            await paymentPage.confirmPayment('/order');
        });
});
