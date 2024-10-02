import {test} from "@playwright/test";

test.describe.serial("Pick Up Test", () => {
    const tag = '@smokeTest @eso @pickUp @language '

    test("Verify user can successfully complete a pickup transaction with OVO payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with DANA payment",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can generate a pickup transaction QR code",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup order with single menu with notes and payment via LinkAja",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup order with single menu with notes and payment via GoPay",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can generate a pickup transaction QR code with sweet menu notes",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with a 25k promo and payment via OVO",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with 35% All Category promo and payment via OVO",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with 10% Menu Category promo and payment via OVO",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply promo for QRIS payment",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with special price promo and payment via OVO",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with 3 online voucher types and payment via Shopee",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with 5 ESB vouchers and payment via Shopee",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user can successfully complete a pickup transaction with 1 offline voucher and payment via OVO",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

    test("Verify user cannot apply voucher as it is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO:
            // Transaction Pick-Up
        })

})