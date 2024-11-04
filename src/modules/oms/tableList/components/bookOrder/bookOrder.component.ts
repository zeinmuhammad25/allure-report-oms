import BookOrderScenario from "./bookOrder.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class BookOrderComponent extends BaseOmsPage implements BookOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectBookTable(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectBookingList(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async setPax(numberOfPax: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectSalesMode(salesModeName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async setTimeOut(timeOut: number): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async setCustomerPhoneNumber(phoneNumber: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}