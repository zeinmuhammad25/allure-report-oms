import BaseLocator from "../../../../base/base-locator";

export default class RemainingFundsLocator extends BaseLocator {
    static incomeSummaryTab: string = "//div[@role='tab' and text()='Rangkuman Pendapatan']";
    static incomeListTab: string = "//div[@role='tab' and text()='Daftar Pendapatan']";
    static withdrawalFundsInformation: string = "//button[text()=' Informasi Penarikan Dana ']";
    static currentBalanceCard: string = "//span[text() = 'Saldo Dapat diambil*']";
    static lastWithdrawalBalanceCard: string = "//span[text() = 'Saldo terakhir diambil']";

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

    static balanceCanBeWithdrawnTitle: string = "//div[text()='Saldo Dapat Diambil']";
    static incomeTotalValue: string = "(//span[text()='Total Pendapatan']/parent::div/following-sibling::div)[1]";
    static outcomeTotalValue: string = "//span[text()='Total Potongan']/parent::div/following-sibling::div";
    static balanceCanBeWithdrawnValue: string = "//span[text()='Saldo yang dapat diambil*']/parent::div/following-sibling::div";

    static withdrawalHistoryPopUp: string = "//app-modal-disbursement-balance-wd";
    static viewButton: string = "//span[text()='Tampilkan']/parent::button";
    static dateButton: string = "//app-date-range-picker-custom";
    static backButton: string = "//button[text()='Kembali']";

    // List Income
    static reportMode: string = "#reportMode";
    static showReport: string = "//button[text()='Tampilkan']";
    static salesFunds: string = "//button[text()='Dana Penjualan']";
    static referralProgram: string = "//button[text()='Program Referral']";
    static listIncomeIncomeTotalValue: string = "//span[text()='Total Pendapatan']/following-sibling::span";
    static listIncomeOutcomeTotalValue: string = "//span[text()='Total Potongan']/following-sibling::span";
    static listIncomeFundsTotalValue: string = "//span[text()='Total Saldo dapat diambil*']/following-sibling::span[1]";


}