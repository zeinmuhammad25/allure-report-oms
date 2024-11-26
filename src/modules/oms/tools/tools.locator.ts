import BaseLocator from "../../../base/base-locator";

export default class ToolsLocator extends BaseLocator {
    static tabButton = (tabName: string): string => `(//mat-tab-header//div[normalize-space()='${tabName}'])[1]`;
    static nextButton = "(//mat-tab-header/div)[3]";
    static previousButton = "(//mat-tab-header/div)[1]";
}