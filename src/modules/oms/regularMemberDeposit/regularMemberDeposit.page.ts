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

}