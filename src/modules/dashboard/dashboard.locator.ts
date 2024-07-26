import BaseLocator from "../../base/base-locator";

export default class DashboardLocator extends BaseLocator {
    // Locator for the "Later" button on the dashboard
    static buttonLater: string = "button[class='button-later']";
    static buttonLater2: string = "//button[contains(@class, 'esb-btn-md-outline-secondary')]";
    static dropdownProfile: string = "//div[@nztrigger='click']"; //request dev for better ID
    static buttonProfile: string = "//li[@tabindex='0']"; //request dev for better ID
    static buttonLogout: string = "//li[.//img[@src='assets/img/icons/ic-logout.svg']]"; //request dev for better ID
}