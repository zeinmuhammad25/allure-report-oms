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

    async paginationMenuCategory(categoryName: string): Promise<void> {
        await this.expectVisible(BranchMenuLocator.paginationMenuCategory(categoryName));
        await this.click(BranchMenuLocator.paginationMenuCategory(categoryName));
    }

    async butonCheckerStation(checker: string, index: number, closeButton?: boolean): Promise<void> {
        const close = closeButton ?? false;
        await this.expectVisible(BranchMenuLocator.selectChecker(checker, index));
        await this.click(BranchMenuLocator.selectChecker(checker, index));
        if (close) {
            if (await this.isVisible?.(BranchMenuLocator.backGroundPage)) {
                await this.click(BranchMenuLocator.backGroundPage);
            }
        }
    }

    async butonStation(station: string, index: number, closeButton?: boolean): Promise<void> {
        const close = closeButton ?? false;
        await this.expectVisible(BranchMenuLocator.selectStation(station, index));
        await this.click(BranchMenuLocator.selectStation(station, index));
        if (close) {
            if (await this.isVisible?.(BranchMenuLocator.backGroundPage)) {
                await this.click(BranchMenuLocator.backGroundPage);
            }
        }
    }

    async butonShowQty(qty: string, index: number, closeButton?: boolean): Promise<void> {
        const close = closeButton ?? false;
        await this.expectVisible(BranchMenuLocator.showFieldQty(qty, index));
        await this.click(BranchMenuLocator.showFieldQty(qty, index));
        if (close) {
            if (await this.isVisible?.(BranchMenuLocator.backGroundPage)) {
                await this.click(BranchMenuLocator.backGroundPage);
            }
        }
    }

    async showDropdown(index: number): Promise<void> {
        await this.expectVisible(BranchMenuLocator.dropDownCheckerStation(index));
        await this.click(BranchMenuLocator.dropDownCheckerStation(index));
    }

    async selectStationInDropDown(stationName: string): Promise<void> {
        await this.expectVisible(BranchMenuLocator.selectCheckerStation(stationName));
        await this.click(BranchMenuLocator.selectCheckerStation(stationName));
    }

    async closeAfterSelectOrInput(): Promise<void> {
        await this.expectVisible(BranchMenuLocator.backGroundPage);
        await this.click(BranchMenuLocator.backGroundPage);
    }

    private qtyCache: string = ""; // untuk save value sebelumnya

    async inputQty(qtyValue: string, mode?: "replace" | "append"): Promise<void> {
        const m: "replace" | "append" = mode ?? "replace"; // default = replace
        await this.expectVisible(BranchMenuLocator.fieldQty);
        await this.click(BranchMenuLocator.fieldQty);
        let next: string;

        if (m === "append") {
            next = this.qtyCache === "0" ? qtyValue : this.qtyCache + qtyValue;
        } else {
            next = qtyValue;
        }
        await this.fill(BranchMenuLocator.fieldQty, next);
        this.qtyCache = next;
    }

    async clickFlagSoldOut(index: number, times?: number): Promise<void> {
        const repeat = times ?? 1;
        await this.expectVisible(BranchMenuLocator.flagSoldOut(index));
        for (let i = 0; i < repeat; i++) {
            await this.click(BranchMenuLocator.flagSoldOut(index));
        }
    }

    async branchMenuPagination(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.expectVisible(BranchMenuLocator.paginationBranchMenu(type));
        await this.click(BranchMenuLocator.paginationBranchMenu(type));
    }

    async saveBranchMenu(): Promise<void> {
        await this.expectVisible(BranchMenuLocator.saveBranchMenu);
        await this.click(BranchMenuLocator.saveBranchMenu);
        await this.waitForResponse("/branch-menu/save");
        await this.waitForResponse("/branch-menu");
        await this.click(BranchMenuLocator.closePopUpAfterSave);
    }


}