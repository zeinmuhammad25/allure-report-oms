import BaseLocator from "../../../base/base-locator";

export default class UserAccessBackendLocator extends BaseLocator {

    static userAccessBackendTab: string = "//div[@role='tab' and text()='Hak Akses Backend']";
    static addUserAccessBackendButton: string = "//button[@routerlink='/role/user-role/create']";
    static userAccessBackendNameField: string = "#roleDesc";
    static cancelButton: string = "//button[@routerlink='/role/user-role/index']";
    static saveButton: string = "//button[text()=' Simpan ']";

    static userAccessBackendNameSearch: string = "//input[@placeholder='Cari Berdasarkan Nama Hak Akses Backend']";
    static userAccessTypeSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Tipe Hak Akses']";
    static userActiveFeatureSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Fitur Yang Aktif']";
    static statusSearch: string = "//nz-select[@nzplaceholder='Cari Berdasarkan Status']";

    static userAccessBackendNameColumn: string = "//nz-table-sorters/span[text() = ' Nama Hak Akses Backend ']";
    static userAccessTypeColumn: string = "//nz-table-sorters/span[text() = ' Tipe Hak Akses ']";
    static userActiveFeatureColumn: string = "//nz-table-sorters/span[text() = ' Fitur Yang Aktif ']";
    static statusNameColumn: string = "//th[text() = ' Status ']";


