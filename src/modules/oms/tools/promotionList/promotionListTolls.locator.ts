import BaseLocator from "../../../../base/base-locator";

export default class PromotionListTollsLocator extends BaseLocator {
    static categoryPromotionList = (category: "ALL PROMOTIONS" | "TODAY'S PROMOTIONS"): string =>
        `//button[.//span[normalize-space()="${category}"]]`;
    static escapeKeyboard: string = "//h5[normalize-space()='Tools']";
    static headerPromotionList =
        (headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): string =>
            `//app-promotion-list//button[contains(normalize-space(), '${headerName}')]`;
    static searchPromotionList: string = "//input[@placeholder='Search by name, date, or discount amount']";
    static dataValidation = (value: string): string =>
        `//app-promotion-list//td[normalize-space()='${value}']`;
    static showDropDownStatus: string = "//div[@class='mat-select-arrow-wrapper']";
    static selectAllStatus: string = "//span[@class='mat-checkbox-label']";
    static selectStatus = (label: string): string =>
        `//mat-option//span[normalize-space()='${label}']`;
    static closeAfterSet: string = "//div[@class='cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing']";
    static clearFilter: string = "//i[@class='glyphicon glyphicon-repeat']";
    //datepicker
    static btnDate: string = "//app-promotion-list//mat-icon[normalize-space()='date_range']";
    static selectDateMonthAndYearCalendarNav = (side: "left" | "right", nav: "prev" | "next"): string =>
        `//ngx-daterangepicker-material//div[contains(@class,'calendar')][contains(@class,'${side}')]//th[contains(@class,'${nav}')]`;
// Kalender kiri
    static leftCalendarCell = (day: string | number): string => {
        const d = String(Number(day)).trim(); // "01" -> "1"
        return `//ngx-daterangepicker-material//div[contains(@class,'calendar')][contains(@class,'left')]//td[
    .//span[normalize-space(.)="${d}"]
    and not(contains(@class,'off'))
    and not(contains(@class,'disabled'))
  ]`;
    };
// Kalender kanan
    static rightCalendarCell = (day: string | number): string => {
        const d = String(Number(day)).trim();
        return `//ngx-daterangepicker-material//div[contains(@class,'calendar')][contains(@class,'right')]//td[
    .//span[normalize-space(.)="${d}"]
    and not(contains(@class,'off'))
    and not(contains(@class,'disabled'))
  ]`;
    };
    static btnApplyDate: string = "//ngx-daterangepicker-material//button[normalize-space()='Apply']";
    static paginationButton = (type: "previous" | "next"): string =>
        `//app-promotion-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
}