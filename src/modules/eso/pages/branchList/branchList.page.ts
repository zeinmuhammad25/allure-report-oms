import BaseEsoPage from "../../base/base-eso-page";
import BranchListScenario from "./branchList.scenario";
import BranchListLocator from "./branchList.locator";
import Element from "../../../../base/objects/Element";

export default class BranchListPage extends BaseEsoPage implements BranchListScenario {

    pageUrl = (): string => this.urls.get.branchList;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BranchListLocator.languageButton),
            Element.ofSelector(BranchListLocator.historyButton),
            Element.ofSelector(BranchListLocator.companyInfo),
            Element.ofSelector(BranchListLocator.locationSection),
            Element.ofSelector(BranchListLocator.inputField),
        ]
    }


    async gotoLocationPage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async changeLanguage(useEnglish: boolean): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async searchBranch(branchNmae: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectBranch(branchNmae: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

}