    static dashboardSelectAll: string = "//strong[text()='Dashboard']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static dashboardViewAll: string = "//strong[text()='Dashboard']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static dashboardInsertAll: string = "//strong[text()='Dashboard']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static dashboardUpdateAll: string = "//strong[text()='Dashboard']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static dashboardDeleteAll: string = "//strong[text()='Dashboard']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static esbOrderSelectAll: string = "//strong[text()='ESB Order']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static esbOrderViewAll: string = "//strong[text()='ESB Order']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static esbOrderInsertAll: string = "//strong[text()='ESB Order']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static esbOrderUpdateAll: string = "//strong[text()='ESB Order']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static esbOrderDeleteAll: string = "//strong[text()='ESB Order']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static onlineOrderSelectAll: string = "//strong[text()='Online Order']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static onlineOrderViewAll: string = "//strong[text()='Online Order']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static onlineOrderInsertAll: string = "//strong[text()='Online Order']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static onlineOrderUpdateAll: string = "//strong[text()='Online Order']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static onlineOrderDeleteAll: string = "//strong[text()='Online Order']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static reportSelectAll: string = "//strong[text()='Laporan']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static reportViewAll: string = "//strong[text()='Laporan']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static reportInsertAll: string = "//strong[text()='Laporan']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static reportUpdateAll: string = "//strong[text()='Laporan']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static reportDeleteAll: string = "//strong[text()='Laporan']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static withdrawalFundsSelectAll: string = "//strong[text()='Penarikan Dana']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static withdrawalFundsViewAll: string = "//strong[text()='Penarikan Dana']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static withdrawalFundsInsertAll: string = "//strong[text()='Penarikan Dana']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static withdrawalFundsUpdateAll: string = "//strong[text()='Penarikan Dana']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static withdrawalFundsDeleteAll: string = "//strong[text()='Penarikan Dana']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static catalogueSelectAll: string = "//strong[text()='Katalog']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static catalogueViewAll: string = "//strong[text()='Katalog']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static catalogueInsertAll: string = "//strong[text()='Katalog']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static catalogueUpdateAll: string = "//strong[text()='Katalog']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static catalogueDeleteAll: string = "//strong[text()='Katalog']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static inventorySelectAll: string = "//strong[text()='Inventori']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static inventoryViewAll: string = "//strong[text()='Inventori']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static inventoryInsertAll: string = "//strong[text()='Inventori']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static inventoryUpdateAll: string = "//strong[text()='Inventori']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static inventoryDeleteAll: string = "//strong[text()='Inventori']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static inventoryAddOnSelectAll: string = "//strong[text()='Inventory Add On']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static inventoryAddOnViewAll: string = "//strong[text()='Inventory Add On']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static inventoryAddOnInsertAll: string = "//strong[text()='Inventory Add On']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static inventoryAddOnUpdateAll: string = "//strong[text()='Inventory Add On']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static inventoryAddOnDeleteAll: string = "//strong[text()='Inventory Add On']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static promotionSelectAll: string = "//strong[text()='Promosi']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static promotionViewAll: string = "//strong[text()='Promosi']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static promotionInsertAll: string = "//strong[text()='Promosi']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static promotionUpdateAll: string = "//strong[text()='Promosi']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static promotionDeleteAll: string = "//strong[text()='Promosi']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static printerSettingSelectAll: string = "//strong[text()='Pengaturan Printer']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static printerSettingViewAll: string = "//strong[text()='Pengaturan Printer']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static printerSettingInsertAll: string = "//strong[text()='Pengaturan Printer']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static printerSettingUpdateAll: string = "//strong[text()='Pengaturan Printer']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static printerSettingDeleteAll: string = "//strong[text()='Pengaturan Printer']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static accountSettingSelectAll: string = "//strong[text()='Pengaturan Akun']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static accountSettingViewAll: string = "//strong[text()='Pengaturan Akun']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static accountSettingInsertAll: string = "//strong[text()='Pengaturan Akun']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static accountSettingUpdateAll: string = "//strong[text()='Pengaturan Akun']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static accountSettingDeleteAll: string = "//strong[text()='Pengaturan Akun']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static userAccessControlSelectAll: string = "//strong[text()='Hak Akses']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static userAccessControlViewAll: string = "//strong[text()='Hak Akses']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static userAccessControlInsertAll: string = "//strong[text()='Hak Akses']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static userAccessControlUpdateAll: string = "//strong[text()='Hak Akses']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static userAccessControlDeleteAll: string = "//strong[text()='Hak Akses']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static bookkeepingSelectAll: string = "//strong[text()='Pembukuan']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static bookkeepingViewAll: string = "//strong[text()='Pembukuan']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static bookkeepingInsertAll: string = "//strong[text()='Pembukuan']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static bookkeepingUpdateAll: string = "//strong[text()='Pembukuan']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static bookkeepingDeleteAll: string = "//strong[text()='Pembukuan']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static attendanceSelectAll: string = "//strong[text()='Absensi']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static attendanceViewAll: string = "//strong[text()='Absensi']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static attendanceInsertAll: string = "//strong[text()='Absensi']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static attendanceUpdateAll: string = "//strong[text()='Absensi']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static attendanceDeleteAll: string = "//strong[text()='Absensi']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    static subscriptionInformationSelectAll: string = "//strong[text()='Informasi Langganan']/following-sibling::label[@formcontrolname='checkAllModule']//input";
    static subscriptionInformationViewAll: string = "//strong[text()='Informasi Langganan']/parent::div/following-sibling::div//label[@formcontrolname='viewAccess']//input";
    static subscriptionInformationInsertAll: string = "//strong[text()='Informasi Langganan']/parent::div/following-sibling::div//label[@formcontrolname='insertAccess']//input";
    static subscriptionInformationUpdateAll: string = "//strong[text()='Informasi Langganan']/parent::div/following-sibling::div//label[@formcontrolname='updateAccess']//input";
    static subscriptionInformationDeleteAll: string = "//strong[text()='Informasi Langganan']/parent::div/following-sibling::div//label[@formcontrolname='deleteAccess']//input";

