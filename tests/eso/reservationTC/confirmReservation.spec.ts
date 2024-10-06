import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @confirmReservation '

    test.beforeEach(async ({page}) => {
        // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
        // 2. Masuk ke esb book
        // 3. Pilih branch Dennys Kasablanka
    })

    test("Verify user successfully confirmed a reservation with 3 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Confirm reservation with 3 pax (successfully confirmed a reservation with 3 pax)
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 3"
        })

    test("Verify user successfully confirmed a reservation with 10 pax",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Confirm reservation with 10 pax (successfully confirmed a reservation with 10 pax)
            // 4. Lakukan action Konfirmasi pada pesanan dengan jumlah pax 10
        })

    test("Verify user cannot confirm a reservation as the table is fully booked",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Confirm reservation when the table is fully booked (Cannot confirm reservation because the table is fully booked)
            // 4. Lakukan action Konfirmasi pada kondisi table sudah full booking"
        })
})
