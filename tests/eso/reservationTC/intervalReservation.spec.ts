import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @intervalReservationTime '

    test("Should set the time gap between reservations to 30 minutes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 30 minutes
        })

    test("Should set the time gap between reservations to 60 minutes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 60 minutes
        })

    test("Should set the starting time 1 hour from now, with a 30-minute interval between reservation times",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 30 minutes and the starting time is set to 60 minutes
        })
})
