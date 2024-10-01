import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Dine In Test", () => {
    const tag = '@smokeTest @eso @dineIn @language '

    test("Verify user successfully set the language to Indonesian  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Language
        })

    test("Verify user successfully set the language to English  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Language
        })
})