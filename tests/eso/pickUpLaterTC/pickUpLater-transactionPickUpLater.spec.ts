import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Pick Up Later Test", () => {
    const tag = '@smokeTest @eso @pickUpLater @transactionPickUpLater '

    test.beforeEach(async ({page})=>{
        // 1. Buka eso pickup later via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
        // 2. Pilih mode pickup later later
        // 3. Pilih waktu pengiriman pukul 09.15 AM
        // 4. Pilih masuk sebagai tamu
        // 5. Login google via sidebar menu
    })

    test("Verify user can successfully complete a pickup later transaction with Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Pada halaman payment pilih pembayaran shopee
            // 11. Lakukan Payment
        })

    test("Verify user can successfully complete a pickup later transaction with single, extra, and package menu with notes on extra and payment via QRIS",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket dan input notes:manis pada menu extra
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Pada halaman payment pilih payment qris
            // 11. Lakukan payment
        })

    test("Verify user can successfully complete a pickup later transaction with 25k promo and BCA VA payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo amount 25k
            // 12. Payment menggunakan bca va
        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo amount 25k
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a pickup later transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen All Category 35%
            // 12. Payment menggunakan ovo

        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen All Category 35%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a pickup later transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 10%
            // 12. Payment menggunakan ovo

        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 10%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a pickup later transaction with 70% Menu Category Detail promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 70%
            // 12. Payment menggunakan ovo"

        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 70%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a pickup later transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 3 vocher offline
            // 12. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Pilih kurir pengiriman
            // 11. Pilih gojek
            // 12. Klik section promo dan vocher
            // 13. Apply 1 vocher offline yang tidak terdaftar pada branch
        })

    test("Verify user can successfully complete a pickup later transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 3 vocher online
            // 12. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Pilih kurir pengiriman
            // 11. Pilih gojek
            // 12. Klik section promo dan vocher
            // 13. Apply 1 vocher online yang tidak terdaftar pada branch"

        })

    test("Verify user can successfully complete a pickup later transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 3 vocher esb
            // 12. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Pilih kurir pengiriman
            // 11. Pilih gojek
            // 12. Klik section promo dan vocher
            // 13. Apply 1 vocher esb yang tidak terdaftar pada branch
        })

})
