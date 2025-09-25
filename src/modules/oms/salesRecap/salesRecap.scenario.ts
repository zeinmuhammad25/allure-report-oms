import BaseScenario from "../../../base/base-scenario";

export default interface SalesRecapScenario extends BaseScenario {
    salesRecapTab(tabSection: string): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    searchTransactionBillNumberSalesOverView(value: string): Promise<void>;

    searchMemberCustomerSalesOverView(value: string): Promise<void>;

}