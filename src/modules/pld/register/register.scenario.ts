import BaseScenario from "../../../../base/base-scenario";

export default interface RegisterScenario extends BaseScenario {

    performRegister(): Promise<void>;

    performClickTnC(): Promise<void>;

    performClickPrivacyPolicy(): Promise<void>;

    performRegisterWithWrongPhone(): Promise<void>;

    performRegisterWithWrongEmail(): Promise<void>;

    performRegisterWithWrongName(): Promise<void>;

    performRegisterWithWrongPassword(): Promise<void>;
}