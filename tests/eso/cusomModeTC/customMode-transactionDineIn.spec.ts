import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @transactionDineIn '

    test("Verify user can successfully complete a custom mode transaction using OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
            // 9. Pada halaman payment pilih pembayaran ovo
            // 10. Lakukan Payment
        })

    test("Verify user can successfully complete a custom mode transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
            // 9. Pada halaman payment pilih pembayaran dana
            // 10. Lakukan Payment

        })

    test("Verify user can generate a QR code for a custom mode transaction",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single
            // 8. Checkout menu
            // 9. Pada halaman payment pilih pembayaran at cashir
            // 10. Lakukan Payment
        })

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via LinkAja",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment pilih payment linkaja
            // 10. Lakukan payment
        })

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via GoPay",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment pilih payment gopay
            // 10. Lakukan payment
        })

    test("Verify user can generate a QR code for a custom mode transaction and include notes for a sweet menu",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment bayar di kasir
            // 10. Lakukan payment
        })

    test("Verify user can successfully complete a custom mode transaction with a 25k promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
            // 10. Apply promo amount 25k
            // 11 Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
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
            // 10. Apply promo amount 25k
            // 11. Payment menggunakan qris
        })

    test("Verify user can successfully complete a custom mode transaction with a 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
            // 11. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a custom mode transaction with a 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan ovo
        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
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
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan dana
        })

    test("Verify user can successfully complete a custom mode transaction with a special price promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a custom mode transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a custom mode transaction with 5 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })

    test("Verify user can successfully complete a custom mode transaction with 1 offline voucher and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
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
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
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
        })
})