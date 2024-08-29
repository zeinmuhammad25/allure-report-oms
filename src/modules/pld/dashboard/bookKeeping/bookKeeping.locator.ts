import BaseLocator from "../../../../base/base-locator";

export default class BookKeepingLocator extends BaseLocator {
    //Statistic Pembukuan
    static bookKeepingDropdown: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Cabang' and @nzsize='large' and contains(@class, 'ant-select-lg')]";
    static thisWeekTab: string = "(//button[normalize-space()='Minggu Ini'])[1]";
    static thisMonthTab: string = "(//button[normalize-space()='Bulan Ini'])[1]";
    static threeMonthTab: string = "(//button[normalize-space()='3 Bulan'])[1]";
    static sixMonthTab: string = "(//button[normalize-space()='6 Bulan'])[1]";
    static oneYearTab: string = "(//button[normalize-space()='1 Tahun'])[1]";

    //Transaksi
    static incomeTab: string = "(//div[contains(text(),'Pendapatan')])[1]";
    static expenseTab: string = "(//div[contains(text(),'Pengeluaran')])[1]";
    static profiTab: string = "(//div[contains(text(),'Keuntungan')])[1]";

}