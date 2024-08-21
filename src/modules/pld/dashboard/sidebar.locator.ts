import BaseLocator from "../../../base/base-locator";

export default class SidebarLocator extends BaseLocator {
    // Locator to help access the sidebar
    static hamburgerMini: string = "//div[@class='app-burger-mini']";
    static sidebarToggle: string = "//span[@class='sidebar-toggle']";
    static sidebarOpened: string = "//img[contains(@src, 'left')]";
    static sidebarClosed: string = "//img[contains(@src, 'right')]";
    static catalogue: string = "(//div[contains(text(),'Katalog')])[1]";
    static sidebarMenu: string = "//a[normalize-space()='Menu']";
    static accountSettingHead: string = "//div[contains(text(),'Pengaturan Akun')]";
    static accountSettingBranch: string = "//a[@ng-reflect-router-link='account-setting/branch']";
    static attendanceHead: string = "(//div[contains(text(),'Absensi')])[1]";
    static employeeDataChild: string = "(//a[normalize-space()='Data Karyawan'])[1]";
    static attendanceDataChild: string = "(//a[normalize-space()='Daftar Kehadiran'])[1]";

}