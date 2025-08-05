import {test} from "@playwright/test";

test.describe.serial("Delivery Later Test", () => {
    const tag = '@smokeTest @eso @deliveryLater @deliveryTime '

    test("Verify user can successfully select today's date",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman hari ini
        })

    test("Verify user cannot select yesterday's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman kemarin
        })

    test("Verify user cannot select the following day's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman esok hari
        })

    test("Verify user can successfully select a time 1 hour ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman 1 jam kedepan
        })

    test("Verify user can successfully select a time 3 hours ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman 3 jam kedepan
        })

    test("Verify user can successfully select a time 10 hours ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman 10 jam kedepan
        })

    test("Verify user cannot select back time (time before current)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman backtime
        })

    test("Verify user cannot select a disabled time",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            // 1. Buka eso via url https://qa7.esb.co.id/eso-qs/qa1/SFF10
            // 2. Pilih mode delivery later
            // 3. Pilih waktu pengiriman jam tutup toko
        })
})
