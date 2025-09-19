import BaseScenario from "../../../../base/base-scenario";

export default interface BranchEventListScenario extends BaseScenario {
    clickButtonFilterDate(): Promise<void>;

    selectMonthAndYear(label: "Choose month and year" | "Choose date"): Promise<void>;

    paginationDatePicker(label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"): Promise<void>;

    datePickerYear(year: string): Promise<void>;

    datePickerMonth(month: string): Promise<void>;

    datePickerDate(date: string): Promise<void>;

    searchRefNumber(refNumber: string): Promise<void>;

    searchEventSubject(subject: string): Promise<void>;

    clearFilter(refNumber: string): Promise<void>;

    clickDetailBranchEvent(value: string, index: number): Promise<void>;

    closeDetailBranchEvent(): Promise<void>;

    dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number>;

    shortingAscDeposit(headerName: "Ref Number" | "Event Subject" | "Create By"): Promise<void>;

    shortingDescDeposit(headerName: "Ref Number" | "Event Subject" | "Create By"): Promise<void>;

    shortingAscAndDescDeposit(headerName: "Ref Number" | "Event Subject" | "Create By", value: string): Promise<void>;

    depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;
}