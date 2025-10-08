import BaseLocator from "../../../../base/base-locator";

export default class BranchEventListLocator extends BaseLocator {

    static escapeKeyboard: string = "//h5[normalize-space()='Tools']";
    static btnDateBranchEvent: string = "//button[@aria-label='Open calendar']";
    //datepicker
    static btnMonthAndYear = (label: "Choose month and year" | "Choose date"):
        string => `//mat-datepicker-content//mat-calendar//button[@aria-label='${label}']`;
    static paginationDatePicker = (label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"):
        string => `//mat-calendar-header//button[@aria-label='${label}']`;
    static selectYear = (year: string): string => `//mat-multi-year-view//td//div[normalize-space()='${year}']`;
    static selectMonth = (month: string): string => `//mat-year-view//td//div[normalize-space()='${month.toUpperCase().slice(0, 3)}']`;
    static selectDate = (date: string): string => `//mat-month-view//td//div[normalize-space()='${date}']`;

    static refNumberField: string = "//input[@placeholder='Search by Ref number']";
    static eventSubjectField: string = "//input[@placeholder='Search by Event Subject']";
    static clearFilter: string = "//i[@class='glyphicon glyphicon-repeat']";
    static headerNameAndShorting = (headerName: "Ref Number" | "Event Subject" | "Created By"): string =>
        `//app-branch-event-list//button[contains(normalize-space(), '${headerName}')]`;
    static btnViewDetail = (value: string, index: number): string => `(//app-branch-event-list//td[normalize-space()='${value}'])[${index}]`;
    static dataValidation = (value: string): string => `//app-branch-event-list//td[normalize-space()='${value}']`;
    static closeDetail: string = "//app-branch-event//span[normalize-space()='Close']";
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-branch-event-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
}