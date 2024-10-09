import {test} from "@playwright/test";

test.describe.serial("Delivery Later Test", () => {
    const tag = '@smokeTest @eso @deliveryLater @transactionDeliveryLater '

    test("Verify user can successfully complete a delivery later transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9 Pilih grab
            // 10. Pada halaman payment pilih pembayaran dana
            // 11. Lakukan Payment
        })

    test("Verify user can successfully complete a delivery later transaction with a single menu with notes and payment via GoPay",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single, dan input notes menu manis
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Pada halaman payment pilih payment gopay
            // 11. Lakukan payment
        })

    test("Verify user can successfully complete a delivery later transaction with 25k promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo amount 25k
            // 12. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo amount 25k
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery later transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen All Category 35%
            // 12. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen All Category 35%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery later transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 10%
            // 12. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab-sameday
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 10%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery later transaction with 70% Menu Category Detail promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 70%
            // 12. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih grab
            // 10. Klik section promo dan vocher
            // 11. Apply promo Persen Menu Category 70%
            // 12. Payment menggunakan dana
        })

    test("Verify user can successfully complete a delivery later transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
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
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher offline yang expired
        })

    test("Verify user can successfully complete a delivery later transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
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
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher online yang expired
        })

    test("Verify user can successfully complete a delivery later transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
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
            // Transaction Delivery Later
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman pukul 09.00 AM
            // 4. Pilih masuk sebagai tamu
            // 5. Login google via sidebar menu
            // 6. Tambahkan menu single ,extra,paket
            // 7. Checkout menu
            // 8. Pilih kurir pengiriman
            // 9. Pilih gojek
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher esb yang expired
        })
})
