import BaseLocator from "../../../base/base-locator";

export default class StartDayLocator extends BaseLocator {


    static startingCash: string = "//input[@placeholder='e.g. 200.000']";
    static getLocatorStartDay = (key: string): string => `//span[normalize-space()='${key}']`;
    //-Start Shift
    //-Yes
    //-No
    //-Ok
    static escapeKeyboard = "//h5[normalize-space()='Start Day']";
    static notificationSuccess = "//h4[normalize-space()='Synchronization process has completed']";


}
