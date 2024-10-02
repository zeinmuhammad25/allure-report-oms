import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @language '

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