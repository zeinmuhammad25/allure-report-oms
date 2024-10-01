import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @rejectReservation '

    test("Verify user can reject reservation with status 'new'",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Reject reservation with the condition that the reservation status is 'new'
        })

    test("Verify user can not reject reservation with status 'confirmed', can only cancel",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Reject reservation with the condition that the reservation status is 'confirmed'
        })
})
