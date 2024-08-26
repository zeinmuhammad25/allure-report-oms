import BasePosLitePage from "../../../../base-pos-lite-page";
import Urls from "../../../../../../configs/urls";
import Element from "../../../../../../base/objects/Element";
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
            Element.ofSelector(BranchTabMainLocator.branchMainTabCodeField),
            Element.ofSelector(BranchTabMainLocator.branchTabSaveButton),
            Element.ofSelector(BranchTabMainLocator.branchTabCancelButton),
            Element.ofSelector(BranchTabMainLocator.branchMainTabAddressField),
            Element.ofSelector(BranchTabMainLocator.branchMainTabProvinceField),
            Element.ofSelector(BranchTabMainLocator.branchMainTabPostalCodeField),
            Element.ofSelector(BranchTabMainLocator.branchMainTabTimeZoneDropdown),
            Element.ofSelector(BranchTabMainLocator.branchMainTabPhoneField),

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

    async performBranchTabMainElementCheck(): Promise<void> {
        await this.click(BranchTabMainLocator.branchTabMain);
        console.log('User is on branch tab main page');
        await this.expectVisible(BranchTabMainLocator.branchTabNameField);
        console.log('branch name field in main tab is present');
        await this.expectVisible(BranchTabMainLocator.branchMainTabCodeField);
        console.log('branch code field in main tab is present');
        await this.expectVisible(BranchTabMainLocator.branchMainTabPhoneField);
        console.log('branch phone number field in main tab is present');
        await this.expectVisible(BranchTabMainLocator.branchTabSaveButton);
        console.log('branch save button in main tab is present');
        await this.expectVisible(BranchTabMainLocator.branchTabCancelButton);
        console.log('branch cancel button in main tab is present');


    }

}