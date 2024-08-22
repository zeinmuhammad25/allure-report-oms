import BasePosLitePage from "../../../base-pos-lite-page";
import Urls from "../../../../../configs/urls";
import Element from "../../../../../base/objects/Element";
import BranchTabMainScenario from "./branchTabMain.scenario";
import BranchTabMainLocator from "./branchTabMain.locator";


export default class BranchTabMainPage extends BasePosLitePage implements BranchTabMainScenario {
    private branchMainTabName = "Test Cabang Edit";
    private branchMainTabOrigin = "Ini Cabang 6 Bulan";

    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BranchTabMainLocator.branchTabMain),
            Element.ofSelector(BranchTabMainLocator.branchTabNameField),
            Element.ofSelector(BranchTabMainLocator.branchTabSaveButton),
            Element.ofSelector(BranchTabMainLocator.branchTabCancelButton),
        ];
    }


    async performEditBranchName(): Promise<void> {
        await this.click(BranchTabMainLocator.branchTabNameField);
        await this.clear(BranchTabMainLocator.branchTabNameField);
        await this.fill(BranchTabMainLocator.branchTabNameField, this.branchMainTabName);
        await this.click(BranchTabMainLocator.branchTabSaveButton);

    }

    async performResetBranchName(): Promise<void> {
        await this.click(BranchTabMainLocator.branchTabNameField);
        await this.clear(BranchTabMainLocator.branchTabNameField);
        await this.fill(BranchTabMainLocator.branchTabNameField, this.branchMainTabOrigin);
        await this.click(BranchTabMainLocator.branchTabSaveButton);

    }

}