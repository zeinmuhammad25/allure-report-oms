import {test} from "@playwright/test";

test.describe.serial("Delivery Later Test", () => {
    const tag = '@smokeTest @eso @deliveryLater @transactionDeliveryLater '

    test("Verify user can successfully complete a delivery later transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with a single menu with notes and payment via GoPay",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 25k promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 70% Menu Category Detail promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot use the promo for Dana payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user can successfully complete a delivery later transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Delivery Later
            //

        })
})
