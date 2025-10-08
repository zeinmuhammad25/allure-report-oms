import BaseScenario from "../../../../base/base-scenario";

export default interface ApplicationSettingScenario extends BaseScenario {

    userSetStation(station: string): Promise<void>;

    userSetWaringTime(first: string, second: string): Promise<void>;

    userSetSalesMode(dineIn: string, quickService): Promise<void>;

    userSetSelfOrderServer(): Promise<void>;

    dropDownSelfOrderServer(): Promise<void>;

    saveSetting(): Promise<void>;

    userFirstWaringTime(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        first?: number | string
    ): Promise<void>;

    userSecondWaringTime(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        second?: number | string
    ): Promise<void>;

    showDropDownDineISalesMode(): Promise<void>;

    userDineInSalesMode(dineIn: string | string[]): Promise<void>;

    showDropDownQuickServiceSalesMode(): Promise<void>;

    userQuickServiceSalesMode(quickService: string | string[]): Promise<void>;

    userSalesModeforQuickService(quickService: string): Promise<void>;

    userSetDirectServing(): Promise<void>;

    userHideNotesSetDirectServing(): Promise<void>;

    setCustomerDisplay(option: string): Promise<void>;

    proceedMonitorDisplay(): Promise<void>;

    cancelMonitorDisplay(): Promise<void>;

    inputLengthPoleDisplay(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        length?: number | string
    ): Promise<void>;

    inputPortPoleDisplay(
        o?: { append?: boolean; delCount?: number; delFrom?: "start" | "end"; delSub?: number },
        port?: number | string
    ): Promise<void>;

    userSetSelfOrderServerStation(station: string): Promise<void>;

    userOffSelfOrderServerStation(): Promise<void>;

    cancelUserOffSelfOrderServerStation(): Promise<void>;

    UserShowOnScreenKeyboard(): Promise<void>;

    userSetIntegratedScale(status: string): Promise<void>;

    UserShowInfoOnTable(): Promise<void>;

    userSetQrCodeScanner(mode: string): Promise<void>;

    closePopUpApplicationSetting(): Promise<void>;

}