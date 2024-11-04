import BaseLocator from "../../../../base/base-locator";

export default class SynchronizeDataLocator extends BaseLocator {

    static getLocatorSynchronize = (key: string): string => `//div[normalize-space()='${key}`;
    static buttonUpdateSetting: string = "//span[normalize-space()='Update Setting']";
    static buttonSynchronize: string = "//span[normalize-space()='Synchronize']";
    static buttonSelectAll: string = "//label[@for='mat-checkbox-6-input']//span[@class='mat-checkbox-label']";


}