import BaseOmsPage from "../../base-oms-page";
import PromotionListTollsScenario from "./promotionListTolls.scenario";
import Element from "../../../../base/objects/Element";
import PromotionListTollsLocator from "./promotionListTolls.locator";

export default class PromotionListTollsPage extends BaseOmsPage implements PromotionListTollsScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectPromoCategoryFilter(category: "ALL PROMOTIONS" | "TODAY'S PROMOTIONS"): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.categoryPromotionList(category));
        await this.click(PromotionListTollsLocator.categoryPromotionList(category));
    }

    async searchPromotionList(promotion: string): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.searchPromotionList);
        await this.click(PromotionListTollsLocator.searchPromotionList);
        await this.fill(PromotionListTollsLocator.searchPromotionList, promotion);
        await this.click(PromotionListTollsLocator.escapeKeyboard);
    }

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.btnDate);
        await this.click(PromotionListTollsLocator.btnDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(PromotionListTollsLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? PromotionListTollsLocator.leftCalendarCell(day)
            : PromotionListTollsLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.btnApplyDate);
        await this.click(PromotionListTollsLocator.btnApplyDate);
    }

    async dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = PromotionListTollsLocator.dataValidation(value);
        const maxProbe = opts?.maxProbe ?? 200; // batas aman
        let count = 0;
        for (let i = 1; i <= maxProbe; i++) {
            const indexed = `(${baseLocator})[${i}]`;
            try {
                await this.expectVisible(indexed);
                count++;
            } catch {
                break;
            }
        }
        if (count === 0) {
            console.warn(`⚠️ Data "${value}" tidak ditemukan di Promotion list.`);
            return 0;
        }
        console.log(`Data "${value}" ditemukan sebanyak: ${count} row(s).`);
        return count;
    }

    async shortingAscDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.click(PromotionListTollsLocator.headerPromotionList(headerName));
    }

    async shortingDescDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.click(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.click(PromotionListTollsLocator.headerPromotionList(headerName));
    }

    async shortingAscAndDescDeposit(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status", value: string): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.click(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.dataValidation(value);
        await this.click(PromotionListTollsLocator.headerPromotionList(headerName));
        await this.dataValidation(value);
    }

    async clearFilter(): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.clearFilter);
        await this.click(PromotionListTollsLocator.clearFilter);
    }

    async showDropDown(): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.showDropDownStatus);
        await this.click(PromotionListTollsLocator.showDropDownStatus);
    }

    async setStatus(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(PromotionListTollsLocator.selectAllStatus);
            await this.click(PromotionListTollsLocator.selectAllStatus);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = PromotionListTollsLocator.selectStatus(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = PromotionListTollsLocator.selectStatus(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(PromotionListTollsLocator.closeAfterSet))) {
            await this.click(PromotionListTollsLocator.closeAfterSet);
        }
    }

    async promotionListFormPagination(type: "previous" | "next"): Promise<void> {
        await this.expectVisible(PromotionListTollsLocator.paginationButton(type));
        await this.click(PromotionListTollsLocator.paginationButton(type));
    }

}