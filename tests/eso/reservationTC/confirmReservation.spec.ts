import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @confirmReservation '

    test("Verify user successfully confirmed a reservation with 3 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Confirm reservation with 3 pax (successfully confirmed a reservation with 3 pax)
        })

    test("Verify user successfully confirmed a reservation with 10 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Confirm reservation with 10 pax (successfully confirmed a reservation with 10 pax)
        })

    test("Verify user cannot confirm a reservation as the table is fully booked",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Confirm reservation when the table is fully booked (Cannot confirm reservation because the table is fully booked)
        })
})
