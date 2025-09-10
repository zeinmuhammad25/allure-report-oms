import BaseScenario from "../../../base/base-scenario";

export default interface RegularMemberWithdrawalScenario extends BaseScenario {
    createMemberWithdrawal(): Promise<void>;

    searchMemberWithdrawal(valueMember: string): Promise<void>;

    cancelSearchMemberWithdrawal(): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyFilterDate(): Promise<void>;

    shortingAscWithdrawal(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): Promise<void>;
}