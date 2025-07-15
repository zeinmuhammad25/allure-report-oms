import BaseLocator from "../../../base/base-locator";

export default class StartDayLocator extends BaseLocator {

    static startingCash: string = "//input[@placeholder='e.g. 200.000']";
    static getLocatorStartDay = (key: string): string => `//span[normalize-space()='${key}']`;
    static escapeKeyboard = "//mat-icon[normalize-space()='desktop_windows']";
    static notificationSuccess = "//h4[normalize-space()='Data sync finished']";

}
