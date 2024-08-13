import BaseLocator from "../../../../base/base-locator";

export default class SubscriptionStatusLocator extends BaseLocator {

    static mySubscriptionTab: string = "//div[@role='tab' and text()='Langganan Anda']";
    static invoicesHistoryTab: string = "//div[@role='tab' and text()='Langganan Anda']";
    static estimatePaymentBadge: string = "//div[@class='estimate-badge']";
    static balanceBadge: string = "//div[@class='saldo-badge']";

    static numberColumn: string = "//th[text() = 'No.']";
    static branchNameColumn: string = "//th[text() = ' Nama Cabang ']";
    static subscriptionPeriodColumn: string = "//th[text() = ' Periode Langganan ']";
    static expireDateColumn: string = "//th[text() = ' Tanggal Kadaluarsa ']";
    static nextExtensionPeriodColumn: string = "//th[text() = ' Periode Perpanjang Berikutnya ']";
    static nextBillingColumn: string = "//th[text() = ' Tagihan Berikutnya ']";
    static autoExtensionColumn: string = "//th[text() = ' Perpanjang Otomatis ']";
    static autoExtensionBranchColumn: string = "//th[text() = ' Cabang ']";
    static autoExtensionInventoryColumn: string = "//th[text() = ' Inventori ']";

    static balanceTopUpButton: string = "//button[@ng-reflect-router-link='/account-balance']";
    static addBranchButton: string = "//button[text()=' Cabang ']";

    static emailVerificationSnackBar: string = "//app-snackbar-email-verification";
    static resendEmailVerificationButton: string = "(//span[text() = ' Kirim Ulang Email Verifikasi '])[2]";


}