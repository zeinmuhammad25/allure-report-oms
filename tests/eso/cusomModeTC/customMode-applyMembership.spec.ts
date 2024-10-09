import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @applyMembership '

    test("Verify user can successfully apply membership loop in custom mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side burger menu
            // 7. Klik icon mambership loop
            // 8. Masukkan nomor ponsel yang valid
            // 9. Masukkan kata sandi yang valid
            // 10. Klik masuk
        })

    test("Verify user cannot apply membership loop",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 1. Buka eso dengan url https://qa7.esb.co.id/eso-qs/qa1
            // 2. Pilih outlet
            // 3. Pilih mode custome
            // 4. Masukkan nomor meja
            // 5. Klik simpan
            // 6. Klik side burger menu
            // 7. Klik icon mambership loop
            // 8. Masukkan nomor ponsel yang tidak valid
            // 9. Masukkan kata sandi yang valid
            // 10. Klik masuk

        })
})