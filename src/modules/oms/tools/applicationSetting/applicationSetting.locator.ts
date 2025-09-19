import BaseLocator from "../../../../base/base-locator";

export default class ApplicationSettingLocator extends BaseLocator {

    static escapeKeyBoard: string = "//h5[normalize-space()='Tools']";
    static closeAfterSet: string = "//div[@class='cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing']";
    static buttonApplicationSetting: string = "//div[contains(text(),'Application Setting')]";
    static defaultStationDropdown: string = `#mat-select-0`;
    static selectDefaultStation = (SelectStation: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectStation}']`;
    static selectQrCodeScannerMode = (SelectQrOption: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectQrOption}']`;
    static inputTimeFirstWarning: string = "//input[@placeholder='e.g. 60']";
    static inputTimeSecondWaring: string = "//input[@placeholder='e.g. 90']";
    static showDineInMode: string = "(//div[@class='mat-select-arrow-wrapper'])[3]";
    static selectSalesModeForDineIn = (SelectDineInSalesMode: string): string => `//span[normalize-space()='${SelectDineInSalesMode}']`;
    static showQuickServiceMode: string = "(//div[@class='mat-select-arrow-wrapper'])[4]";
    static selectSalesModeForQuickService = (SelectQuickServiceSalesMode: string): string => `//span[normalize-space()='${SelectQuickServiceSalesMode}']`;
    static checkboxDirectServing: string = "(//div[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[1]";
    static showDefaultQsMode: string = "(//div[@class='mat-select-arrow-wrapper'])[5]";
    static selectSalesModeForDefaultQS = (SelectDineInSalesMode: string): string => `//span[normalize-space()='${SelectDineInSalesMode}']`;
    static toggleHidePendingNotes: string = "//span[@class='mat-slide-toggle-content']";
    static checkboxShowCustomerDisplay: string = "(//div[@class='mat-select-arrow-wrapper'])[6]";
    static selectedOffShowCustomerDisplay: string = "(//span[@class='mat-option-text'][normalize-space()='OFF'])[2]";
    static selectedShowCustomerDisplay = (display: string): string => `//span[normalize-space()='${display}']`;
    static CustomerDisplayLength: string = `//input[@class='form-control text-right ng-pristine ng-valid ng-touched']`;
    static CustomerDisplayport: string = `//input[@name='poleDisplayPort']`;
    static displayMonitorProceed: string = `//span[normalize-space()='Proceed']`;
    static displayMonitorCancel: string = `//span[normalize-space()='Close']`;
    static checkboxSelfOrderServer: string = "(//div[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[2]";
    static selectESBOrderPrinterStation = (SelectEsoStation: string): string => `//span[normalize-space()='${SelectEsoStation}']`;
    static checkboxShowOnScreenKeyboard: string = "(//div[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[3]";
    static ShowOnIntegratedScale: string = "(//div[@class='mat-select-arrow-wrapper'])[8]";
    static selectIntegratedScale = (SelectIntegratedScale: string): string => `//span[@class='mat-option-text'][normalize-space()='${SelectIntegratedScale}']`;
    static buttonSaveSetting: string = "//span[normalize-space()='Save']";
    static applicationSettingDialogOk: string = "//app-confirm-dialog//button";
    static showInfoOnTable: string = "(//div[@class='mat-checkbox-inner-container mat-checkbox-inner-container-no-side-margin'])[4]";
}