import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @intervalReservationTime '

    test.beforeEach(async ({page}) => {
        // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
        // 2. Masuk ke esb book
        // 3. Pilih branch Dennys Kasablanka
    })
    test("Verify user can set the time gap between reservations to 30 minutes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 30 minutes
            // 4. Lakukan action Konfirmasi pada pesanan dengan tujuan makan siang
        })

    test("Verify user can set the time gap between reservations to 60 minutes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 60 minutes
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })

    test("Verify user can set the starting time 1 hour from now, with a 30-minute interval between reservation times",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Open reservation with the condition that the interval time is set to 30 minutes and the starting time is set to 60 minutes
            // 4. Lakukan action Konfirmasi pada pesanan tujuan rapat
        })







})
