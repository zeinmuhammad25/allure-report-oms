import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import BranchTabSalesModeScenario from "./branchTabSalesMode.scenario";
import BranchTabSalesModeLocator from "./branchTabSalesMode.locator";
import Element from "../../../../../../base/objects/Element";


export default class BranchTabSalesModePage extends BasePosLitePage implements BranchTabSalesModeScenario {


    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [];
    }

    async navigateToSalesModeTab(): Promise<void> {
        await this.click(BranchTabSalesModeLocator.branchTabSalesMode);
    }

    async salesModeAddNew(): Promise<void> {
        await this.click(BranchTabSalesModeLocator.branchTabSalesModeAddButton);
        await this.click(BranchTabSalesModeLocator.branchSalesModeDropdown);
        await this.click(BranchTabSalesModeLocator.branchSalesModeDropdownOnline);
        await this.click(BranchTabSalesModeLocator.branchSalesModeFormAddButton);
        await this.expectVisible(BranchTabSalesModeLocator.branchSalesModeCardOnline);
    }

    async salesModeDelete(): Promise<void> {
        await this.click(BranchTabSalesModeLocator.branchTabSalesModeDeleteButton);
        await this.expectVisible(BranchTabSalesModeLocator.branchTabSalesModeDeletePopUpImg);
        await this.click(BranchTabSalesModeLocator.branchTabSalesModeDeleteConfirmButton);
    }


}