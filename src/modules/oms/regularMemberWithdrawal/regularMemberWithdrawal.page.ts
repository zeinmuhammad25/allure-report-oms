import BaseOmsPage from "../base-oms-page";
import RegularMemberWithdrawalScenario from "./regularMemberWithdrawal.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberWithdrawalLocator from "./regularMemberWithdrawal.locator";
import RegularMemberDepositLocator from "../regularMemberDeposit/regularMemberDeposit.locator";

export default class RegularMemberWithdrawalPage extends BaseOmsPage implements RegularMemberWithdrawalScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createMemberWithdrawal(): Promise<void> {
        await this.expectVisible(RegularMemberWithdrawalLocator.btnAddWithdrawalMember);
        await this.click(RegularMemberWithdrawalLocator.btnAddWithdrawalMember);
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

}