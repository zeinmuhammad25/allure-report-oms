import BaseLocator from "../../../../base/base-locator";

export default class NotificationEmailLocator extends BaseLocator {
    static notificationEmailTab: string = "//div[@role='tab' and text()='Email Notifikasi']";
    static addNotificationEmailButton: string = "//button[@routerlink='/account-setting/email-recipient/create']";
    static recipientEmailSearch: string = "//input[@placeholder='Cari Berdasarkan Email Penerima']";
    static branchSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Cabang']";
    static activeFeatureSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Fitur Yang Aktif']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static recipientEmailColumn: string = "//nz-table-sorters/span[text() = ' Email Penerima ']";
    static branchColumn: string = "//nz-table-sorters/span[text() = ' Cabang ']";
    static activeFeatureColumn: string = "//th[text() = ' Fitur Yang Aktif ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";


    // Add Notification Email
    static emailField: string = "#emailRecipient";
    static branchField: string = "#branchIDs";
    static closingStoreSwitch: string = "//td[text()='Tutup Toko']/following-sibling::td/nz-switch";
    static dalySummarySwitch: string = "//td[text()='Ringkasan Harian']/following-sibling::td/nz-switch";
    static monthlySummarySwitch: string = "//td[text()='Ringkasan Bulanan']/following-sibling::td/nz-switch";
    static saveButton: string = "//button[text()=' Simpan ']";
    static cancelButton: string = "//button[@routerlink='/account-setting/email-recipient/index']";


}