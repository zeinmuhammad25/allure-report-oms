import BaseLocator from "../../../base/base-locator";

export default class HistoryLocator extends BaseLocator {
    static dateFilter: string = "//app-date-range-picker-custom";
    static reportMode: string = "#reportMode";
    static showReport: string = "//button[text()='Tampilkan']";
    static withdrawalFundsInformation: string = "//button[text()=' Informasi Penarikan Dana ']";

    static historySummaryTab: string = "//div[@role='tab' and text()='Rangkuman Riwayat']";
    static historyListTab: string = "//div[@role='tab' and text()='Daftar Riwayat']";

    static incomeTitle: string = "//div[text()='Pendapatan']";
    static salesIncomeValue: string = "//span[text()='Penjualan']/parent::div/following-sibling::div";
    static referralIncomeValue: string = "//span[text()='Referral']/parent::div/following-sibling::div";
    static incomeTotalInIncomeCard: string = "(//span[text()='Total Pendapatan']/parent::div/following-sibling::div)[1]";

    static outcomeTitle: string = "//div[text()='Potongan']";
    static mdrOutcomeValue: string = "//span[text()='MDR (+PPN 11%)']/parent::div/following-sibling::div";
    static deliveryFeeValue: string = "//span[text()='Biaya Pengiriman']/parent::div/following-sibling::div";
    static esoFeeValue: string = "//span[text()='Biaya Layanan ESB Order']/parent::div/following-sibling::div";
    static platformFeeValue: string = "//span[text()='Biaya Platform']/parent::div/following-sibling::div";
    static promotionValue: string = "//span[text()='Promo']/parent::div/following-sibling::div";
    static outcomeTotalInOutcomeCard: string = "//span[text()='Total Pengeluaran']/parent::div/following-sibling::div";

    // List Income
    static salesFunds: string = "//button[text()='Dana Penjualan']";
    static referralProgram: string = "//button[text()='Program Referral']";
    static listIncomeIncomeTotalValue: string = "//span[text()='Total Pendapatan']/following-sibling::span";
    static listIncomeOutcomeTotalValue: string = "//span[text()='Total Potongan']/following-sibling::span";
}