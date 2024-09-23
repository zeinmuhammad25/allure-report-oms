import BaseLocator from "../../../base/base-locator";

export default class ReportLocator extends BaseLocator {

    // Navigation Button
    static reportSideBar: string = "//div[contains(text(),'Laporan')]"
    static reportSummarySideBar: string = "//a[normalize-space()='Rangkuman Penjualan']"
    static salesDetailSideBar: string = "//a[normalize-space()='Detail Penjualan']"
    static paymentSideBar: string = "//a[normalize-space()='Pembayaran']"
    static promotionSideBar: string = "//a[normalize-space()='Promosi']"
    static cancelAndVoidSideBar: string = "//a[normalize-space()='Batal dan Void']"
    static salesMenuSideBar: string = "//a[normalize-space()='Penjualan Menu']"
    static profitAndLostSideBar: string = "//a[normalize-space()='Laba Rugi']"
}