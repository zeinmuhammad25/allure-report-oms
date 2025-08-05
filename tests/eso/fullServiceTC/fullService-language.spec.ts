import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @language '

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            // 1. Buka eso link fs
            // 2. Klik icon bahasa
            // 3. Pilih bahasa indonesia
        })

    test("Verify user can successfully set the language to English",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            // 1. Buka eso link fs
            // 2. Klik icon bahasa
            // 3. Pilih bahasa english
        })
})