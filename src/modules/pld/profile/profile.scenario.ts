import BaseScenario from "../../base/base-scenario";

export default interface ProfileScenario extends BaseScenario {


    changeUsername(): Promise<void>;

}