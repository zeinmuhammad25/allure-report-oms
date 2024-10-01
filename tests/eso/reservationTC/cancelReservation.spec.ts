import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @cancelReservation '

    test("Verify user successfully canceled a confirmed reservation",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Cancel a confirmed reservation (successfully canceled the reservation)
        })

    test("Verify user unable to cancel a reservation that has not been confirmed",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Cancel an unconfirmed reservation (Cannot cancel as the reservation hasn't been confirmed)
        })

    test("Verify user successfully canceled a reservation with reason want to reschedule",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Cancel a reservation with reason want to reschedule
        })

})
