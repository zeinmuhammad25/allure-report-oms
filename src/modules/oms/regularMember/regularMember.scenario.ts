import BaseScenario from "../../../base/base-scenario";


export default interface RegularMemberScenario extends BaseScenario {

    createdRegularMember(): Promise<void>;

}