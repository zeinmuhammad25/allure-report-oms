import {test} from "@playwright/test";

test.describe.serial("Reservation Test", () => {
    const tag = '@smokeTest @eso @reservation @inviteGuest '

    test.beforeEach(({page})=>{
        // Tidak ada pilihan undang tamu
        // 1. Buka History Order Reservasi
        // 2. Klik List Card Reservasi
        // 3. Klik undang tamu
    })

    test("Verify user successfully invited 1 guest using a valid email",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Invite 1 guest using a valid email (successfully invited 1 guest using a valid email)
            // 4. Masukan 1 email valid
            // 5. Lakukan undang sekarang
        })

    test("Verify user successfully invited 2 guests using valid emails",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Invite 2 guests using valid emails (successfully invited 2 guests using valid emails)
            // 4. Masukan 2 email valid
            // 5. Lakukan undang sekarang
        })

    test("Verify user successfully invited 2 guests using same valid emails",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Invite 2 guests using same valid emails (successfully invited 2 guests using valid emails)
            // 4. Masukan 2 email yang valid yang sama
            // 5. Lakukan undang sekarang
        })

    test("Verify user validation fails when inviting 2 guests with 1 invalid email",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Invite 2 guests with 1 invalid email (Validation fails for the invalid email)
            // 1. Buka esb book via esb core https://qa5.esb.co.id/esb-core/master/index
            // 2. Masuk ke esb book
            // 3. Pilih branch Dennys Kasablanka
            // 4. Masukan 1 email valid dan 1 email invalid sama
            // 5. Lakukan undang sekarang
        })
})
