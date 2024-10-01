import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @language '

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            //

        })

    test("Verify user can successfully set the language to English",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Language
            //

        })

})
