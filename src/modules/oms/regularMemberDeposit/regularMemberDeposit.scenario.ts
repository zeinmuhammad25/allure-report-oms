import BaseScenario from "../../../base/base-scenario";


export default interface RegularMemberDepositScenario extends BaseScenario {
    createdMemberDeposit(): Promise<void>;

    searchMemberDeposit(valueMember: string): Promise<void>;

    cancelSearchMemberDeposit(): Promise<void>;

    clickFilterDate(): Promise<void>;

    selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void>;

    datePickerFilterDate(day: string): Promise<void>;

    applyDateInFilterDate(): Promise<void>;

    depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void>;
}