import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import BranchScenario from "./branch.scenario";
import BranchLocator from "./branch.locator";
import SidebarLocator from "../../dashboard/sidebar.locator";
import {Keyboard} from "../../../../base/constants/Keyboard";


export default class BranchPage extends BasePosLitePage implements BranchScenario {
    private branchName = "Ini Cabang 6 Bulan";
    private branchNameEdit = "Test Cabang Edit";


    pageUrl = (): string => Urls.accbranch;

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
    }


}