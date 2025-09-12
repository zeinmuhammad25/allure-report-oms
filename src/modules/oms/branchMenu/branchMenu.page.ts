import BaseOmsPage from "../base-oms-page";
import BranchMenuScenario from "./branchMenu.scenario";
import Element from "../../../base/objects/Element";
import BranchMenuLocator from "./branchMenu.locator";


export default class BranchMenuPage extends BaseOmsPage implements BranchMenuScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async filterCategoryBranchMenu(filterName: string): Promise<void> {
        await this.expectVisible(BranchMenuLocator.btnFilterCategory(filterName));
        await this.click(BranchMenuLocator.btnFilterCategory(filterName));
    }

    async searchMenuInCategory(value: string): Promise<void> {
        await this.expectVisible(BranchMenuLocator.fieldSearchBranchMenu);
        await this.click(BranchMenuLocator.fieldSearchBranchMenu);
        await this.fill(BranchMenuLocator.fieldSearchBranchMenu, value);
        await this.click(BranchMenuLocator.escapeKeyboardBranchMenu);
    }

    async clearSearchMenuInCategory(): Promise<void> {
        await this.expectVisible(BranchMenuLocator.clearSearchBranchMenu);
        await this.click(BranchMenuLocator.clearSearchBranchMenu);
    }

    async selectMenuCategory(categoryName: string): Promise<void> {
        await this.expectVisible(BranchMenuLocator.menuCategory(categoryName));
        await this.click(BranchMenuLocator.menuCategory(categoryName));
    }

}