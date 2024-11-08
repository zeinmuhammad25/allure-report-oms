import BaseLocator from "../../../../base/base-locator";

export default class SideNavBarLocator extends BaseLocator {

    //hideSideNav
    static getLocatorHideNavBar = (key: string): string => `//a[@class='d-flex align-items-center' and @href='/fnb-pos-v2/en${key}']`;
    static hideNavBarOthers: string = "//a[@aria-haspopup='true']";
    //showSideNav
    static getLocatorShowNavBar = (key: string): string => `//a[normalize-space()='${key}']`;
    //menuOthers
    static menuSectionOther = (key: string): string => `//span[normalize-space()='${key}']`;
}