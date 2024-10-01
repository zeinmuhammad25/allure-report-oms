import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Dine In Test", () => {
    const tag = '@smokeTest @eso @dineIn @applyMembership '

    test("Should successfully apply Membership Loop in dine-in mode  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Apply Membership
        })

    test("Should fail to apply Membership Loop  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Apply Membership
        })

})