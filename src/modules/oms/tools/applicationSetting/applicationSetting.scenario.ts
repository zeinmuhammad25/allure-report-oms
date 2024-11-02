import BaseScenario from "../../../../base/base-scenario";

export default interface ApplicationSettingScenario extends BaseScenario {
    UserSetAllSetting(): Promise<void>;

    UserSetStation(): Promise<void>;

    UserSetWaringTime(): Promise<void>;

    UserSetSalesMode(): Promise<void>;

    UserSetSelfOrderServer(): Promise<void>;

}