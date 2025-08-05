import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @rejectReservation '

    test.beforeEach(async ({page})=>{
        // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
        // 2. Masuk ke esb book
        // 3. Pilih branch Dennys Kasablanka
    })

    test("Verify user can reject reservation with status 'new'",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Reject reservation with the condition that the reservation status is 'new'
            // 4. Lakukan action Konfirmasi pada pesanan tujuan kencan
        })

    test("Verify user can not reject reservation with status 'confirmed', can only cancel",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Reject reservation with the condition that the reservation status is 'confirmed'
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 20
        })
})
