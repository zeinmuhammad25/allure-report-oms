import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @login '


    test("Verify user can successfully access the full service page using a guest account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Pilih masuk sebagai tamu
        })

    test("Verify user can successfully log in to ESB order in full service mode using a Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik icon google
        })

    test("Verify user can successfully log in to ESB order in full service mode using a Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik icon facebook
        })

    test("Verify user can successfully log in to ESB order in full service mode using a membership loop account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik icon mambership loop
            // 3. Masukkan nomor ponsel yang valid
            // 4. Masukkan kata sandi yang valid
            // 5. Klik masuk"
        })

    test("Verify user cannot log in using a Google account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik Login google
            // 3. Close popup login google

        })

    test("Verify user cannot log in using a Facebook account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik Login facebook
            // 3. Close popup login facebook

        })

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            // 1. Buka eso link fs
            // 2. Klik Login memberhsip
            // 3. Close popup login memberhsip
        })

})