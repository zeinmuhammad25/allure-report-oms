import BaseOmsPage from "../base-oms-page";
import RegularMemberDepositScenario from "./regularMemberDeposit.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberDepositLocator from "./regularMemberDeposit.locator";

export default class RegularMemberDepositPage extends BaseOmsPage implements RegularMemberDepositScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createdMemberDeposit(): Promise<void> {
        await this.expectVisible(RegularMemberDepositLocator.btnAddDepositMember);
        await this.click(RegularMemberDepositLocator.btnAddDepositMember);
    }
}