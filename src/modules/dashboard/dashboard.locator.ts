import BaseLocator from "../../base/base-locator";

export default class DashboardLocator extends BaseLocator {
    // Locator for the "Later" button on the dashboard
    static buttonLater: string = "button[class='button-later']";
    static buttonLater2: string = "//button[contains(@class, 'esb-btn-md-outline-secondary')]";
    static dropdownProfile: string = "//div[@nztrigger='click']"; //request dev for better ID
    static buttonProfile: string = "//li[@tabindex='0']"; //request dev for better ID
    static buttonLogout: string = "//li[.//img[@src='assets/img/icons/ic-logout.svg']]"; //request dev for better ID
    static buttonsubstatus: string = "(//li[@id='mnu-langganan-sekarang'])[1]"; //request dev for better ID for Status Langganan
    static buttongrouplist: string = "(//li[@class='d-flex align-items-center dropdown-account-item ant-dropdown-menu-item'])[2]"; //request dev for better ID for Daftar Grup
    static buttonpromocode: string = "(//li[@class='d-flex align-items-center dropdown-account-item ant-dropdown-menu-item'])[4]";//request dev for better ID for Kode Promo
    static findcompanyfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[1]";
    static findbrandfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[2]";
    static findbranchfield: string = "(//input[@class='ant-select-selection-search-input ng-untouched ng-pristine ng-valid'])[3]";
    static findbutton: string = "(//button[normalize-space()='Cari'])[1]";
    static daybuttonchecked: string = "(//span[@class='ant-radio-button ant-radio-button-checked'])[1]";
    static monthbuttonunchecked: string = "(//label[@class='ant-radio-button-wrapper'])[1]";



}