import {test} from "@playwright/test";

test.describe.serial("Pick Up Test", () => {
    const tag = '@smokeTest @eso @pickUp @login '

    test("Verify user can successfully navigate to the pickup page using guest mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user can successfully login to ESB order pickup mode using Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user can successfully login to ESB order pickup mode using Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user can successfully login to ESB order pickup mode using Membership Loop account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user can successfully login to Ayomakan and open pickup mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user cannot login using Google account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user cannot login using Facebook account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
        })

    test("Verify user cannot login using Membership Loop account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
        })
})