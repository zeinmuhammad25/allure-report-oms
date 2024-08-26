import BaseLocator from "../../../../base/base-locator";

export default class BookkeepingReportLocator extends BaseLocator {

    // Index
    static startMonthSearch: string = "//input[@placeholder='Start month']";
    static endMonthSearch: string = "//input[@placeholder='End month']";
    static reportTypeSearch: string = "//div[@ng-reflect-ng-class='[object Object]']//app-profit-loss-report//app-profit-loss-report-index//div//div//div//div//div//div//nz-form-item//nz-form-control//div//div//nz-select-top-control[@ng-reflect-open='false']";
    static businessNameSearch: string = "//div[@ng-reflect-ng-class='[object Object]']//app-profit-loss-report//app-profit-loss-report-index//div//div//div//div//div//div//nz-form-item//nz-form-control//div//div//nz-input-group[@nzsize='large']//nz-input-group[@nzsize='large']";
    static branchNameSearch: string = "//body[1]/app-layout[1]/nz-layout[1]/nz-layout[1]/nz-content[1]/div[2]/app-profit-loss-report[1]/app-profit-loss-report-index[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/nz-form-item[1]/nz-form-control[1]/div[1]/div[1]/nz-input-group[1]";
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