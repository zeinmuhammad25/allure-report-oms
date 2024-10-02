import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @applyMembership '

    test("Verify user can successfully apply membership loop",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
            //

        })

    test("Verify user cannot apply membership loop as the account is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
            //

        })

})