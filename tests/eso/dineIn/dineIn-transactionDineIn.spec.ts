import {test} from "@playwright/test";
import LoginPage from "../../../src/modules/pld/login/login.page";
import PaymentPage from "../../../src/modules/pld/report/payment/payment.page";

test.describe.serial("Dine In Test", () => {
    const tag = '@smokeTest @eso @dineIn @transactionDineIn '

    test("Should successfully complete a dine-in transaction with OVO payment  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with DANA payment  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should generate a dine-in transaction QR code  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in order with single menu with notes and payment via LinkAja  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in order with single menu with notes and payment via GoPay  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should generate a dine-in transaction QR code with sweet menu notes  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with a 25k promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with 35% All Category promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with 10% Menu Category promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with special price promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with 3 online voucher types and payment via Shopee  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when voucher is not found  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with 5 ESB vouchers and payment via Shopee  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when voucher is not found  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should successfully complete a dine-in transaction with 1 offline voucher and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })

    test("Should trigger validation when voucher is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
        })
})