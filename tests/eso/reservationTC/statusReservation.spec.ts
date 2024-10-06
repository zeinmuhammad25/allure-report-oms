import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @statusReservation '

    test.beforeEach(async ({page})=>{
        // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
        // 2. Masuk ke esb book
        // 3. Pilih branch Dennys Kasablanka
    })

    test("Verify user can view the reservation status as 'Processed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Processed' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan tujuan kencan
        })

    test("Verify user can view the reservation status as 'Confirmed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Confirmed' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 20
        })

    test("Verify user can view the reservation status as 'Cancelled' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Cancelled' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan dengan tujuan makan siang
        })

    test("Verify user can view the reservation status as 'Rejected' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Rejected' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })

    test("Verify user can view the reservation status as 'Completed' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Completed' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan tujuan kencan
        })

    test("Verify user can view the reservation status as 'Processed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Processed' on the transaction details page
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 20
        })

    test("Verify user can view the reservation status as 'Confirmed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Confirmed' on the transaction details page
            // 4. Lakukan action Konfirmasi pada pesanan dengan tujuan makan siang
        })

    test("Verify user can view the reservation status as 'Cancelled' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Cancelled' on the transaction details page
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })

    test("Verify user can view the reservation status as 'Rejected' on the reservation history page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Rejected' on the reservation history page
            // 4. Lakukan action Konfirmasi pada pesanan tujuan kencan
        })

    test("Verify user can view the reservation status as 'Completed' on the transaction details page",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // View the reservation status as 'Completed' on the transaction details page
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 20
        })
})
