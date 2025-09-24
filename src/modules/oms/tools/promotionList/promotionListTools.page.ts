import BaseOmsPage from "../../base-oms-page";
import PromotionListToolsScenario from "./promotionListTools.scenario";
import Element from "../../../../base/objects/Element";
import PromotionListToolsLocator from "./promotionListTools.locator";

export default class PromotionListToolsPage extends BaseOmsPage implements PromotionListToolsScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async selectPromoCategoryFilter(category: "ALL PROMOTIONS" | "TODAY'S PROMOTIONS"): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.categoryPromotionList(category));
        await this.click(PromotionListToolsLocator.categoryPromotionList(category));
    }

    async searchPromotionList(promotion: string): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.searchPromotionList);
        await this.click(PromotionListToolsLocator.searchPromotionList);
        await this.fill(PromotionListToolsLocator.searchPromotionList, promotion);
        await this.click(PromotionListToolsLocator.escapeKeyboard);
    }

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.btnDate);
        await this.click(PromotionListToolsLocator.btnDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(PromotionListToolsLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? PromotionListToolsLocator.leftCalendarCell(day)
            : PromotionListToolsLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.btnApplyDate);
        await this.click(PromotionListToolsLocator.btnApplyDate);
    }

    async dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = PromotionListToolsLocator.dataValidation(value);
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

    async shortingAscPromotionList(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.click(PromotionListToolsLocator.headerPromotionList(headerName));
    }

    async shortingDescPromotionList(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status"): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.click(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.click(PromotionListToolsLocator.headerPromotionList(headerName));
    }

    async shortingAscAndDescPromotionList(headerName: "Start Date" | "End Date" | "Min. Subtotal" | "Discount" | "Type" | "Status", value: string): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.click(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.dataValidation(value);
        await this.click(PromotionListToolsLocator.headerPromotionList(headerName));
        await this.dataValidation(value);
    }

    async clearFilter(): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.clearFilter);
        await this.click(PromotionListToolsLocator.clearFilter);
    }

    async showDropDown(): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.showDropDownStatus);
        await this.click(PromotionListToolsLocator.showDropDownStatus);
    }

    async setStatus(values: "all" | string | string[], opts?: { close?: boolean }): Promise<void> {
        const shouldClose = opts?.close ?? true;
        if (values === "all") {
            await this.expectVisible(PromotionListToolsLocator.selectAllStatus);
            await this.click(PromotionListToolsLocator.selectAllStatus);
        } else if (Array.isArray(values)) {
            for (const v of values) {
                const option = PromotionListToolsLocator.selectStatus(v);
                await this.expectVisible(option);
                await this.click(option);
            }
        } else {
            const option = PromotionListToolsLocator.selectStatus(values);
            await this.expectVisible(option);
            await this.click(option);
        }
        if (shouldClose && (await this.isVisible?.(PromotionListToolsLocator.closeAfterSet))) {
            await this.click(PromotionListToolsLocator.closeAfterSet);
        }
        await this.wait(500);
    }

    async promotionListFormPagination(type: "previous" | "next"): Promise<void> {
        await this.expectVisible(PromotionListToolsLocator.paginationButton(type));
        await this.click(PromotionListToolsLocator.paginationButton(type));
    }

}