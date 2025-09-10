import BaseScenario from "../../../base/base-scenario";

export default interface RegularMemberWithdrawalScenario extends BaseScenario {
    createMemberWithdrawal(): Promise<void>;

    dataFilterValidation(value: string, opts?: { maxProbe?: number }): Promise<number>;

    searchMemberWithdrawal(valueMember: string): Promise<void>;

    cancelSearchMemberWithdrawal(): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void>;

    applyFilterDate(): Promise<void>;

    shortingAscWithdrawal(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): Promise<void>;

    shortingDescWithdrawal(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): Promise<void>;

    shortingAscAndDescDeposit(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint", value: string): Promise<void>;

    withdrawalPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;

    addRegularMemberNameList(): Promise<void>;

    addRegularMemberNameQR(): Promise<void>;

    searchMemberList(memberName: string): Promise<void>;

    clearSearchMemberList(): Promise<void>;

    shortingAscDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void>;

    shortingDescDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void>;

    shortingAscAndDescDepositMemberList(headerName: "Name" | "Phone" | "Address", value: string): Promise<void>;

    selectRegularMemberNameList(value: string): Promise<void>;

    memberListFormPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;
}