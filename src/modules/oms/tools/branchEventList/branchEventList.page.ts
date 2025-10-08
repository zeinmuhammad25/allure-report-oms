import BaseOmsPage from "../../base-oms-page";
import BranchEventListScenario from "./branchEventList.scenario";
import Element from "../../../../base/objects/Element";
import BranchEventListLocator from "./branchEventList.locator";

export default class BranchEventListPage extends BaseOmsPage implements BranchEventListScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async clickButtonFilterDate(): Promise<void> {
        await this.expectVisible(BranchEventListLocator.btnDateBranchEvent);
        await this.click(BranchEventListLocator.btnDateBranchEvent);
    }

    async selectMonthAndYear(label: "Choose month and year" | "Choose date"): Promise<void> {
        await this.expectVisible(BranchEventListLocator.btnMonthAndYear(label));
        await this.click(BranchEventListLocator.btnMonthAndYear(label));
    }

    async paginationDatePicker(label: "Next month" | "Previous month" | "Next 20 years" | "Previous 20 years" | "Next year" | "Previous year"): Promise<void> {
        await this.expectVisible(BranchEventListLocator.paginationDatePicker(label));
        await this.click(BranchEventListLocator.paginationDatePicker(label));
    }

    async datePickerYear(year: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.selectYear(year));
        await this.click(BranchEventListLocator.selectYear(year));
    }

    async datePickerMonth(month: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.selectMonth(month));
        await this.click(BranchEventListLocator.selectMonth(month));
    }

    async datePickerDate(date: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.selectDate(date));
        await this.click(BranchEventListLocator.selectDate(date));
    }

    async searchRefNumber(refNumber: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.refNumberField);
        await this.click(BranchEventListLocator.refNumberField);
        await this.fill(BranchEventListLocator.refNumberField, refNumber);
        await this.click(BranchEventListLocator.escapeKeyboard);
    }

    async searchEventSubject(subject: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.eventSubjectField);
        await this.click(BranchEventListLocator.eventSubjectField);
        await this.fill(BranchEventListLocator.eventSubjectField, subject);
        await this.click(BranchEventListLocator.escapeKeyboard);
    }

    async clearFilter(): Promise<void> {
        await this.expectVisible(BranchEventListLocator.clearFilter);
        await this.click(BranchEventListLocator.clearFilter);
    }

    async clickDetailBranchEvent(value: string, index: number): Promise<void> {
        await this.expectVisible(BranchEventListLocator.btnViewDetail(value, index));
        await this.click(BranchEventListLocator.btnViewDetail(value, index));
        await this.wait(300);
    }

    async closeDetailBranchEvent(): Promise<void> {
        await this.expectVisible(BranchEventListLocator.closeDetail);
        await this.click(BranchEventListLocator.closeDetail);
    }

    async dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = BranchEventListLocator.dataValidation(value);
        const maxProbe = opts?.maxProbe ?? 200; // batas aman
        let count = 0;
        for (let i = 1; i <= maxProbe; i++) {
            const indexed = `(${baseLocator})[${i}]`;
            try {
                // Jangan kirim argumen kedua (angka). Banyak base util expectVisible cuma terima (locator: string) atau (locator: string, optional?: boolean)
                await this.expectVisible(indexed);
                count++;
            } catch {
                // ö Begitu gagal visible, anggap elemen habis.
                break;
            }
        }
        if (count === 0) {
            console.warn(`⚠️ Data "${value}" tidak ditemukan di Branch Event.`);
            return 0;
        }
        console.log(`Data "${value}" ditemukan sebanyak: ${count} row(s).`);
        return count;
    }

    async shortingAscBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By"): Promise<void> {
        await this.expectVisible(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.click(BranchEventListLocator.headerNameAndShorting(headerName));
    }

    async shortingDescBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By"): Promise<void> {
        await this.expectVisible(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.click(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.click(BranchEventListLocator.headerNameAndShorting(headerName));
    }

    async shortingAscAndDescBranchEventList(headerName: "Ref Number" | "Event Subject" | "Created By", value: string): Promise<void> {
        await this.expectVisible(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.click(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.dataValidation(value);
        await this.click(BranchEventListLocator.headerNameAndShorting(headerName));
        await this.dataValidation(value);
    }

    async depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(BranchEventListLocator.paginationButton(type));
        await this.click(BranchEventListLocator.paginationButton(type));
    }

}