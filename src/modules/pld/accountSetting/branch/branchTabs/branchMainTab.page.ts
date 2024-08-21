import BasePosLitePage from "../../../base-pos-lite-page";
import Urls from "../../../../../configs/urls";
import Element from "../../../../../base/objects/Element";
import BranchMainTabScenario from "./branchMainTab.scenario";
import BranchMainTabLocator from "./branchMainTab.locator";


export default class BranchMainTabPage extends BasePosLitePage implements BranchMainTabScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BranchMainTabLocator.branchTabMain),
            Element.ofSelector(BranchMainTabLocator.branchTabNameField),
            Element.ofSelector(BranchMainTabLocator.branchTabSaveButton),
            Element.ofSelector(BranchMainTabLocator.branchTabCancelButton),
        ];
    }


    async performEditBranchName(): Promise<void> {
        await this.expectVisible(BranchMainTabLocator.branchTabNameField);
    }

}