import {test} from "@playwright/test";

test.describe.serial("Full Service Test", () => {
    const tag = '@smokeTest @eso @fullService @transactionFullService '

    test("Verify user can successfully complete a full service transaction using Dana payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user can generate a QR code for a full service transaction",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user can successfully complete a full service transaction with a single menu with notes and payment via LinkAja",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 3 online vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 3 offline vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user can successfully complete a custom mode transaction with 3 ESB vouchers and Shopee payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction FS
            //

        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction FS

        })
})