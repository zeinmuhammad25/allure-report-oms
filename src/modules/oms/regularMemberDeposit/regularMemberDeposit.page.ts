import BaseOmsPage from "../base-oms-page";
import RegularMemberDepositScenario from "./regularMemberDeposit.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberDepositLocator from "./regularMemberDeposit.locator";
import RegularMemberLocator from "../regularMember/regularMember.locator";

export default class RegularMemberDepositPage extends BaseOmsPage implements RegularMemberDepositScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createdMemberDeposit(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnAddDepositMember);
        await this.click(RegularMemberDepositLocator.btnAddDepositMember);
    }

    async searchMemberDeposit(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.filedSearchDeposit);
        await this.click(RegularMemberDepositLocator.filedSearchDeposit);
        await this.fill(RegularMemberDepositLocator.filedSearchDeposit, valueMember);
        await this.expectVisible(RegularMemberDepositLocator.escapeKeyboardDepositMember);
        await this.click(RegularMemberDepositLocator.escapeKeyboardDepositMember);
    }

    async cancelSearchMemberDeposit(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.clearDataSearchDeposit);
        await this.click(RegularMemberDepositLocator.clearDataSearchDeposit);
    }

    async clickFilterDate(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnDate);
        await this.click(RegularMemberDepositLocator.btnDate);
    }

    async selectMonthAndYear(side: "left" | "right", nav: "prev" | "next"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.selectDateMonthAndYearcalendarNav(side, nav));
        await this.click(RegularMemberDepositLocator.selectDateMonthAndYearcalendarNav(side, nav));
    }

    async datePickerFilterDate(day: string): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.calendarDate(day));
        await this.click(RegularMemberDepositLocator.calendarDate(day));
    }

    async applyDateInFilterDate(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnApplyDate);
        await this.click(RegularMemberDepositLocator.btnApplyDate);
    }

    async shortingAscDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShorting(headerName));
    }

    async shortingDescDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShorting(headerName));
    }

    async shortingAscAndDescDeposit(headerName: "Deposit Number" | "Date" | "Regular Member Name" | "Regular Member Phone" | "Regular Member Email" | "Deposit Total" | "Sync Date" | "Reprint", value: string): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.dataValidation(value);
        await this.click(RegularMemberDepositLocator.headerNameAndShorting(headerName));
        await this.dataValidation(value);
    }

    async depositPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.paginationButton(type));
        await this.click(RegularMemberDepositLocator.paginationButton(type));
    }

    async dataValidation(value: string, opts?: { maxProbe?: number }): Promise<number> {
        const baseLocator = RegularMemberDepositLocator.dataValidation(value);
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

    async applyRegularMemberNameList(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnSearchMember);
        await this.click(RegularMemberDepositLocator.btnSearchMember);
    }

    async applyRegularMemberNameQr(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnScanMember);
        await this.click(RegularMemberDepositLocator.btnScanMember);
    }

    async searchMemberList(memberName: string): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.fieldSearchMember);
        await this.click(RegularMemberDepositLocator.fieldSearchMember);
        await this.fill(RegularMemberDepositLocator.fieldSearchMember, memberName);
        await this.click(RegularMemberDepositLocator.escapeKeyboardMemberList);
    }

    async clearSearchMemberList(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.clearSearchMember);
        await this.click(RegularMemberDepositLocator.clearSearchMember);
    }

    async shortingAscDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
    }

    async shortingDescDepositMemberList(headerName: "Name" | "Phone" | "Address"): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
    }

    async shortingAscAndDescDepositMemberList(headerName: "Name" | "Phone" | "Address", value: string): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.click(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.expectVisible(RegularMemberDepositLocator.btnSelectMember(value));
        await this.click(RegularMemberDepositLocator.headerNameAndShortingMemberList(headerName));
        await this.expectVisible(RegularMemberDepositLocator.btnSelectMember(value));
    }


}