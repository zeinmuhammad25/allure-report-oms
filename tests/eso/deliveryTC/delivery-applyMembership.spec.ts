import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @applyMembership '

    test.beforeEach(async ({page}) => {
        // 1. Buka eso delivery via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
        // 2. Pilih mode delivery
        // 3. Klik simpan
        // 4. Klik side burger menu
        // 5. Klik icon mambership loop
    })

    test("Verify user can successfully apply membership loop in delivery mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 6. Masukkan nomor ponsel yang valid
            // 7 Masukkan kata sandi yang valid
            // 8. Klik masuk
        })

    test("Verify user cannot apply membership loop",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 6. Masukkan nomor ponsel yang tidak valid
            // 7. Masukkan kata sandi yang valid
            // 8. Klik masuk
        })

})
