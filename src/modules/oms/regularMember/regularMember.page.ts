import BaseOmsPage from "../base-oms-page";
import RegularMemberScenario from "./regularMember.scenario";
import Element from "../../../base/objects/Element";
import RegularMemberLocator from "./regularMember.locator";

export default class RegularMemberPage extends BaseOmsPage implements RegularMemberScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async createdRegularMember(): Promise<void> {
        await this.expectVisible(RegularMemberLocator.btnAddRegularMember);
        await this.click(RegularMemberLocator.btnAddRegularMember);
    }

    async searchRegularMember(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.fieldSearchMember);
        await this.click(RegularMemberLocator.fieldSearchMember);
        await this.fill(RegularMemberLocator.fieldSearchMember, valueMember);
        await this.expectVisible(RegularMemberLocator.escapeKeyboardMember);
        await this.click(RegularMemberLocator.escapeKeyboardMember);
    }

    async cancelSearchRegularMember(valueMember: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.fieldSearchMember);
        await this.click(RegularMemberLocator.fieldSearchMember);
        await this.fill(RegularMemberLocator.fieldSearchMember, valueMember);
        await this.expectVisible(RegularMemberLocator.escapeKeyboardMember);
        await this.click(RegularMemberLocator.escapeKeyboardMember);
        await this.expectVisible(RegularMemberLocator.btnClearSearchMember);
        await this.click(RegularMemberLocator.btnClearSearchMember);
    }

    async shortingAscRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName))
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName))
    }
}