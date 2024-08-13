import BaseScenario from "../../../../base/base-scenario";

export default interface LoginScenario extends BaseScenario {
    performWrongLogin(): Promise<void>;

    performLogin(): Promise<void>;

    performForgetPassword(): Promise<void>;

    performLoginSubs(): Promise<void>;
}