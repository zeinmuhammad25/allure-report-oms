import BaseLocator from "../../base/base-locator";

export default class SidebarLocator extends BaseLocator {
    // Locator to help access the sidebar
    static hamburgermini: string = "//div[@class='app-burger-mini']";
    static sidebartoggle: string = "//span[@class='sidebar-toggle']";
    static sidebarisopen: string = "//img[contains(@src, 'left')]";
    static sidebarisclosed: string = "//img[contains(@src, 'right')]";
    static katalog: string = "(//div[contains(text(),'Katalog')])[1]";
    static menusidebar: string = "//a[normalize-space()='Menu']";
    static accsettinghead: string = "(//div[@class='ant-menu-submenu-title'])[9]"; // Request dev for a better id
    static accsettingbranch: string = "(//a[normalize-space()='Cabang'])[1]";

}