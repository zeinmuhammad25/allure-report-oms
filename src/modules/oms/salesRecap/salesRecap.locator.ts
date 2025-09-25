import BaseLocator from "../../../base/base-locator";

export default class SalesRecapLocator extends BaseLocator {

    static salesRecapTabSection = (tabSection: string): string =>
        `//mat-tab-header//div[contains(text(),'${tabSection}')]`;
    static clearFilter: string = "//i[@class='glyphicon glyphicon-repeat']";

    //Sales OverView

    static btnDate: string = "//app-sales-list//mat-icon[normalize-space()='date_range']";
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
    static btnCancelDate: string = "//ngx-daterangepicker-material//button[normalize-space()='Cancel']";
    static escapeKeyboardSalesOverView: string = "//h5[normalize-space()='Sales Recapitulation']";
    static filedTransactionBillNumber: string = "//input[@placeholder='Search by transaction / bill number']";
    static filedMemberCustomer: string = "//input[@placeholder='Search by member / customer name']";
    static filedTable: string = "//input[@placeholder='Search by table name']";
    static showDropDownVisitPurpose: string = "(//div[@class='mat-select-arrow-wrapper'])[1]";
    static selectAllVisitPurpose: string = "//span[@class='mat-checkbox-label']";
    static selectVisitPurpose = (VisitPurpose: string): string =>
        `//mat-option//span[normalize-space()='${VisitPurpose}']`;
    static showDropDownPaymentMethod: string = "(//div[@class='mat-select-arrow-wrapper'])[2]";
    static selectAllPaymentMethod: string = "//span[@class='mat-checkbox-label']";
    static selectPaymentMethod = (PaymentMethod: string): string =>
        `//mat-option//span[normalize-space()='${PaymentMethod}']`;
    static closeAfterSet: string = "//div[@class='cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing']";
    static filedAdditionalInfo: string = "//input[@placeholder='Search by additional info']";
    static paginationButtonSalesOverView = (type: "First page" | "previous" | "next" | "Last page"): string =>
        `//app-sales-list//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static headersSalesOverView =
        (headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
            "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By"): string =>
            `//app-sales-list//button[contains(normalize-space(), '${headerName}')]`;
    static dataValidationSalesOverView = (value: string): string => `//app-sales-list//td[normalize-space()='${value}']`;
    static viewDetailSalesOverView = (value: string, index: number): string =>
        `(//app-sales-list//td[normalize-space()='${value}'])[${index}]`;
    static actionDetailSalesOverView = (action: "Close" | "Void Sales" | "Edit Remarks" | "Reprint Receipt"): string =>
        `//span[normalize-space()='${action}']`;

    //voidMenu
    static deleteButtonMenuDetailSalesOverView = (index: number): string =>
        `(//button[.//i[contains(@class,'glyphicon-trash')]])[${index}]`;
    static fieldQtyVoidMenuSales: string = "//app-number-input//input[@placeholder='e.g. 1']";
    static escapeKeyboardVoidMenuQty: string = "//body/div[@class='cdk-overlay-container']/div[1]";
    static actionVoidMenuSales = (action: "Cancel" | "Apply"): string =>
        `//span[normalize-space()='${action}']`;

    //voidSalesPopup
    static voidSalesNotes: string = "//textarea[@class='form-control input-notes ng-pristine ng-valid ng-touched']";
    static voidTablePanel = (notes: string): string => `//app-grid-pagination//button//span[normalize-space()='${notes}']`;
    static paginationVoidSales = (arrow: "left" | "right"): string => `//i[@class='glyphicon glyphicon-arrow-${arrow}']`;
    static escapeKeyboardVoidSales: string = "//body/div[@class='cdk-overlay-container']/div[1]";
    static cancelVoidSales: string = "(//button[.//span[contains(normalize-space(.),'Cancel')]])[4]";
    static ApplyVoidSales: string = "//span[normalize-space()='Apply']";

    //EditRemarks
    static fieldRemarks: string = "//textarea[@class='form-control input-text-notes ng-pristine ng-valid ng-touched']";
    static escapeKeyboardRemarks: string = "//body/div[@class='cdk-overlay-container']/div[1]";
    static actionRemarks = (action: "Cancel" | "Apply"): string =>
        `//span[normalize-space()='${action}']`;

    //ReprintReceipt
    static receiptTab = (tab: "Reprint Receipt" | "Resend Receipt"): string =>
        `//div[contains(text(),'${tab}')]`;
    static escapeKeyboardResendEmail: string = "//body/div[@class='cdk-overlay-container']/div[1]";
    static fieldEmailOrWaNumber: string = "//input[@placeholder='Enter email address or whatsapp number']";
    static closeReprintReceipt: string = "(//span[@class='mat-button-wrapper'][normalize-space()='Close'])[2]";
    static reprintReceiptAction = (action: "Reprint Receipt" | "Send Receipt"): string =>
        `//button[@class='btn-action mat-raised-button mat-primary ng-star-inserted']//span[normalize-space()='${action}']`;

    //Online Payment
    static fieldTransactionReference: string = "//input[@placeholder='Search by Transaction Reference']";
    static escapeKeyboardOnlinePayment: string = "//h5[normalize-space()='Sales Recapitulation']";
    static dropdownOnlinePaymentMethod: string = "(//div[@class='mat-select-arrow-wrapper'])[1]";
    static selectAllOnlinePaymentMethod: string = "//span[@class='mat-checkbox-label']";
    static selectOnlinePaymentMethod = (onlinePaymentMethod: string): string =>
        `//mat-option//span[normalize-space()='${onlinePaymentMethod}']`;
    static dropdownPaymentStatus: string = "(//div[@class='mat-select-arrow-wrapper'])[2]";
    static selectAllPaymentStatus: string = "//span[@class='mat-checkbox-label']";
    static selectPaymentStatus = (onlinePaymentStatus: string): string =>
        `//mat-option//span[normalize-space()='${onlinePaymentStatus}']`;
    static closeAfterSelect: string = "//div[@class='cdk-overlay-backdrop cdk-overlay-transparent-backdrop cdk-overlay-backdrop-showing']";
    static btnSearchOnlinePayment: string = "//button//span[normalize-space()='Search']";
    static headersOnlinePayment =
        (headerName: "Transaction Time" | "Order ID" | "Sales Number" | "Payment Method" | "Payment Status" | "Transaction Amount"): string =>
            `//app-online-payment-dashboard//button[contains(normalize-space(), '${headerName}')]`;
    static dataValidationOnlinePayment = (value: string): string =>
        `//app-online-payment-dashboard//td[normalize-space()='${value}']`;
    static paginationOnlinePaymentNextBack = (type: "left" | "right"): string =>
        `//img[@src='assets/images/icon-chevron-single-${type}.png']`;
    static paginationOnlinePaymentFirstLast = (type: "left" | "right"): string =>
        `//img[@src='assets/images/icon-chevron-double-${type}.png']`;
}