import BaseScenario from "../../../../base/base-scenario";

export default interface ApplicationSettingScenario extends BaseScenario {
    userSetAllSetting(): Promise<void>;

    userSetStation(): Promise<void>;

    userSetWaringTime(): Promise<void>;

    userSetSalesMode(): Promise<void>;

    userSetSelfOrderServer(): Promise<void>;

}