import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Branch List Test", () => {
    const tag = '@smokeTest @eso @branchList @orderAndReservationHistory '

    test("Should display the order history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Lihat halaman order history yang terdapat data order
        })

    test("Should display that the ESB Order transaction history data was not found",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Lihat halaman order history yang tidak ada data order
        })

    test("Should display the reservation history data successfully",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Lihat halaman reservation history yang terdapat data reservasi
        })

    test("Should display that the reservation history data was not found",
        {tag: tag + '@negative'}, async ({page}) => {
            // TODO :
            //  Lihat halaman reservation history yang tidak ada data reservasi
        })
})














