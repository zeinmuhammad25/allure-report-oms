import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SalesRecapScenario from "./salesRecap.scenario";
import SalesRecapLocator from "./salesRecap.locator";
import PromotionListToolsLocator from "../tools/promotionList/promotionListTools.locator";

export default class SalesRecapPage extends BaseOmsPage implements SalesRecapScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async salesRecapTab(tabSection: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.salesRecapTabSection(tabSection));
        await this.click(SalesRecapLocator.salesRecapTabSection(tabSection));
    }

    //salesOverView

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnDate);
        await this.click(SalesRecapLocator.btnDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(SalesRecapLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(SalesRecapLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? SalesRecapLocator.leftCalendarCell(day)
            : SalesRecapLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnApplyDate);
        await this.click(SalesRecapLocator.btnApplyDate);
    }

    async cancelDateInFilterDate(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.btnCancelDate);
        await this.click(SalesRecapLocator.btnCancelDate);
    }


    async searchTransactionBillNumberSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedTransactionBillNumber);
        await this.click(SalesRecapLocator.filedTransactionBillNumber);
        await this.fill(SalesRecapLocator.filedTransactionBillNumber, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async searchMemberCustomerSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedMemberCustomer);
        await this.click(SalesRecapLocator.filedMemberCustomer);
        await this.fill(SalesRecapLocator.filedMemberCustomer, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

}