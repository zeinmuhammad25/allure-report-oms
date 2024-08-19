import BaseScenario from "../../../../base/base-scenario";

export default interface LogoutScenario extends BaseScenario {

    performLogout(): Promise<void>;

}