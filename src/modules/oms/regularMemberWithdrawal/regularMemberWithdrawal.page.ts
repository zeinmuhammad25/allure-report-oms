import BaseOmsPage from "../base-oms-page";
import RegularMemberWithdrawalScenario from "./regularMemberWithdrawal.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberWithdrawalLocator from "./regularMemberWithdrawal.locator";

export default class RegularMemberWithdrawalPage extends BaseOmsPage implements RegularMemberWithdrawalScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createMemberWithdrawal(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnAddWithdrawalMember);
        await this.click(RegularMemberWithdrawalLocator.btnAddWithdrawalMember);
    }

    async dataFilterValidation(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = RegularMemberWithdrawalLocator.dataValidation(value);
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
            console.warn(`⚠️ Data "${value}" tidak ditemukan di deposit list.`);
            return 0;
        }
        console.log(`Data "${value}" ditemukan sebanyak: ${count} row(s).`);
        return count;
    }

    async searchMemberWithdrawal(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.filedSearchWithdrawal);
        await this.click(RegularMemberWithdrawalLocator.filedSearchWithdrawal);
        await this.fill(RegularMemberWithdrawalLocator.filedSearchWithdrawal, valueMember);
        await this.expectVisible(RegularMemberWithdrawalLocator.escapeKeyboardWithdrawalMember);
        await this.click(RegularMemberWithdrawalLocator.escapeKeyboardWithdrawalMember);
    }

    async cancelSearchMemberWithdrawal(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.clearDataSearchWithdrawal);
        await this.click(RegularMemberWithdrawalLocator.clearDataSearchWithdrawal);
    }

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnFilterDate);
        await this.click(RegularMemberWithdrawalLocator.btnFilterDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.selectDateMonthAndYearCalendarNav(side, nav));
        await this.click(RegularMemberWithdrawalLocator.selectDateMonthAndYearCalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string | number, side?: "left" | "right"): Promise<void> {
        const cell = side === "left"
            ? RegularMemberWithdrawalLocator.leftCalendarCell(day)
            : RegularMemberWithdrawalLocator.rightCalendarCell(day);

        await this.expectVisible(cell);
        await this.click(cell);
    }

    async applyFilterDate(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnApplyFilterDate);
        await this.click(RegularMemberWithdrawalLocator.btnApplyFilterDate);
    }

    async shortingAscWithdrawal(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.click(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
    }

    async shortingDescWithdrawal(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint"): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.click(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.click(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
    }

    async shortingAscAndDescDeposit(headerName: "Withdrawal Number" | "Date" | "Regular Member Code" | "Regular Member Name" | "Withdrawal Total" | "Sync Date" | "Reprint", value: string): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.click(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.dataFilterValidation(value);
        await this.click(RegularMemberWithdrawalLocator.headerNameAndShortingWithdrawal(headerName));
        await this.dataFilterValidation(value);
    }

    async withdrawalPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.paginationButtonWithdrawalList(type));
        await this.click(RegularMemberWithdrawalLocator.paginationButtonWithdrawalList(type));
    }

    async addRegularMemberNameList(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnSearchMemberName);
        await this.click(RegularMemberWithdrawalLocator.btnSearchMemberName);
    }

    async addRegularMemberNameQR(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnScanMemberName);
        await this.click(RegularMemberWithdrawalLocator.btnScanMemberName);
    }


}