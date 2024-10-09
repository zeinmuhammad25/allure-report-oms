import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @login '

    test("Verify user can successfully access the delivery page using a guest account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Pilih masuk sebagai tamu
        })

    test("Verify user can successfully log in to ESB order in delivery mode using a Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Klik side bar
            // 4. Klik icon google

        })

    test("Verify user can successfully log in to ESB order in delivery mode using a Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode deliveryomor meja
            // 3. Klik simpan
            // 4. Klik side bar
            // 5. Klik icon facebook
        })

    test("Verify user can successfully log in to ESB order in delivery mode using a membership loop account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Klik side bar
            // 4. Klik icon mambership loop
            // 5. Masukkan nomor ponsel yang valid
            // 6. Masukkan kata sandi yang valid
            // 7. Klik masuk
        })

    test("Verify user can successfully log in to Ayomakan and access delivery mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Kunjungi web ayomakan dan login ayomakan 2. Pilih branch Dennsy Kasablanka
            // 3. Pilih pesanan delievry diayomakan
            // 4. Verifiksi login berhasil
        })

    test("Verify user cannot log in using a Google account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Klik side bar
            // 4. Klik icon google
            // 5. Klik icon close pada pop up
        })

    test("Verify user cannot log in using a Facebook account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Klik side bar
            // 4. Klik icon facebook
            // 5. Klik icon close pada pop up
        })

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery
            // 3. Klik side bar
            // 4. Klik icon membership loop
            // 5. Klik icon close pada pop up
        })
})
