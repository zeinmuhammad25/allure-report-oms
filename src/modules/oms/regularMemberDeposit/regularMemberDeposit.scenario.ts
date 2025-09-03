import BaseScenario from "../../../base/base-scenario";


export default interface RegularMemberDepositScenario extends BaseScenario {
    createdMemberDeposit(): Promise<void>;

    searchMemberDeposit(valueMember: string): Promise<void>;

    cancelSearchMemberDeposit(): Promise<void>;

    clickFilterDate(): Promise<void>;
}