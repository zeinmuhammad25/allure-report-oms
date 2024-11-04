import BaseLocator from "../../../../base/base-locator";

export default class QuickServiceListLocator extends BaseLocator {

    static sectionQuickService: string = "//span[contains(text(),'QUICK SERVICE')]";
    static buttonAddQuickService: string = "//span[normalize-space()='Add Quick Service']";
    static getLocatorPagination = (key: string): string => `//button[@aria-label='${key}']`;

}