import BaseScenario from "../../../../../base/base-scenario";

export default interface BookOrderScenario extends BaseScenario {
    selectBookTable(): Promise<void>;

    selectBookingList(): Promise<void>;

    setPax(numberOfPax: number): Promise<void>;

    selectSalesMode(salesModeName: string): Promise<void>;

    setTimeOut(timeOut: number): Promise<void>;

    setCustomerPhoneNumber(phoneNumber: string): Promise<void>;

    bookTable(): Promise<void>;

    bookAndOrder(): Promise<void>;

    applyQuickService(): Promise<void>;

    scanQuickService(): Promise<void>;

    skipCustomerPhoneNumber(): Promise<void>;
}