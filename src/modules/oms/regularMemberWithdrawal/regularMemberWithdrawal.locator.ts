import BaseLocator from "../../../base/base-locator";
import {MemberObject} from "../regularMemberDeposit/MemberObject";

export default class RegularMemberWithdrawalLocator extends BaseLocator {

    static btnAddWithdrawalMember: string = "//app-withdrawal-list//span[contains(normalize-space(), 'Add Withdrawal')]";
    static escapeKeyboardWithdrawalMember: string = "//div//h5[normalize-space()='Withdrawal List']";
    //datepicker
    static btnFilterDate: string = "//app-withdrawal-list//mat-icon[normalize-space()='date_range']";
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
    static btnApplyFilterDate: string = "//ngx-daterangepicker-material//button[normalize-space()='Apply']";

    static filedSearchWithdrawal: string = "//app-withdrawal-list//input[@placeholder='Search withdrawal']";
    static clearDataSearchWithdrawal: string = "//app-withdrawal-list//i[@class='glyphicon glyphicon-repeat']";
    static headerNameAndShortingWithdrawal = (headerName: "Withdrawal Number" |
        "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): string =>
        `//app-withdrawal-list//button[contains(normalize-space(), '${headerName}')]`;
    static paginationButtonWithdrawalList = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-withdrawal-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static dataValidation = (value: string): string => `//app-withdrawal-list//td[contains(normalize-space(), '${value}')]`;
    //form Withdrawal
    static btnSearchMemberName: string = "//app-withdrawal-form//i[@class='glyphicon glyphicon-option-horizontal']";
    static escapeKeyboardForm: string = "//app-withdrawal-form//h5[normalize-space()='Withdrawal Form']";
    //MemberList
    static escapeKeyboardMemberList: string = "//app-browse-member//h4[normalize-space()='Regular Member List']";
    static fieldSearchMember: string = "//app-browse-member//input[@placeholder='Search Regular Member']";
    static clearSearchMember: string = "//app-browse-member//i[@class='glyphicon glyphicon-repeat']";
    static headerNameAndShortingMemberList = (headerName: "Name" | "Phone" | "Address"): string =>
        `//app-browse-member//button[contains(normalize-space(), '${headerName}')]`;
    static btnSelectMember = (value: string): string => `//app-browse-member//td[contains(normalize-space(), '${value}')]`;
    static paginationMemberList = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-browse-member//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static btnScanMemberName: string = "//app-withdrawal-form//i[@class='glyphicon glyphicon-qrcode ng-star-inserted']";
    //Scan//Input
    static fieldInputMemberId: string = "//app-qr-code-member-deposit//input[@placeholder='Please input Member ID']";
    static applyInputMemberId: string = "//app-qr-code-member-deposit//button[normalize-space()='Apply']";
    static getLocatorPaymentCategory = (paymentType: MemberObject):
        string => `//app-withdrawal-form//span[contains(text(),'${paymentType}')]`;
    static getLocatorPayment = (paymentType: MemberObject):
        string => `//button[@class='mat-raised-button']//span[normalize-space()='${paymentType}']`;
    static paginationPayment = (arrow: "left" | "right"):
        string => `//app-withdrawal-form//i[@class='glyphicon glyphicon-arrow-${arrow}']`;
    static fieldTotalWithdrawal: string = "//app-withdrawal-form//input[@placeholder='e.g. 200.000']";
    static clearTotalWithdrawal: string = "//app-withdrawal-form//i[@class='glyphicon glyphicon-repeat']";
    static gridSelectSWithdrawalBord = (withdrawal: MemberObject):
        string => `//div[@class='d-flex']//span//button//span[contains(text(),'${withdrawal}')]`;
    static fieldAdditionalInfoWithdrawal: string = "//app-withdrawal-form//textarea[contains(@class,'form-control')]";
    static cancelWithdrawalForm: string = "//app-withdrawal-form//span[normalize-space()='Cancel']";
    static saveWithdrawalForm: string = "//app-withdrawal-form//span[normalize-space()='Save Withdrawal']";

}