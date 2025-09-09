import BaseLocator from "../../../base/base-locator";
import {MemberObject} from "./MemberObject";


export default class RegularMemberDepositLocator extends BaseLocator {

    static btnAddDepositMember: string = "//app-deposit-list//span[contains(normalize-space(), 'Add Deposit')]";
    static escapeKeyboardDepositMember: string = "//div//h5[normalize-space()='Deposit List']";

    //datepicker
    static btnDate: string = "//app-deposit-list//mat-icon[normalize-space()='date_range']";
    static selectDateMonthAndYearcalendarNav = (side: "left" | "right", nav: "prev" | "next"): string =>
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

    static filedSearchDeposit: string = "//app-deposit-list//input[@placeholder='Search deposit']";
    static clearDataSearchDeposit: string = "//app-deposit-list//i[@class='glyphicon glyphicon-repeat']";
    static headerNameAndShorting = (headerName: "Deposit Number" |
        "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" |
        "Deposit Total" | "Sync Date" | "Reprint"): string =>
        `//app-deposit-list//button[contains(normalize-space(), '${headerName}')]`;
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-deposit-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static dataValidation = (value: string): string => `//app-deposit-list//td[contains(normalize-space(), '${value}')]`;
    //form
    static btnSearchMember: string = "//app-deposit-form//i[@class='glyphicon glyphicon-option-horizontal']";
    static escapeKeyboardForm: string = "//app-deposit-form//h5[normalize-space()='Deposit Form']";
    //MemberList
    static escapeKeyboardMemberList: string = "//app-browse-member//h4[normalize-space()='Regular Member List']";
    static fieldSearchMember: string = "//app-browse-member//input[@placeholder='Search Regular Member']";
    static clearSearchMember: string = "//app-browse-member//i[@class='glyphicon glyphicon-repeat']";
    static headerNameAndShortingMemberList = (headerName: "Name" | "Phone" | "Address"): string =>
        `//app-browse-member//button[contains(normalize-space(), '${headerName}')]`;
    static btnSelectMember = (value: string): string => `//app-browse-member//td[contains(normalize-space(), '${value}')]`;
    static paginationMemberList = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-browse-member//button[contains(@class, 'mat-paginator-navigation-${type}')]`;

    static btnScanMember: string = "//app-deposit-form//i[@class='glyphicon glyphicon-qrcode ng-star-inserted']";
    //Scan/Input
    static fieldInputMemberId: string = "//app-qr-code-member-deposit//input[@placeholder='Please input Member ID']";
    static applyInputMemberId: string = "//app-qr-code-member-deposit//button[normalize-space()='Apply']";

    static getLocatorPaymentCategory = (paymentType: MemberObject):
        string => `//app-deposit-form//span[contains(text(),'${paymentType}')]`;
    static getLocatorPayment = (paymentType: MemberObject):
        string => `//button[@class='mat-raised-button']//span[normalize-space()='${paymentType}']`;
    static paginationPayment = (arrow: "left" | "right"):
        string => `//app-deposit-form//i[@class='glyphicon glyphicon-arrow-${arrow}']`;
    static fieldTotalDeposit: string = "//app-deposit-form//input[@placeholder='e.g. 200.000']";
    static clearTotalDeposit: string = "//app-deposit-form//i[@class='glyphicon glyphicon-repeat']";
    static gridSelectSDepositBord = (deposit: MemberObject):
        string => `//div[@class='d-flex']//span//button//span[contains(text(),'${deposit}')]`;
    static fieldAdditionalInfo: string = "//app-deposit-form//textarea[contains(@class,'form-control')]";
    static cancelDepositForm: string = "//app-deposit-form//span[normalize-space()='Cancel']";
    static saveDepositForm: string = "//app-deposit-form//span[normalize-space()='Save Deposit']";
}