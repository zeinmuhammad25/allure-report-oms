import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Payment Report Test", () => {
    const tag = '@smokeTest @eso @branchList @language '

    test("Should display that the language used in ESB Order Quick Service has successfully changed to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah bahasa menjadi bahasa indonesia (Bahasa pada esb order quick service menjadi bahasa indonesia)
        })

    test("Should display that the language used in ESB Order Quick Service has successfully changed to English",
        {tag: tag + '@positive'}, async ({page}) => {
            // TODO :
            //  Ubah bahasa menjadi bahasa english (Bahasa pada esb order quick service menjadi bahasa english)
        })
})

// Test suite