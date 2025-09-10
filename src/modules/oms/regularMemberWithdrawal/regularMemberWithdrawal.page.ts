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

}