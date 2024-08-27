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
    static accountSettingHead: string = "//div[contains(text(),'Pengaturan Cabang')]";
    static accountSettingBranch: string = "//a[@ng-reflect-router-link='account-setting/branch']";
    static accountSettingBrand: string = "//a[@ng-reflect-router-link='account-setting/company']";
    static accountSettingCompany: string = "//a[@ng-reflect-router-link='account-setting/company']";
    static accountSettingTableSetting: string = "//a[@ng-reflect-router-link='account-setting/table']";
    static accountSettingPaymentMethod: string = "//a[@ng-reflect-router-link='account-setting/payment-method']";
    static accountSettingGenerateOTP: string = "//a[@ng-reflect-router-link='account-setting/otp']";
    static accountSettingEmailNotification: string = "//a[@ng-reflect-router-link='account-setting/email-recipien']";

    //printerSetting
    static printerSettingHead: string = "//div[contains(text(),'Pengaturan Printer')]";
    static printerSettingChild: string = "//a[@ng-reflect-router-link='printer-setting/station']";
    static menuManagementSidebar: string = "//a[@ng-reflect-router-link='printer-setting/branch-menu']";

    //attendance
    static attendanceHead: string = "(//div[contains(text(),'Absensi')])[1]";
    static employeeDataChild: string = "//a[@ng-reflect-router-link='attendance/employee']";
    static attendanceDataChild: string = "//a[@ng-reflect-router-link='attendance/report']";

    //report
    static reportSidebarHead: string = "//div[contains(text(),'Laporan')]";
    static cancelAndVoidSidebar: string = "//a[@ng-reflect-router-link='report/cancel-menu']";
    static paymentReportSidebar: string = "//a[@ng-reflect-router-link='report/sales-payment']";
    static salesDetailSidebar: string = "//a[@ng-reflect-router-link='report/sales-detail']";
    static salesSummarySidebar: string = "//a[@ng-reflect-router-link='report/sales-summary']";
    static reportPromotionSidebar: string = "//a[@ng-reflect-router-link='report/promotion']";
    static profitAndLossSidebar: string = "//a[@ng-reflect-router-link='report/profit-loss']";



}