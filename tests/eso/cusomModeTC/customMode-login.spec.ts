import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @login '

    test("Verify user can successfully access the custom page using a guest account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih login menggunakan guest
            // 4. Pilih mode custome
            // 5. Masukkan nomor meja
            // 6. Klik simpan
        })

    test("Verify user can successfully log in to ESB order in custom mode using a Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon google
        })

    test("Verify user can successfully log in to ESB order in custom mode using a Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon facebook
        })

    test("Verify user can successfully log in to ESB order in custom mode using a membership loop account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon mambership loop
            // 8. Masukkan nomor ponsel yang valid
            // 9. Masukkan kata sandi yang valid
            // 10. Klik masuk
        })

    test("Verify user can successfully log in to Ayomakan and access custom mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Kunjungi web ayomakan dan login ayomakan
            // 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan custome diayomakan
            // 4. Verifiksi login berhasil
        })

    test("Verify user cannot log in using a Google account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon google
            // 8. Klik icon close pada pop up
        })

    test("Verify user cannot log in using a Facebook account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon facebook
            // 8. Klik icon close pada pop up
        })

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik icon membership loop
            // 8. Klik icon close pada pop up
        })
})