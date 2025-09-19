import BaseScenario from "../../../../base/base-scenario";

export default interface ApplicationSettingScenario extends BaseScenario {

    userSetStation(station: string): Promise<void>;

    userSetWaringTime(first: string, second: string): Promise<void>;

    userSetSalesMode(dineIn: string, quickService): Promise<void>;

    userSetSelfOrderServer(station: string): Promise<void>;

    saveSetting(): Promise<void>;

    userFirstWaringTime(first: string): Promise<void>;

    userSecondWaringTime(second: string): Promise<void>;

    userDineInSalesMode(dineIn: string): Promise<void>;

    userQuickServiceSalesMode(dineIn: string, quickService: string): Promise<void>;

    userSalesModeforQuickService(quickService: string): Promise<void>;

    userSetDirectServing(): Promise<void>;

    userHideNotesSetDirectServing(): Promise<void>;

    setCustomerDisplay(option: string): Promise<void>;

    proceedMonitorDisplay(): Promise<void>;

    cancelMonitorDisplay(): Promise<void>;

    inputLengthPoleDisplay(length: string): Promise<void>;

    inputPortPoleDisplay(length: string): Promise<void>;

    userSetSelfOrderServerStation(station: string): Promise<void>;

    UserShowOnScreenKeyboard(): Promise<void>;

    userSetIntegratedScale(status: string): Promise<void>;

    UserShowInfoOnTable(): Promise<void>;

}