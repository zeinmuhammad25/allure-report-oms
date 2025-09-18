import BaseLocator from "../../../base/base-locator";

export default class ToolsLocator extends BaseLocator {
    static tabButton = (tabName: string): string => `(//mat-tab-header//div[normalize-space()='${tabName}'])[1]`;
    static nextButton = "(//mat-tab-header/div)[3]";
    static previousButton = "(//mat-tab-header/div)[1]";

    //report
    static btnDateReport: string = "//mat-icon[normalize-space()='date_range']";
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
    static printReport: string = "//button[.//span[contains(normalize-space(.),'Print')]]";
    static closerPopUp: string = "//span[normalize-space()='Ok']";

    //softwareUpdate
    static checkForUpdate: string = "//span[normalize-space()='Check for Update']";
    static closePopUpSoftwareUpdate: string = "//app-confirm-dialog//span[normalize-space()='OK']";

    //trialMode
    static activateTrialMode: string = "//span[normalize-space()='Activate Trial Mode']";
    static deActivateTrialMode: string = "//span[normalize-space()='Deactivate Trial Mode']";
    static activateBtn: string = "//app-custom-confirm-dialog//span[normalize-space()='Activate']";
    static deActivateBtn: string = "//app-custom-confirm-dialog//span[normalize-space()='Deactivate']";
    static cancelBtn: string = "//app-custom-confirm-dialog//span[normalize-space()='Cancel']";
}