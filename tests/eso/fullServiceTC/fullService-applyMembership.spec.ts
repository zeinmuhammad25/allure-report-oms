import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @applyMembership '

    test("Verify user can successfully apply membership loop",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 1. Buka eso link fs https://dev7.esb.co.id/eso-fs
            // 2. Pilih masuk sebagai tamu
        })

    test("Verify user cannot apply membership loop as the account is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
            // 1. Buka eso link fs https://dev7.esb.co.id/eso-fs
            // 2. Klik Login memberhsip dengan akun tidak terdaftar"
        })

})