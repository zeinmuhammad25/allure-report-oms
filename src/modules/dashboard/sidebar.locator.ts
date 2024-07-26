import BaseLocator from "../../base/base-locator";

export default class SidebarLocator extends BaseLocator {
    // Locator to help access the sidebar
    static hamburgermini: string = "//div[@class='app-burger-mini']";
    static sidebartoggle: string = "//span[@class='sidebar-toggle']";
    static sidebarisopen: string = "//img[contains(@src, 'left')]";
    static sidebarisclosed: string = "//img[contains(@src, 'right')]";

}