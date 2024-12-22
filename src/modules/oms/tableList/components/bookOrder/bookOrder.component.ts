import BookOrderScenario from "./bookOrder.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";
import BookOrderLocator from "./bookOrder.locator";


export default class BookOrderComponent extends BaseOmsPage implements BookOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookOrderLocator.bookTableTab),
            Element.ofSelector(BookOrderLocator.bookingListTab),
            Element.ofSelector(BookOrderLocator.paxButton(1)),
            Element.ofSelector(BookOrderLocator.salesModeButton("AT EXCLUSIVE"))
        ];
    }

    async selectBookTable(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookTableTab);
        await this.click(BookOrderLocator.bookTableTab);
    }

    async selectBookingList(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookingListTab);
        await this.click(BookOrderLocator.bookingListTab);
    }

    async setPax(numberOfPax: number): Promise<void> {
        await this.expectVisible(BookOrderLocator.paxButton(numberOfPax));
        await this.click(BookOrderLocator.paxButton(numberOfPax));
    }

    async selectSalesMode(salesModeName: string): Promise<void> {
        await this.expectVisible(BookOrderLocator.salesModeButton(salesModeName));
        await this.click(BookOrderLocator.salesModeButton(salesModeName));
    }

    async setTimeOut(timeOut: number): Promise<void> {
        await this.expectVisible(BookOrderLocator.orderTimeOutField);
        await this.fill(BookOrderLocator.orderTimeOutField, timeOut.toString());
    }


    async bookTable(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookTableButton);
        await this.click(BookOrderLocator.bookTableButton);
    }

    async bookAndOrder(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookOrderButton);
        await this.click(BookOrderLocator.bookOrderButton);
    }

    async applyQuickService(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookScanAndApplyButton("Apply"));
        await this.click(BookOrderLocator.bookScanAndApplyButton("Apply"));
    }

    async scanQuickService(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookScanAndApplyButton("Scan / Input"));
        await this.click(BookOrderLocator.bookScanAndApplyButton("Scan / Input"));
    }

    async setCustomerPhoneNumber(phoneNumber: string): Promise<void> {
        await this.expectVisible(BookOrderLocator.customerDataPhoneField);
        await this.fill(BookOrderLocator.customerDataPhoneField, phoneNumber);
        await this.expectVisible(BookOrderLocator.CustomerDataApplyButton);
        await this.click(BookOrderLocator.CustomerDataApplyButton);
    }

    async skipCustomerPhoneNumber(): Promise<void> {
        await this.expectVisible(BookOrderLocator.laterCustomerDataButton);
        await this.click(BookOrderLocator.laterCustomerDataButton);
        await this.wait(300);
    }

}