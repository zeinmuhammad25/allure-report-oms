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


}