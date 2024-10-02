import {test} from "@playwright/test";

test.describe.serial("Delivery Test", () => {
    const tag = '@smokeTest @eso @delivery @transactionDelivery '

    test("Verify user can successfully complete a delivery transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with single, extra, and package menu with notes on extra and payment via QRIS",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 25k promo and BCA VA payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user can successfully complete a delivery transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery
            //

        })
})
