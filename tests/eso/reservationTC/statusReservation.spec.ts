import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @statusReservation '

    test("Verify user can view the reservation status as 'Processed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Processed' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Confirmed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Confirmed' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Cancelled' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Cancelled' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Rejected' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Rejected' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Completed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Completed' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Processed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Processed' on the transaction details page
        })

    test("Verify user can view the reservation status as 'Confirmed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Confirmed' on the transaction details page
        })

    test("Verify user can view the reservation status as 'Cancelled' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Cancelled' on the transaction details page
        })

    test("Verify user can view the reservation status as 'Rejected' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Rejected' on the reservation history page
        })

    test("Verify user can view the reservation status as 'Completed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Completed' on the transaction details page
        })

})
