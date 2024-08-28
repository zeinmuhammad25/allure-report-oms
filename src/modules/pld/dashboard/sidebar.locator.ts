import BaseLocator from "../../../base/base-locator";

export default class SidebarLocator extends BaseLocator {
    // Locator to help access the sidebar
    static hamburgerMini: string = "//div[@class='app-burger-mini']";
    static sidebarToggle: string = "//span[@class='sidebar-toggle']";
    static sidebarOpened: string = "//img[contains(@src, 'left')]";
    static sidebarClosed: string = "//img[contains(@src, 'right')]";
    static catalogue: string = "(//div[contains(text(),'Katalog')])[1]";
    static sidebarMenu: string = "//a[normalize-space()='Menu']";

    //accountSetting
    static sidebarAccountSettingHead: string = "//div[contains(text(),'Pengaturan Cabang')]";
    static sidebarAccountSettingHeadClosed: string = "//div[contains(text(),'Pengaturan Cabang')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarAccountSettingHeadOpen: string = "//div[contains(text(),'Pengaturan Cabang')]/ancestor::li[@ng-reflect-nz-open='true']";
    static sidebarAccountSettingBranch: string = "//a[@ng-reflect-router-link='account-setting/branch']";
    static sidebarAccountSettingBrand: string = "//a[@ng-reflect-router-link='account-setting/brand']";
    static sidebarAccountSettingCompany: string = "//a[@ng-reflect-router-link='account-setting/company']";
    static sidebarAccountSettingTableSetting: string = "//a[@ng-reflect-router-link='account-setting/table']";
    static sidebarAccountSettingPayment: string = "//a[@ng-reflect-router-link='account-setting/payment-method']";
    static sidebarAccountSettingGenerateOTP: string = "//a[@ng-reflect-router-link='account-setting/otp']";
    static sidebarAccountSettingEmailNotification: string = "//a[@ng-reflect-router-link='account-setting/email-recipien']";

    //printerSetting
    static printerSettingHead: string = "//div[contains(text(),'Pengaturan Printer')]";
    static printerSettingHeadOpen: string = "//div[contains(text(),'Pengaturan Printer')]/ancestor::li[@ng-reflect-nz-open='true']";
    static printerSettingHeadClosed: string = "//div[contains(text(),'Pengaturan Printer')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarPrinterSettingChild: string = "//a[@ng-reflect-router-link='printer-setting/station']";
    static sidebarMenuManagement: string = "//a[@ng-reflect-router-link='printer-setting/branch-menu']";

    //attendance
    static sidebarAttendanceHead: string = "//div[contains(text(),'Absensi')]";
    static sidebarAttendanceHeadClosed: string = "//div[contains(text(),'Absensi')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarAttendanceHeadOpen: string = "//div[contains(text(),'Absensi')]/ancestor::li[@ng-reflect-nz-open='true']"
    static sidebarEmployeeDataChild: string = "//a[@ng-reflect-router-link='attendance/employee']";
    static sidebarAttendanceDataChild: string = "//a[@ng-reflect-router-link='attendance/report']";

    //report
    static sidebarReportHead: string = "//div[contains(text(),'Laporan')]";
    static sidebarCancelAndVoid: string = "//a[@ng-reflect-router-link='report/cancel-menu']";
    static sidebarPaymentReport: string = "//a[@ng-reflect-router-link='report/sales-payment']";
    static sidebarSalesDetail: string = "//a[@ng-reflect-router-link='report/sales-detail']";
    static sidebarSalesSummary: string = "//a[@ng-reflect-router-link='report/sales-summary']";
    static sidebarReportPromotion: string = "//a[@ng-reflect-router-link='report/promotion']";
    static sidebarProfitAndLoss: string = "//a[@ng-reflect-router-link='report/profit-loss']";

