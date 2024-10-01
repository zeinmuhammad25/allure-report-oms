import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @login '

    test("Verify user can successfully access the delivery page using a guest account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in delivery mode using a Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in delivery mode using a Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in delivery mode using a membership loop account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to Ayomakan and access delivery mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user cannot log in using a Google account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user cannot log in using a Facebook account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user cannot log in using a membership loop account",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Login
            //

        })
})
