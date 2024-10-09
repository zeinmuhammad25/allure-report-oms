import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @transactionDelivery '

    test("Verify user can successfully complete a delivery transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pada halaman payment pilih pembayaran dana
            // 8. Lakukan Payment
        })

    test("Verify user can successfully complete a delivery transaction with single, extra, and package menu with notes on extra and payment via QRIS",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket dan input notes:manis pada menu extra
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Pada halaman payment pilih payment qris
            // 10. Lakukan payment
        })

    test("Verify user can successfully complete a delivery transaction with 25k promo and BCA VA payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo amount 25k
            // 11. Payment menggunakan bca va
        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo amount 25k
            // 11. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
            // 4. Login google via sidebar menu
            // 5. Tambahkan menu single,extra,paket
            // 6. Checkout menu
            // 7. Pilih kurir pengiriman
            // 8. Pilih grab-sameday
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a delivery transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a delivery transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })
})
