import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @bookingReservation '
    test("Verify user successfully made a reservation with 1 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with 1 pax (successfully reserved with 1 pax)
        })

    test("Verify user successfully made a reservation with 2 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with 2 pax (successfully reserved with 2 pax)
        })

    test("Verify user successfully made a reservation with 10 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with 10 pax (successfully reserved with 10 pax)
        })

    test("Verify user successfully made a reservation with 20 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with 20 pax (successfully reserved with 20 pax)
        })

    test("Verify user unable to reserve for more than 20 pax",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with more than 20 pax (Cannot reserve for more than 20 pax)
        })

    test("Verify user successfully made a reservation for today",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for today (successfully reserved for today)
        })

    test("Verify user successfully made a reservation for tomorrow",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for tomorrow (successfully reserved for tomorrow)
        })

    test("Verify user successfully made a reservation for the day after tomorrow",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for the day after tomorrow (successfully reserved for the day after tomorrow)
        })

    test("Verify user cannot select a date for yesterday",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation for yesterday (Cannot select a date for yesterday)
        })

    test("Verify user successfully made a reservation for the closest available time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for the closest available time (successfully reserved for the closest available time)
        })

    test("Verify user successfully made a reservation for 2 hours from now",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for 2 hours from now (successfully reserved for 2 hours ahead)
        })

    test("Verify user successfully made a reservation for the latest available time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for the latest available time (successfully reserved for the latest time)
        })

    test("Verify user cannot select a time that has already passed",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation for a past time (Cannot select a past time)
        })

    test("Verify user successfully made a reservation with the title Mr.",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with the title Mr. (successfully reserved with the title Mr.)
        })

    test("Verify user successfully made a reservation with the title Mrs.",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with the title Mrs. (successfully reserved with the title Mrs.)
        })

    test("Verify user successfully made a reservation with the title Miss.",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with the title Miss. (successfully reserved with the title Miss.)
        })

    test("Verify user successfully made a reservation using alphabetic characters in the name",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation using alphabetic characters in the name (successfully reserved using alphabetic characters)
        })

    test("Verify user successfully made a reservation using alphanumeric and special characters in the name",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation using alphabetic, numeric, and special characters in the name (successfully reserved using alphanumeric and special characters)
        })

    test("Verify user button is disabled because the name contains an emoji",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation using alphabetic characters and an emoji (Button is disabled because the name format is invalid)
        })

    test("Verify user successfully made a reservation with a valid email",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with a valid email (successfully reserved with a valid email)
        })

    test("Verify user email validation fails with an invalid email",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with an invalid email (Email validation fails with an invalid email)
        })

    test("Verify user successfully made a reservation with a phone number starting with 08 and 13 characters",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with a phone number starting with 08 and 13 characters (successfully reserved with a 13-character phone number starting with 08)
        })

    test("Verify user successfully made a reservation with a phone number starting with 628 and 13 characters",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with a phone number starting with 628 and 13 characters (successfully reserved with a 13-character phone number starting with 628)
        })

    test("Verify user phone number validation fails with an invalid number (0000-0000-0000)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with an invalid phone number (Phone number validation fails)
        })

    test("Verify user successfully made a reservation for a birthday event",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for a birthday event (successfully reserved for a birthday event)
        })

    test("Verify user successfully made a reservation for a greeting event",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for a greeting event (successfully reserved for a greeting event)
        })

    test("Verify user successfully made a reservation for a reunion event",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation for a reunion event (successfully reserved for a reunion event)
        })

    test("Verify user successfully made a reservation with additional notes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation with additional notes (successfully reserved with additional notes)
        })

    test("Verify user successfully made a reservation without adding any notes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Reservation without adding notes (successfully reserved without adding notes)
        })

    test("Verify user validation fails when entering notes with an emoji",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Reservation with notes containing an emoji (Validation fails as notes cannot include emojis)
        })

})
