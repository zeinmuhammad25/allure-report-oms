import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @inviteGuest '

    test("Verify user successfully invited 1 guest using a valid email",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Invite 1 guest using a valid email (successfully invited 1 guest using a valid email)
        })

    test("Verify user successfully invited 2 guests using valid emails",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Invite 2 guests using valid emails (successfully invited 2 guests using valid emails)
        })

    test("Verify user validation fails when inviting 2 guests with 1 invalid email",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Invite 2 guests with 1 invalid email (Validation fails for the invalid email)
        })

})
