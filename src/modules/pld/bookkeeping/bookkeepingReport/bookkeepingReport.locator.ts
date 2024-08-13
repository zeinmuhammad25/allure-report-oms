import BaseLocator from "../../../../base/base-locator";

export default class BookkeepingReportLocator extends BaseLocator {

    // Index
    static startMonthSearch: string = "//nz-range-picker//input[@placeholder='Start month']";
    static endMonthSearch: string = "//nz-range-picker//input[@placeholder='End month']";
    static reportTypeSearch: string = "( //nz-select[@nzplaceholder='Pilih Tipe Laporan'])[1]";
    static businessNameSearch: string = "(//input[@placeholder='Pilih Usaha'])[1]";
    static branchNameSearch: string = "(//input[@placeholder='Pilih Cabang'])[1]";
    static showReportButton: string = "//button[text()=' Tampilkan ']";
    static downloadReportButton: string = "//button[text()='Unduh']";

    // Cash Flow Statement
    static cashFlowStatementTitle: string = "//h1[text()='Laporan Arus Kas']";
    static initialAmountSection: string = "//div/h4[text()='A. Jumlah Awal']";
    static totalIncomeSection: string = "//div/h4[text()='B. Total Pendapatan']";
    static totalOutcomeSection: string = "//div/h4[text()='C. Total Pengeluaran']";
    static cashFlowSection: string = "//div/h4[text()='D. Arus Kas (B-C)']";
    static finalAmountSection: string = "//div/h4[text()='E. Jumlah Akhir (A+D)']";

    // Transaction List Report
    static transactionListReportTitle: string = "//h1[text()='Laporan Daftar Transaksi']";
    static initialAmountCard: string = "//div/h6[text()='Total Awal ']";
    static totalIncomeCard: string = "//div/h6[text()='Total Pendapatan ']";
    static totalOutcomeCard: string = "//div/h6[text()='Total Pengeluaran ']";
    static finalAmountCard: string = "//div/h6[text()='Total Akhir ']";

    static numberColumn: string = "//th[text()=' No ']";
    static dateColumn: string = "//th[text()=' Tanggal ']";
    static categoryColumn: string = "//th[text()=' Kategori ']";
    static notesColumn: string = "//th[text()=' Catatan ']";
    static totalTransactionColumn: string = "//th[text()=' Total Transaksi ']";
    static typeColumn: string = "//th[text()=' Tipe ']";
    static remainingValueColumn: string = "//th[text()=' Sisa nilai ']";

}