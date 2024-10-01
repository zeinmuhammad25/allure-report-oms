import BaseScenario from "../../../../base/base-scenario";

export default interface LoginScenario extends BaseScenario {
    loginGoogle(): Promise<void>

    loginFacebook(): Promise<void>

    loginAsGuest(): Promise<void>
}