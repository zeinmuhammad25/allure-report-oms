import {test} from "@playwright/test";

test.describe.serial("Pick Up Test", () => {
    const tag = '@smokeTest @eso @pickUp @applyMembership '

    test("Verify user can successfully apply Membership Loop in pickup mode",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Apply Membership
        })

    test("Verify user cannot apply Membership Loop",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Apply Membership
        })

})