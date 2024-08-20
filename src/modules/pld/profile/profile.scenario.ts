import BaseScenario from "../../../base/base-scenario";

export default interface ProfileScenario extends BaseScenario {


    userNameChange(): Promise<void>;

    userNameChangeDirect(): Promise<void>;


}