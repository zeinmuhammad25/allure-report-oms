import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @applyMembership '

    test("Verify user can successfully apply membership loop in delivery mode",
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
