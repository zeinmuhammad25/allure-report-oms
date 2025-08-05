import BaseLocator from "../../../../base/base-locator";

export default class QuickServiceListLocator extends BaseLocator {

    static sectionQuickService: string = "//span[contains(text(),'QUICK SERVICE')]";
    static buttonAddQuickService: string = "//span[normalize-space()='Add Quick Service']";
    static getLocatorPagination = (paginationControlKey: string): string => `//button[@aria-label='${paginationControlKey}']`;
    static quickServiceSalesNum = (salesNum: string | "first" | "last"): string =>
        salesNum === "first" ? "//app-take-away-list//tbody//tr[1]" :
            salesNum === "last" ? "//app-take-away-list//tbody//tr[last()]" :
                `//app-take-away-list//tbody//tr[td[normalize-space()='${salesNum}']]`;

}