    //catalogue
    static sidebarCatalogueHead: string = "//div[contains(text(),'Pengaturan Menu')]";
    static sidebarCatalogueHeadOpen: string =  "//div[contains(text(),'Pengaturan Menu')]/ancestor::li[@ng-reflect-nz-open='true']";
    static sidebarCatalogueHeadClosed: string =  "//div[contains(text(),'Pengaturan Menu')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarChildMenu: string = "//a[@ng-reflect-router-link='catalog/menu']";
    static sidebarChildCategory: string = "//a[@ng-reflect-router-link='catalog/menu-category']";
    static sidebarMenuBook: string = "//a[@ng-reflect-router-link='catalog/menu-template']";
    static sidebarSalesMode: string = "//a[@ng-reflect-router-link='catalog/sales-mode']";
    static sidebarCancelReason: string = "//a[@ng-reflect-router-link='catalog/cancel-reason']";
    static sidebarMenuNote: string = "//a[@ng-reflect-router-link='catalog/notes-category']";
    static sidebarSpecialPrice: string = "//a[@ng-reflect-router-link='catalog/special-price']";

    //inventory
    static sidebarInventoryHead: string = "//div[contains(text(),'Inventori')]";
    static sidebarInventoryHeadClosed: string = "//div[contains(text(),'Inventori')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarInventoryHeadOpen: string = "//div[contains(text(),'Inventori')]/ancestor::li[@ng-reflect-nz-open='true']";
    static sidebarRawMaterial: string = "//a[@ng-reflect-router-link='inventory/product']";
    static sidebarRawMaterialTransaction: string = "//a[@ng-reflect-router-link='inventory/transaction']";
    static sidebarRawMaterialStock: string = "//a[@ng-reflect-router-link='inventory/product-inquiry']";
    static sidebarRawMaterialReport: string = "//a[@ng-reflect-router-link='inventory/report']";

    //userAccessControl
    static sidebarUserAccessControlHead: string = "//div[contains(text(),'Hak Akses')]";
    static sidebarUser: string = "//a[@ng-reflect-router-link='role/user']";
    static sidebarUserAccessBackend: string = "//a[@ng-reflect-router-link='role/user-role']";
    static sidebarUserAccessPOS: string = "//a[@ng-reflect-router-link='role/pos-user-role']";

    //withdrawFunds
    static sidebarWithdrawFundsHead: string = "//div[contains(text(),'Penarikan Dana')]";
    static sidebarHistory: string = "//a[normalize-space()='Riwayat']";
    static sidebarRemainingFunds: string = "//a[normalize-space()='Sisa Dana']";

    //ESBOrder
    static sidebarESBOrderHead: string = "//div[contains(text(),'ESB Order')]";
    static sidebarESBOrderHeadClosed: string = "//div[contains(text(),'ESB Order')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarESBOrderHeadOpen: string = "//div[contains(text(),'ESB Order')]/ancestor::li[@ng-reflect-nz-open='true']";
    static sidebarESBOrderSetting: string = "//a[@ng-reflect-router-link='esb-order/setting']";
    static sidebarESBOrderBannerMarketing: string = "//a[@ng-reflect-router-link='esb-order/banner']";

    //promotion
    static sidebarPromotionHead: string = "//a[@ng-reflect-router-link='promotion']";

    //onlinePlatform
    static sidebarOnlinePlatform: string = "//div[contains(text(),'Pesanan Online')]";
    static sidebarPlatformIntegration: string = "//a[@ng-reflect-router-link='online-platform/integration']";
    static sidebarManageOnlineMenu: string = "//a[@ng-reflect-router-link='online-platform/menu-setting']";

    //bookkeeping
    static sidebarBookkeeping: string = "//div[contains(text(),'Pembukuan')]";
    static sidebarBookkeepingOpen: string =  "//div[contains(text(),'Pembukuan')]/ancestor::li[@ng-reflect-nz-open='true']";
    static sidebarBookkeepingClosed: string =  "//div[contains(text(),'Pembukuan')]/ancestor::li[@ng-reflect-nz-open='false']";
    static sidebarBookkeepingCategory: string = "//a[@ng-reflect-router-link='finance/charts-of-account']";
    static sidebarBookkeepingInput: string = "//a[@ng-reflect-router-link='finance/input-finance']";
    static sidebarBookkeepingReport: string = "//a[@ng-reflect-router-link='finance/profit-loss-report']";


}