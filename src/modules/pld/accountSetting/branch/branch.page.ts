import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BranchScenario from "./branch.scenario";
import BranchLocator from "./branch.locator";
import SidebarLocator from "../../dashboard/sidebar.locator";
import {Keyboard} from "../../../../base/constants/Keyboard";
import BranchTabMainLocator from "./branchTabs/branchTabMain/branchTabMain.locator";


export default class BranchPage extends BasePosLitePage implements BranchScenario {
    private branchName = "Ini Cabang 6 Bulan";
    private branchNameEdit = "Test Cabang Edit";


    pageUrl = (): string => this.urls.get.accountSetting.branchUrl;

    shouldHave(): Element[] {
        return [
            Element.ofText("Daftar Cabang"),
            Element.ofSelector(BranchLocator.addBranchButton),
            Element.ofSelector(BranchLocator.accountSearchBranch),
            Element.ofSelector(BranchLocator.accountSearchExpired),
            Element.ofSelector(BranchLocator.accountBranchAmount),

        ];
    }

    async navigateToBranchSetting(): Promise<void> {
        await this.expectVisible(SidebarLocator.accountSettingHead);
        await this.click(SidebarLocator.accountSettingHead);
        await this.expectVisible(SidebarLocator.accountSettingBranch);
        await this.click(SidebarLocator.accountSettingBranch);
    }

    async cleanUpBranchData(): Promise<void> {
        await this.expectVisible(BranchLocator.branchSearchBar);
        await this.click(BranchLocator.branchSearchBar);
        await this.typeKeyboard(this.branchNameEdit);
        await this.pressKeyboard(Keyboard.ENTER);

        const isSaveButtonVisible = await this.isVisible(BranchLocator.branchOriginDataName);
        if (!isSaveButtonVisible) {
            await this.click(BranchLocator.branchEditButton);
            await this.clear(BranchTabMainLocator.branchTabNameField);
            await this.fill(BranchTabMainLocator.branchTabNameField, this.branchName);
            await this.click(BranchTabMainLocator.branchTabSaveButton);
        }
    }

    async searchBranchData(isVisible: boolean = false): Promise<void> {
        await this.expectVisible(BranchLocator.branchSearchBar);
        await this.click(BranchLocator.branchSearchBar);
        await this.typeKeyboard(this.branchName);
        await this.pressKeyboard(Keyboard.ENTER);
        await this.expectVisible(BranchLocator.branchOriginDataName);
        await this.click(BranchLocator.branchEditButton);
    }

    async searchBranchDataEdit(): Promise<void> {
        await this.expectVisible(BranchLocator.branchSearchBar);
        await this.click(BranchLocator.branchSearchBar);
        await this.typeKeyboard(this.branchNameEdit);
        await this.pressKeyboard(Keyboard.ENTER);
        await this.expectVisible(BranchLocator.branchEditDataName);
        await this.click(BranchLocator.branchEditButton);
    }

    async performBranchElementCheck(): Promise<void> {
        await this.expectVisible(BranchLocator.branchSearchBar);
        console.log('Search bar in branch page is present');
        await this.expectVisible(BranchLocator.addBranchButton);
        console.log('Add branch button in branch page is present');
        await this.expectTextVisible("Daftar Cabang")
        console.log('Branch page title is present');
        await this.expectVisible(BranchLocator.accountSearchExpired);
        console.log('Branch page expired order row is present');
        await this.expectVisible(BranchLocator.accountBranchAmount);
        console.log('Branch count in branch page is present');
    }


}