import BaseScenario from "../../../../../base/base-scenario";

export default interface BookOrderClassicScenario extends BaseScenario {

    setPax(numberOfPax: number): Promise<void>;

    selectSalesMode(salesModeName: string): Promise<void>;

    setTimeOut(timeOut: number): Promise<void>;

    setCustomerPhoneNumber(phoneNumber: string): Promise<void>;

    applyQuickService(): Promise<void>;

    //scanQuickService(): Promise<void>;

    skipCustomerPhoneNumber(): Promise<void>;

    applyQuickServiceWithCekLogicAndSkipCustomerPhoneNumber(): Promise<void>;
}