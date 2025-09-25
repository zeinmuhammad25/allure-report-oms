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
}