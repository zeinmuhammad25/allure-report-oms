import BaseLocator from "../../../../base/base-locator";

export default class ApplicationSettingLocator extends BaseLocator {

    static buttonTool: string = "//a/i[@class='fa fa-wrench mr-3']";
    static buttonApplicationSetting: string = "//div[contains(text(),'Application Setting')]";
    static selectDefaultStation = (SelectStation: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectStation}']']`;
    static selectQrCodeScannerMode = (SelectQrOption: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectQrOption}']`;
    static inputTimeFirstWarning: string = "//input[@placeholder='e.g. 60']";
    static inputTimeSecondWaring: string = "//input[@placeholder='e.g. 90']";
    static selectSalesModeForDineIn = (SelectDineInSalesMode: string): string => `//span[normalize-space()='${SelectDineInSalesMode}']`;
    static selectSalesModeForQuickService = (SelectQuickServiceSalesMode: string): string => `//span[normalize-space()='${SelectQuickServiceSalesMode}']`;
    static checkboxDirectServing: string = "//label[@for='mat-checkbox-2-input']";
    static toggleHidePendingNotes: string = "//span[@class='mat-slide-toggle-content']";
    static checkboxShowCustomerDisplay: string = "//label[@for='mat-checkbox-3-input']";
    static checkboxSelfOrderServer: string = "//label[@for='mat-checkbox-6-input']";
    static selectESBOrderPrinterStation = (SelectEsoStation: string): string => `//span[normalize-space()='${SelectEsoStation}']`;
    static checkboxShowOnScreenKeyboard: string = "//label[@for='mat-checkbox-4-input']";
    static selectIntegratedScale = (SelectIntegratedScale: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectIntegratedScale}']`;
    static buttonSaveSetting: string = "//span[normalize-space()='Save']";

}