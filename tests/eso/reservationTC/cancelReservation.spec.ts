import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @cancelReservation '

    test.beforeEach(async ({page})=>{
        // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
        // 2. Masuk ke esb book
        // 3. Pilih branch Dennys Kasablanka
    })
    test("Verify user successfully canceled a confirmed reservation",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Cancel a confirmed reservation (successfully canceled the reservation)
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })

    test("Verify user unable to cancel a reservation that has not been confirmed",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Cancel an unconfirmed reservation (Cannot cancel as the reservation hasn't been confirmed)
            // 4. Lakukan action Konfirmasi pada pesanan tujuan kencan
        })

    test("Verify user successfully canceled a reservation with reason want to reschedule",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Cancel a reservation with reason want to reschedule
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })

})








