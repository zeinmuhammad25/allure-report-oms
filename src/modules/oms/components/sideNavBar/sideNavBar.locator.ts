import BaseLocator from "../../../../base/base-locator";

export default class SideNavBarLocator extends BaseLocator {

    //hideSideNav
    static GetLocatorHideNav = (key: string): string => `//a[@class='d-flex align-items-center' and @href='/fnb-pos-v2/en${key}']`;
    static hideNavOthers: string = "//a[@aria-haspopup='true']";
    //showSideNav
    static GetLocatorShowNav = (key: string): string => `//a[normalize-space()='${key}']`;
    //menuOthers
    static menuOther = (key: string): string => `//span[normalize-space()='${key}']`;
}