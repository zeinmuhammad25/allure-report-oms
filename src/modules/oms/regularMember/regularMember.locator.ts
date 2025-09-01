import BaseLocator from "../../../base/base-locator";


export default class RegularMemberLocator extends BaseLocator {

    btnAddRegularMember: string = "//app-member-list//span[contains(normalize-space(), 'Add Regular Member')]";
    escapeKeyboardMember: string = "//div//h5[normalize-space()='Regular Member List']";
    fieldSearchMember: string = "//app-member-list//input[@placeholder='Search Regular Member']";
    btnClearSearchMember: string = "//app-member-list//span//i[contains(@class, 'glyphicon glyphicon-repeat')]";
    headerNameAndShorting = (headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): string =>
        `//app-member-list//button[contains(normalize-space(), '${headerName}')]`;
    btnDataAndEdit = (value: string): string => `//app-member-list//td[contains(normalize-space(), '${value}')]`;
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-member-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;

    //form
    regularMemberNameField: string = "//app-member-form//div//input[@formcontrolname='memberName']";
    ganderField: string = "//app-member-form//mat-select//div[@class='mat-select-value']";
    selectGender = (gender: "Male" | "Female"): string => `//div//mat-option//span[normalize-space()='${gender}']`;
    removeBirthDate: string = "//app-member-form//i[@class='glyphicon glyphicon-remove']";
    selectBirthDate: string = "//app-member-form//button[contains(@aria-label,'Open calendar')]//*[name()='svg']";
    phoneMemberField: string = "//app-member-form//div//input[@placeholder='e.g. +62-2199999 / +62-81299999999']";
    emailMemberField: string = "//app-member-form//div//input[@placeholder='e.g. admin@yahoo.com']";
    addressMemberField: string = "//app-member-form//textarea[@placeholder='e.g. Ruko Paramount Center II Blok B/8, Jl. CBD Gading Serpong']";
    cancelMemberForm: string = "//app-member-form//span[normalize-space()='Cancel']";
    saveMemberForm: string = "//app-member-form//span[normalize-space()='Save Reguler Member']";
    updateMemberForm: string = "//app-member-form//span[normalize-space()='Update Reguler Member']";

    //datepicker
    btnMonthAndYear: string = "//mat-datepicker-content//mat-calendar//button[@aria-label='Choose month and year']";
    static paginationDatePicker = (label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"):
        string => `//mat-calendar-header//button[@aria-label='${label}']`;
    selectYear = (year: string): string => `//mat-multi-year-view//td//div[normalize-space()='${year}']`;
    selectMonth = (month: string): string => `//mat-year-view//td//div[normalize-space()='${month.toUpperCase().slice(0, 3)}']`;
    selectDate = (date: string): string => `//mat-month-view//td//div[normalize-space()='${date}']`;

}