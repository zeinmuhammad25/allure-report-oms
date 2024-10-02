import {test} from "@playwright/test";

test.describe.serial("Delivery Later Test", () => {
    const tag = '@smokeTest @eso @deliveryLater @deliveryTime '

    test("Verify user can successfully select today's date",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user cannot select yesterday's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user cannot select the following day's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user can successfully select a time 1 hour ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user can successfully select a time 3 hours ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user can successfully select a time 10 hours ahead",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user cannot select back time (time before current)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })

    test("Verify user cannot select a disabled time",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Delivery Time
            //

        })
})
