import {test} from "@playwright/test";

test.describe.serial("Custom Mode Test", () => {
    const tag = '@smokeTest @eso @customMode @transactionDineIn '

    test("Verify user can successfully complete a custom mode transaction using OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can generate a QR code for a custom mode transaction",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via LinkAja",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a single menu with notes and payment via GoPay",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can generate a QR code for a custom mode transaction and include notes for a sweet menu",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a 25k promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a 35% All Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a 10% Menu Category promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot use the promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with a special price promo and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 5 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 1 offline voucher and OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Dine-in
            //

        })
})