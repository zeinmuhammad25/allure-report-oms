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
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
    }

    async shortingDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
    }

    async shortingAscAndDescRegularMember(headerName: "Code" | "Name" | "Address" | "Phone" | "Email", value: string): Promise<void> {
        await this.expectVisible(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.expectVisible(RegularMemberLocator.btnDataAndEdit(value));
        await this.click(RegularMemberLocator.headerNameAndShorting(headerName));
        await this.expectVisible(RegularMemberLocator.btnDataAndEdit(value));
    }

    async memberPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(RegularMemberLocator.paginationButton(type));
        await this.click(RegularMemberLocator.paginationButton(type));
    }

    async inputFormMemberName(memberName:string):Promise<void>{
        await this.expectVisible(RegularMemberLocator.regularMemberNameField)
        await this.click(RegularMemberLocator.regularMemberNameField)
        await this.fill(RegularMemberLocator.regularMemberNameField,memberName)
        await this.expectVisible(RegularMemberLocator.escapeKeyboardForm)
        await this.click(RegularMemberLocator.escapeKeyboardForm)
    }

}