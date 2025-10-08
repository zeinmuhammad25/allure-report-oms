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

    clearFilter(): Promise<void>;

    clickDetailBranchEvent(value: string, index: number): Promise<void>;

    closeDetailBranchEvent(): Promise<void>;

    dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number>;

    shortingAscBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By"): Promise<void>;

    shortingDescBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By"): Promise<void>;

    shortingAscAndDescBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By", value: string): Promise<void>;

    depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;
}