    // Sub Module
    static dashboardView: string = "//div[text()=' Dashboard ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static dashboardInsert: string = "//div[text()=' Dashboard ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static dashboardUpdate: string = "//div[text()=' Dashboard ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static dashboardDelete: string = "//div[text()=' Dashboard ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuStockView: string = "//div[text()=' Stok Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuStockInsert: string = "//div[text()=' Stok Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuStockUpdate: string = "//div[text()=' Stok Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuStockDelete: string = "//div[text()=' Stok Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static bookkeepingView: string = "//div[text()=' Pembukuan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static bookkeepingInsert: string = "//div[text()=' Pembukuan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static bookkeepingUpdate: string = "//div[text()=' Pembukuan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static bookkeepingDelete: string = "//div[text()=' Pembukuan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static onlinePaymentView: string = "//div[text()=' Pembayaran Online ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static onlinePaymentInsert: string = "//div[text()=' Pembayaran Online ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static onlinePaymentUpdate: string = "//div[text()=' Pembayaran Online ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static onlinePaymentDelete: string = "//div[text()=' Pembayaran Online ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static settingView: string = "//div[text()=' Pengaturan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static settingInsert: string = "//div[text()=' Pengaturan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static settingUpdate: string = "//div[text()=' Pengaturan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static settingDelete: string = "//div[text()=' Pengaturan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static marketingBannerView: string = "//div[text()=' Banner Marketing ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static marketingBannerInsert: string = "//div[text()=' Banner Marketing ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static marketingBannerUpdate: string = "//div[text()=' Banner Marketing ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static marketingBannerDelete: string = "//div[text()=' Banner Marketing ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static platformIntegrationView: string = "//div[text()=' Integrasi Platform ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static platformIntegrationInsert: string = "//div[text()=' Integrasi Platform ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static platformIntegrationUpdate: string = "//div[text()=' Integrasi Platform ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static platformIntegrationDelete: string = "//div[text()=' Integrasi Platform ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static manageMenuOnlineView: string = "//div[text()=' Kelola Menu Online ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static manageMenuOnlineInsert: string = "//div[text()=' Kelola Menu Online ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static manageMenuOnlineUpdate: string = "//div[text()=' Kelola Menu Online ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static manageMenuOnlineDelete: string = "//div[text()=' Kelola Menu Online ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static salesSummaryView: string = "//div[text()=' Rangkuman Penjualan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static salesSummaryInsert: string = "//div[text()=' Rangkuman Penjualan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static salesSummaryUpdate: string = "//div[text()=' Rangkuman Penjualan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static salesSummaryDelete: string = "//div[text()=' Rangkuman Penjualan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static salesDetailView: string = "//div[text()=' Detail Penjualan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static salesDetailInsert: string = "//div[text()=' Detail Penjualan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static salesDetailUpdate: string = "//div[text()=' Detail Penjualan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static salesDetailDelete: string = "//div[text()=' Detail Penjualan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static paymentView: string = "//div[text()=' Pembayaran ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static paymentInsert: string = "//div[text()=' Pembayaran ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static paymentUpdate: string = "//div[text()=' Pembayaran ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static paymentDelete: string = "//div[text()=' Pembayaran ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static promotionReportView: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='viewAccess']//input)[1]";
    static promotionReportInsert: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='insertAccess']//input)[1]";
    static promotionReportUpdate: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='updateAccess']//input)[1]";
    static promotionReportDelete: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='deleteAccess']//input)[1]";

    static cancelAndVoidView: string = "//div[text()=' Batal dan Void ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static cancelAndVoidInsert: string = "//div[text()=' Batal dan Void ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static cancelAndVoidUpdate: string = "//div[text()=' Batal dan Void ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static cancelAndVoidDelete: string = "//div[text()=' Batal dan Void ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuSalesView: string = "//div[text()=' Penjualan Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuSalesInsert: string = "//div[text()=' Penjualan Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuSalesUpdate: string = "//div[text()=' Penjualan Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuSalesDelete: string = "//div[text()=' Penjualan Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static profitAndLossView: string = "//div[text()=' Laba Rugi ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static profitAndLossInsert: string = "//div[text()=' Laba Rugi ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static profitAndLossUpdate: string = "//div[text()=' Laba Rugi ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static profitAndLossDelete: string = "//div[text()=' Laba Rugi ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static remainingFundView: string = "//div[text()=' Sisa Dana ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static remainingFundInsert: string = "//div[text()=' Sisa Dana ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static remainingFundUpdate: string = "//div[text()=' Sisa Dana ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static remainingFundDelete: string = "//div[text()=' Sisa Dana ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static historyView: string = "//div[text()=' Riwayat ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static historyInsert: string = "//div[text()=' Riwayat ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static historyUpdate: string = "//div[text()=' Riwayat ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static historyDelete: string = "//div[text()=' Riwayat ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuView: string = "//div[text()=' Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuInsert: string = "//div[text()=' Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuUpdate: string = "//div[text()=' Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuDelete: string = "//div[text()=' Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuRecipesView: string = "//div[text()=' Resep Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuRecipesInsert: string = "//div[text()=' Resep Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuRecipesUpdate: string = "//div[text()=' Resep Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuRecipesDelete: string = "//div[text()=' Resep Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static categoryView: string = "//div[text()=' Kategori ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static categoryInsert: string = "//div[text()=' Kategori ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static categoryUpdate: string = "//div[text()=' Kategori ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static categoryDelete: string = "//div[text()=' Kategori ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuBookView: string = "//div[text()=' Buku Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuBookInsert: string = "//div[text()=' Buku Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuBookUpdate: string = "//div[text()=' Buku Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuBookDelete: string = "//div[text()=' Buku Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static salesModeView: string = "//div[text()=' Mode Penjualan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static salesModeInsert: string = "//div[text()=' Mode Penjualan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static salesModeUpdate: string = "//div[text()=' Mode Penjualan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static salesModeDelete: string = "//div[text()=' Mode Penjualan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static reasonCancelView: string = "//div[text()=' Alasan Pembatalan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static reasonCancelInsert: string = "//div[text()=' Alasan Pembatalan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static reasonCancelUpdate: string = "//div[text()=' Alasan Pembatalan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static reasonCancelDelete: string = "//div[text()=' Alasan Pembatalan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuNotesView: string = "//div[text()=' Catatan Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuNotesInsert: string = "//div[text()=' Catatan Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuNotesUpdate: string = "//div[text()=' Catatan Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuNotesDelete: string = "//div[text()=' Catatan Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static specialPriceView: string = "//div[text()=' Harga Spesial ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static specialPriceInsert: string = "//div[text()=' Harga Spesial ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static specialPriceUpdate: string = "//div[text()=' Harga Spesial ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static specialPriceDelete: string = "//div[text()=' Harga Spesial ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static rawMaterialView: string = "//div[text()=' Bahan Baku ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static rawMaterialInsert: string = "//div[text()=' Bahan Baku ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static rawMaterialUpdate: string = "//div[text()=' Bahan Baku ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static rawMaterialDelete: string = "//div[text()=' Bahan Baku ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static rawMaterialTransactionView: string = "//div[text()=' Transaksi Bahan Baku ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static rawMaterialTransactionInsert: string = "//div[text()=' Transaksi Bahan Baku ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static rawMaterialTransactionUpdate: string = "//div[text()=' Transaksi Bahan Baku ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static rawMaterialTransactionDelete: string = "//div[text()=' Transaksi Bahan Baku ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static rawMaterialStockView: string = "//div[text()=' Stok Bahan Baku ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static rawMaterialStockInsert: string = "//div[text()=' Stok Bahan Baku ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static rawMaterialStockUpdate: string = "//div[text()=' Stok Bahan Baku ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static rawMaterialStockDelete: string = "//div[text()=' Stok Bahan Baku ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static rawMaterialReportView: string = "//div[text()=' Laporan Bahan Baku ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static rawMaterialReportInsert: string = "//div[text()=' Laporan Bahan Baku ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static rawMaterialReportUpdate: string = "//div[text()=' Laporan Bahan Baku ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static rawMaterialReportDelete: string = "//div[text()=' Laporan Bahan Baku ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static addOnInventoryView: string = "//div[text()=' Inventory Add On ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static addOnInventoryInsert: string = "//div[text()=' Inventory Add On ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static addOnInventoryUpdate: string = "//div[text()=' Inventory Add On ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static addOnInventoryDelete: string = "//div[text()=' Inventory Add On ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static promotionView: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='viewAccess']//input)[2]";
    static promotionInsert: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='insertAccess']//input)[2]";
    static promotionUpdate: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='updateAccess']//input)[2]";
    static promotionDelete: string = "(//div[text()=' Promosi ']/following-sibling::div/div[@formgroupname='deleteAccess']//input)[2]";

    static printerView: string = "//div[text()=' Printer ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static printerInsert: string = "//div[text()=' Printer ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static printerUpdate: string = "//div[text()=' Printer ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static printerDelete: string = "//div[text()=' Printer ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static menuManagementView: string = "//div[text()=' Manajemen Menu ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static menuManagementInsert: string = "//div[text()=' Manajemen Menu ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static menuManagementUpdate: string = "//div[text()=' Manajemen Menu ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static menuManagementDelete: string = "//div[text()=' Manajemen Menu ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static businessView: string = "//div[text()=' Usaha ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static businessInsert: string = "//div[text()=' Usaha ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static businessUpdate: string = "//div[text()=' Usaha ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static businessDelete: string = "//div[text()=' Usaha ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static brandView: string = "//div[text()=' Brand ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static brandInsert: string = "//div[text()=' Brand ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static brandUpdate: string = "//div[text()=' Brand ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static brandDelete: string = "//div[text()=' Brand ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static branchView: string = "//div[text()=' Cabang ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static branchInsert: string = "//div[text()=' Cabang ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static branchUpdate: string = "//div[text()=' Cabang ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static branchDelete: string = "//div[text()=' Cabang ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static tableSettingView: string = "//div[text()=' Pengaturan Meja ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static tableSettingInsert: string = "//div[text()=' Pengaturan Meja ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static tableSettingUpdate: string = "//div[text()=' Pengaturan Meja ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static tableSettingDelete: string = "//div[text()=' Pengaturan Meja ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static paymentMethodView: string = "//div[text()=' Metode Pembayaran ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static paymentMethodInsert: string = "//div[text()=' Metode Pembayaran ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static paymentMethodUpdate: string = "//div[text()=' Metode Pembayaran ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static paymentMethodDelete: string = "//div[text()=' Metode Pembayaran ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static generateOTPView: string = "//div[text()=' Generate OTP ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static generateOTPInsert: string = "//div[text()=' Generate OTP ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static generateOTPUpdate: string = "//div[text()=' Generate OTP ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static generateOTPDelete: string = "//div[text()=' Generate OTP ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static emailNotificationView: string = "//div[text()=' Email Notifikasi ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static emailNotificationInsert: string = "//div[text()=' Email Notifikasi ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static emailNotificationUpdate: string = "//div[text()=' Email Notifikasi ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static emailNotificationDelete: string = "//div[text()=' Email Notifikasi ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static userView: string = "//div[text()=' User ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static userInsert: string = "//div[text()=' User ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static userUpdate: string = "//div[text()=' User ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static userDelete: string = "//div[text()=' User ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static userAccessBackendView: string = "//div[text()=' Hak Akses Backend ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static userAccessBackendInsert: string = "//div[text()=' Hak Akses Backend ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static userAccessBackendUpdate: string = "//div[text()=' Hak Akses Backend ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static userAccessBackendDelete: string = "//div[text()=' Hak Akses Backend ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static userAccessPOSView: string = "//div[text()=' Hak Akses POS ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static userAccessPOSInsert: string = "//div[text()=' Hak Akses POS ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static userAccessPOSUpdate: string = "//div[text()=' Hak Akses POS ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static userAccessPOSDelete: string = "//div[text()=' Hak Akses POS ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static bookkeepingCategoryView: string = "//div[text()=' Kategori Pembukuan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static bookkeepingCategoryInsert: string = "//div[text()=' Kategori Pembukuan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static bookkeepingCategoryUpdate: string = "//div[text()=' Kategori Pembukuan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static bookkeepingCategoryDelete: string = "//div[text()=' Kategori Pembukuan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static bookkeepingInputView: string = "//div[text()=' Input Pembukuan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static bookkeepingInputInsert: string = "//div[text()=' Input Pembukuan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static bookkeepingInputUpdate: string = "//div[text()=' Input Pembukuan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static bookkeepingInputDelete: string = "//div[text()=' Input Pembukuan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static bookkeepingReportView: string = "//div[text()=' Laporan Pembukuan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static bookkeepingReportInsert: string = "//div[text()=' Laporan Pembukuan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static bookkeepingReportUpdate: string = "//div[text()=' Laporan Pembukuan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static bookkeepingReportDelete: string = "//div[text()=' Laporan Pembukuan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static employeeDataView: string = "//div[text()=' Data Karyawan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static employeeDataInsert: string = "//div[text()=' Data Karyawan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static employeeDataUpdate: string = "//div[text()=' Data Karyawan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static employeeDataDelete: string = "//div[text()=' Data Karyawan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static attendanceListView: string = "//div[text()=' Daftar Kehadiran ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static attendanceListInsert: string = "//div[text()=' Daftar Kehadiran ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static attendanceListUpdate: string = "//div[text()=' Daftar Kehadiran ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static attendanceListDelete: string = "//div[text()=' Daftar Kehadiran ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";

    static subscriptionStatusView: string = "//div[text()=' Status Langganan ']/following-sibling::div/div[@formgroupname='viewAccess']//input";
    static subscriptionStatusInsert: string = "//div[text()=' Status Langganan ']/following-sibling::div/div[@formgroupname='insertAccess']//input";
    static subscriptionStatusUpdate: string = "//div[text()=' Status Langganan ']/following-sibling::div/div[@formgroupname='updateAccess']//input";
    static subscriptionStatusDelete: string = "//div[text()=' Status Langganan ']/following-sibling::div/div[@formgroupname='deleteAccess']//input";


}