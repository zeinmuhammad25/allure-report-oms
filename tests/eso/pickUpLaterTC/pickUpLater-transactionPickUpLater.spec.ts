import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Pick Up Later Test", () => {
    const tag = '@smokeTest @eso @pickUpLater @transactionPickUpLater '

    test("Verify user can successfully complete a pickup later transaction with Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with single, extra, and package menu with notes on extra and payment via QRIS",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 25k promo and BCA VA payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 70% Menu Category Detail promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply promo for DANA payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user can successfully complete a pickup later transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up Later
        })

})
