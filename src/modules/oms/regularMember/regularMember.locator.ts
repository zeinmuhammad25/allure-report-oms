import BaseLocator from "../../../base/base-locator";


export default class RegularMemberLocator extends BaseLocator {

    static btnAddRegularMember: string = "//app-member-list//span[contains(normalize-space(), 'Add Regular Member')]";
    static escapeKeyboardMember: string = "//div//h5[normalize-space()='Regular Member List']";
    static fieldSearchMember: string = "//app-member-list//input[@placeholder='Search Regular Member']";
    static btnClearSearchMember: string = "//app-member-list//span//i[contains(@class, 'glyphicon glyphicon-repeat')]";
    static headerNameAndShorting = (headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): string =>
        `//app-member-list//button[contains(normalize-space(), '${headerName}')]`;
    static btnDataAndEdit = (value: string): string => `//app-member-list//td[contains(normalize-space(), '${value}')]`;
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-member-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;

    //form
    static regularMemberNameField: string = "//app-member-form//div//input[@formcontrolname='memberName']";
    static genderField: string = "//app-member-form//mat-select//div[@class='mat-select-value']";
    static selectGender = (gender: "Male" | "Female"): string => `//div//mat-option//span[normalize-space()='${gender}']`;
    static removeBirthDate: string = "//app-member-form//i[@class='glyphicon glyphicon-remove']";
    static selectBirthDate: string = "//app-member-form//button[contains(@aria-label,'Open calendar')]//*[name()='svg']";
    static phoneMemberField: string = "//app-member-form//div//input[@placeholder='e.g. +62-2199999 / +62-81299999999']";
    static emailMemberField: string = "//app-member-form//div//input[@placeholder='e.g. admin@yahoo.com']";
    static addressMemberField: string = "//app-member-form//textarea[@placeholder='e.g. Ruko Paramount Center II Blok B/8, Jl. CBD Gading Serpong']";
    static cancelMemberForm: string = "//app-member-form//span[normalize-space()='Cancel']";
    static saveMemberForm: string = "//app-member-form//span[normalize-space()='Save Reguler Member']";
    static updateMemberForm: string = "//app-member-form//span[normalize-space()='Update Reguler Member']";
    static escapeKeyboardForm: string = "//app-member-form//div//h5[normalize-space()='Regular Member Form']";
    static backGroundForm: string = "//div[@class='cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing']";

    //datepicker
    static btnMonthAndYear = (label: "Choose month and year" | "Choose date"):
        string => `//mat-datepicker-content//mat-calendar//button[@aria-label='${label}']`;
    static paginationDatePicker = (label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"):
        string => `//mat-calendar-header//button[@aria-label='${label}']`;
    static selectYear = (year: string): string => `//mat-multi-year-view//td//div[normalize-space()='${year}']`;
    static selectMonth = (month: string): string => `//mat-year-view//td//div[normalize-space()='${month.toUpperCase().slice(0, 3)}']`;
    static selectDate = (date: string): string => `//mat-month-view//td//div[normalize-space()='${date}']`;

}