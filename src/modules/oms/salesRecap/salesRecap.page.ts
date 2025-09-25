import BaseOmsPage from "../base-oms-page";
import Element from "../../../base/objects/Element";
import SalesRecapScenario from "./salesRecap.scenario";
import SalesRecapLocator from "./salesRecap.locator";

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

    async searchTableSalesOverView(value: string): Promise<void> {
        await this.expectVisible(SalesRecapLocator.filedTable);
        await this.click(SalesRecapLocator.filedTable);
        await this.fill(SalesRecapLocator.filedTable, value);
        await this.click(SalesRecapLocator.escapeKeyboardSalesOverView);
    }

    async showDropDownVisitPurpose(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.showDropDownVisitPurpose);
        await this.click(SalesRecapLocator.showDropDownVisitPurpose);
    }

    async setVisitPurpose(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(SalesRecapLocator.selectAllVisitPurpose);
            await this.click(SalesRecapLocator.selectAllVisitPurpose);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = SalesRecapLocator.selectVisitPurpose(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = SalesRecapLocator.selectVisitPurpose(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(SalesRecapLocator.closeAfterSet))) {
            await this.click(SalesRecapLocator.closeAfterSet);
        }
        await this.wait(500);
    }

    async showDropDownPaymentMethod(): Promise<void> {
        await this.expectVisible(SalesRecapLocator.showDropDownPaymentMethod);
        await this.click(SalesRecapLocator.showDropDownPaymentMethod);
    }

}