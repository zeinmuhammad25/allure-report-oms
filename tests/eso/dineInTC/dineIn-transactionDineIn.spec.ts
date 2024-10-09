import {test} from "@playwright/test";
import OrderPage from "../../../src/modules/eso/pages/order/order.page";
import BranchListPage from "../../../src/modules/eso/pages/branchList/branchList.page";
import ModePage from "../../../src/modules/eso/pages/mode/mode.page";
import {EsoMode} from "../../../src/modules/eso/objects/esoMode";

test.describe.serial("Dine In Test", () => {
    const tag = '@smokeTest @eso @dineIn @transactionDineIn '

    let orderPage: OrderPage;
    const branchName = "Denny's Kasablanka";
    const phoneNumber = '083806992528';
    const password = 'abcd123';

    test.beforeEach(async ({page})=>{
        let branchList = new BranchListPage(page);
        let modePage = new ModePage(page);
        orderPage = new OrderPage(page);

        await branchList.navigateHere();
        await branchList.wait(300);
        await branchList.searchBranch(branchName);
        await branchList.selectBranch(branchName);
        await modePage.performCheckInitialElements();
        await modePage.selectMode(EsoMode.DineIn);
        await orderPage.inputTable(1);
        await orderPage.performApplyMembershipSubs(phoneNumber, password);
    })

    test("Verify user successfully complete a dine-in transaction with OVO payment  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Pada halaman payment pilih pembayaran ovo
            // 10. Lakukan Payment
        })

    test("Verify user successfully complete a dine-in transaction with DANA payment  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Pada halaman payment pilih pembayaran dana
            // 10. Lakukan Payment
        })

    test("Verify user can generate a dine-in transaction QR code  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single
            // 8. Checkout menu
            // 9. Pada halaman payment pilih pembayaran at cashir
            // 10. Lakukan Payment
        })

    test("Verify user successfully complete a dine-in order with single menu with notes and payment via LinkAja  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment pilih payment linkaja
            // 10. Lakukan payment
        })

    test("Verify user successfully complete a dine-in order with single menu with notes and payment via GoPay  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment pilih payment gopay
            // 10. Lakukan payment
        })

    test("Verify user can generate a dine-in transaction QR code with sweet menu notes  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single, dan input notes menu manis
            // 8. Checkout menu
            // 9. Pada halaman payment bayar di kasir
            // 10. Lakukan payment
        })

    test("Verify user successfully complete a dine-in transaction with a 25k promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo amount 25k
            // 11 Payment menggunakan ovo
        })

    test("Verify user can trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo amount 25k
            // 11. Payment menggunakan qris
        })

    test("Verify user successfully complete a dine-in transaction with 35% All Category promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan ovo
        })

    test("Verify user can trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen All Category 35%
            // 11. Payment menggunakan qris
        })

    test("Verify user successfully complete a dine-in transaction with 10% Menu Category promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan ovo
        })

    test("Verify user can trigger validation when the promo cannot be used for QRIS payment  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo Persen Menu Category 10%
            // 11. Payment menggunakan dana
        })

    test("Verify user successfully complete a dine-in transaction with special price promo and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply promo spesial price
            // 11. Pilih payment ovo
        })

    test("Verify user successfully complete a dine-in transaction with 3 online voucher types and payment via Shopee  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 3 vocher online type amount
            // 11. Payment menggunakan shopee
        })

    test("Verify user can trigger validation when voucher is not found  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher online type amount yang expired
        })

    test("Verify user successfully complete a dine-in transaction with 5 ESB vouchers and payment via Shopee  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 5 vocher esb
            // 12. Payment menggunakan dana
        })

    test("Verify user can trigger validation when voucher is not found  ",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Pilih masuk sebagai tamu
            // 7. Login google via sidebar menu
            // 8. Tambahkan menu single ,extra,paket
            // 9. Checkout menu
            // 10. Klik section promo dan vocher
            // 11. Apply 1 vocher esb yang expired
        })

    test("Verify user successfully complete a dine-in transaction with 1 offline voucher and payment via OVO  ",
        {tag: tag + '@positive'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline
            // 11. Payment menggunakan ovo
        })

    test("Verify user can trigger validation when voucher is not found",
        {tag: tag + '@negative'}, async ({page}) => {
            //TODO :
            // Transaction Dine-in
            // 6. Login google via sidebar menu
            // 7. Tambahkan menu single ,extra,paket
            // 8. Checkout menu
            // 9. Klik section promo dan vocher
            // 10. Apply 1 vocher offline yang expired
        })
})