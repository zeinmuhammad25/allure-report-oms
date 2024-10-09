import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @language '

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik button language
            // 8. Pilih indonesia
        })

    test("Verify user can successfully set the language to English",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side bar
            // 7. Klik button language
            // 8. Pilih english
        })
})