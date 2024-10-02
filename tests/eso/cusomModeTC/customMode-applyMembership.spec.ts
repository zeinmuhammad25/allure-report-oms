import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @applyMembership '

    test("Verify user can successfully apply membership loop in custom mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
            //

        })

    test("Verify user cannot apply membership loop",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
            //

        })
})