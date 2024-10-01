import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Dine In Test", () => {
    const tag = '@smokeTest @eso @dineIn @applyMembership '

    test("Should successfully navigate to the dine-in page using guest mode  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should successfully login to ESB order dine-in mode using Google account  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should successfully login to ESB order dine-in mode using Facebook account  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should successfully login to ESB order dine-in mode using Membership Loop account  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should successfully login to Ayomakan and open dine-in mode  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should fail to login using Google account  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should fail to login using Facebook account  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Login
        })

    test("Should fail to login using Membership Loop account  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Login
        })
})