import BaseLocator from "../../../../base/base-locator";

export default class TroubleshootLocator extends BaseLocator {
    static testPrintButton: string = "//mat-tab-body//button//span[normalize-space()='Test Print']";
    static testPrintDisabled: string = "//mat-tab-body//button//span[normalize-space()='Test Print']";
    static closePopUp: string = "//span[normalize-space()='Ok']";
    static selectAllStation: string = "(//span[@class='mat-checkbox-label'])[1]";
    static selectStation = (stationName: string): string =>
        `//span//div[contains(text(),'${stationName}')]`;
    static openDrawer: string = "//mat-tab-body//button//span[normalize-space()='Open Drawer']";
    static testPrintMenuAndBill: string = "//mat-tab-body//button[normalize-space()='Test Print Menu/Bill']";
    static dropDownFormTestPrint = (index: number): string =>
        `(//div[@class='mat-select-arrow'])[${index}]`;
    static selectValueDropDown = (value: string): string =>
        `//span[@class='mat-option-text'][normalize-space()='${value}']`;
    static selectStationInForm = (stationName: string): string =>
        `//app-printer-test-menu-bill//div[contains(text(),'${stationName}')]`;
    static btnFormTestPrintBill = (stationName: "Test Print Bill" | "Test Print Menu" | "Cancel"): string =>
        `//app-printer-test-menu-bill//div[contains(text(),'${stationName}')]`;

}