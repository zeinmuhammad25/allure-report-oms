import BookOrderScenario from "./bookOrderClassic.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";
import BookOrderLocator from "./bookOrderClassic.loactor";


export default class BookOrderClassicComponent extends BaseOmsPage implements BookOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BookOrderLocator.paxButton(1)),
            Element.ofSelector(BookOrderLocator.salesModeButton("AT EXCLUSIVE"))
        ];
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

    async applyQuickService(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookApplyButton);
        await this.click(BookOrderLocator.bookApplyButton);
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

    async applyQuickServiceWithCekLogicAndSkipCustomerPhoneNumber(): Promise<void> {
        await this.expectVisible(BookOrderLocator.bookApplyButton);
        await this.click(BookOrderLocator.bookApplyButton);
        await this.wait(300);
        const popUpCustomerNumber = await this.isVisible(BookOrderLocator.popUpCustomerData);
        if (popUpCustomerNumber) {
            await this.click(BookOrderLocator.laterCustomerDataButton);
            await this.wait(300);
        } else {
            console.log("Not Setup Customer Phone Number");
        }
    }

}