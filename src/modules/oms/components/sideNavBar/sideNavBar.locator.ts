import BaseLocator from "../../../../base/base-locator";

export default class SideNavBarLocator extends BaseLocator {

    //hideSideNav
    static getSideNavBarButtons = (key: string): string => `//a[@href='/fnb-pos-v2/en${key}']`;
    static sideNavBarOthersButton: string = "//a[@aria-haspopup='true']";
    //showSideNav
    static getLocatorShowNavBar = (key: string): string => `//a[normalize-space()='${key}']`;
    //menuOthers
    static menuSectionOther = (key: string): string => `//span[normalize-space()='${key}']`;
    static toolsMenu = (menuTools: string): string => `//div[contains(text(),'${menuTools}')]`;
    static dropDownStation: string = "//tr[td//label[text()='Default Station']]//mat-select";
    static textButton = (buttonName: string): string => `//span[normalize-space()='${buttonName}']`;
    static stationName = (stationName: string): string => `//mat-option[normalize-space()='${stationName}']`;

    static dropDownSalesMode: string = "//tr[td//label[text()='Default Quick Service Sales Mode']]//mat-select";
    static salesMode = (salesMode: string): string => `//mat-option[normalize-space()='${salesMode}']`;

}