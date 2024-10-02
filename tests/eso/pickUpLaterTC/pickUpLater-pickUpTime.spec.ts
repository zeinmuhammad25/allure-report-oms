import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Pick Up Later Test", () => {
    const tag = '@smokeTest @eso @pickUpLater @pickUpTime '

    test("Verify user can successfully set the language to Indonesian",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user cannot set the language to English",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user cannot select tomorrow's date (disabled)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user can successfully select pickup time 1 hour from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user can successfully select pickup time 3 hours from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user can successfully select pickup time 3 hours from current time",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user cannot select back time (time before current)",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })

    test("Verify user cannot select time beyond store closing time",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Pickup Time
        })
})
