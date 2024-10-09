import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Pick Up Later Test", () => {
    const tag = '@smokeTest @eso @pickUpLater @pickUpTime '

    test.beforeEach(async ({page}) => {
        // 1. Buka eso pickup via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
        // 2. Pilih mode pickup
    })

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih masuk sebagai tamu
            // 4. Pada landing page klik sidebar
            // 5. Klik icon bahasa
            // 6. Pilih bahasa indonesia
        })

    test("Verify user cannot set the language to English",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih masuk sebagai tamu
            // 4. Pada landing page klik sidebar
            // 5. Klik icon bahasa
            // 6. Pilih bahasa english
        })

    test("Verify user cannot select tomorrow's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih tanggal besok
        })

    test("Verify user can successfully select pickup time 1 hour from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih jam 1 jam dari curentime
        })

    test("Verify user can successfully select pickup time 3 hours from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih jam 3 jam dari curentime
        })

    test("Verify user can successfully select pickup time 3 hours from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih jam 10 jam dari curentime
        })

    test("Verify user cannot select back time (time before current)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih jam dari backtime dari waktu sekarang
        })

    test("Verify user cannot select time beyond store closing time",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
            // 3. Pilih mode pickup later
            // 4. Pilih jam lewat dari jam tutup toko
        })
})

