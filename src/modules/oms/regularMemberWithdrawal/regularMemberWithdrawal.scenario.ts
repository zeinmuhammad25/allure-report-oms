import BaseScenario from "../../../base/base-scenario";

export default interface RegularMemberWithdrawalScenario extends BaseScenario {
    createMemberWithdrawal(): Promise<void>;

    searchMemberWithdrawal(valueMember: string): Promise<void>;

    cancelSearchMemberWithdrawal(): Promise<void>;

    clickFilterDate(): Promise<void>;
}