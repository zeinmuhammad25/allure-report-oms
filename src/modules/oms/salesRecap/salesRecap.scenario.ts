import BaseScenario from "../../../base/base-scenario";

export default interface SalesRecapScenario extends BaseScenario {
    salesRecapTab(tabSection: string): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    searchTransactionBillNumberSalesOverView(value: string): Promise<void>;

    searchMemberCustomerSalesOverView(value: string): Promise<void>;

    cancelDateInFilterDate(): Promise<void>;

    searchTableSalesOverView(value: string): Promise<void>;

    showDropDownVisitPurpose(): Promise<void>;

    setVisitPurpose(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void>;

    showDropDownPaymentMethod(): Promise<void>;

    setPaymentMethod(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void>;

    searchInformation(value: string): Promise<void>;

    dataValidationSalesOverView(value: string, opts?: { maxProbe?: number }): Promise<number>;

    shortingAscSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By"): Promise<void>;

    shortingDescSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By"): Promise<void>;

    shortingAscAndDescSalesOverView(headerName: "Transaction Number" | "Bill Number" | "Date" | "Regular Member" | "Loyalty Member" | "Customer" |
        "Table" | "Visit Purpose" | "Grand Total" | "Status" | "Payment Method" | "Payment Time" | "Payment By", value: string): Promise<void>;

    viewDetailSalesOverView(value: string, index: number): Promise<void>;

    actionDetailOverView(
        action: "Close" | "Void Sales" | "Edit Remarks" | "Reprint Receipt",
        shouldBeDisabled: boolean
    ): Promise<void>;

    btnVoidMenu(index: number, shouldBeDisabled: boolean): Promise<void>;

    inputQtyMenu(qty: string): Promise<void>;

    actionVoidMenu(action: "Cancel" | "Apply"): Promise<void>;

    salesOverViewPagination(type: "First page" | "previous" | "next" | "Last page"): Promise<void>;

    inputVoidNotes(notes: string): Promise<void>;

    selectVoidNotes(notes: string): Promise<void>;

    paginationVoidSales(arrow: "left" | "right"): Promise<void>;

    cancelVoidSales(): Promise<void>;

    applyVoidSales(shouldBeDisabled: boolean): Promise<void>;

    inputRemarks(remarks: string): Promise<void>;

    actionRemarks(action: "Cancel" | "Apply"): Promise<void>;

    reprintReceiptTab(tab: "Reprint Receipt" | "Resend Receipt"): Promise<void>;

    inputEmailOrWhatsappNumber(emailOrWhatsappNumber: string): Promise<void>;

    reprintReceiptAction(action: "Reprint Receipt" | "Send Receipt"): Promise<void>;

    cancelReprintReceiptAction(): Promise<void>;

    searchTransactionReference(fieldTransactionReference: string): Promise<void>;

    showDropDownPaymentMethodOnline(): Promise<void>;

    setPaymentMethodOnline(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void>;

    showDropDownStatusOnline(): Promise<void>;

    setStatusOnline(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void>;

    searchFilterOnlinePayment(): Promise<void>;

    shortingAscOnlinePayment(headerName: "Transaction Time" | "Order ID" | "Sales Number"
        | "Payment Method" | "Payment Status" | "Transaction Amount"): Promise<void>;
}