import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @login '


    test("Verify user can successfully access the full service page using a guest account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in full service mode using a Google account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in full service mode using a Facebook account",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Login
            //

        })

    test("Verify user can successfully log in to ESB order in full service mode using a membership loop account",
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