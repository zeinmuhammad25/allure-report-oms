import BaseScenario from "../../../base/base-scenario";


export default interface RegularMemberDepositScenario extends BaseScenario {
    createdMemberDeposit(): Promise<void>;
}