import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @transactionFullService '

    test("Verify user can successfully complete a full service transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Pilih masuk sebagai tamu
            // 3. Login google via sidebar menu
            // 4. Tambahkan menu single,extra,paket
            // 5. Checkout menu
            // 6. Pada halaman payment pilih pembayaran dana
            // 7. Lakukan Payment
        })

    test("Verify user can generate a QR code for a full service transaction",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Pilih masuk sebagai tamu
            // 3. Login google via sidebar menu
            // 4. Tambahkan menu single
            // 5. Checkout menu
            // 6. Pada halaman payment pilih pembayaran at cashir
            // 7. Lakukan Payment
        })

    test("Verify user can successfully complete a full service transaction with a single menu with notes and payment via LinkAja",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Pilih masuk sebagai tamu
            // 3. Login google via sidebar menu
            // 4. Tambahkan menu single, dan input notes menu manis
            // 5. Checkout menu
            // 6. Pada halaman payment pilih payment linkaja
            // 7. Lakukan payment
        })

    test("Verify user can successfully complete a custom mode transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 3 vocher online type amount
            // 7. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 1 vocher online type amount yang expired
        })

    test("Verify user can successfully complete a custom mode transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 3 vocher offline type amount
            // 7. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 1 vocher offline type amount yang expired
        })

    test("Verify user can successfully complete a custom mode transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 3 vocher esb type amount
            // 7. Payment menggunakan shopee
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS
            // 1. Buka eso link fs
            // 2. Login google via sidebar menu
            // 3. Tambahkan menu single ,extra,paket
            // 4. Checkout menu
            // 5. Klik section promo dan vocher
            // 6. Apply 1 vocher esb type amount yang expired
        })
})