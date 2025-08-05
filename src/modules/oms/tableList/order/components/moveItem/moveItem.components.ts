import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MoveItemScenario from "./moveItem.scenario";
import MoveItemLocator from "./moveItem.locator";
import PromotionScenario from "../../../../../pld/promotion/promotion.scenario";

export default class MoveItemComponents extends BaseOmsPage implements MoveItemScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async moveItemToSectionQuickService(): Promise<void> {
        await this.expectVisible(MoveItemLocator.getLocatorDestinationTable("Quick Service"));
        await this.click(MoveItemLocator.getLocatorDestinationTable("Quick Service"));
        await this.expectVisible(MoveItemLocator.buttonNewQuickService);
        await this.click(MoveItemLocator.buttonNewQuickService);
        await this.expectVisible(MoveItemLocator.getLocatorButtonActionFooter("Next"));
        await this.click(MoveItemLocator.getLocatorButtonActionFooter("Next"));
    }

    async moveItemToSectionDineIn(roomName: string, tableName: string): Promise<void> {
        await this.expectVisible(MoveItemLocator.tableButton(roomName));
        await this.click(MoveItemLocator.tableButton(roomName));
        await this.expectVisible(MoveItemLocator.tableButton(tableName));
        await this.click(MoveItemLocator.tableButton(tableName));
        await this.expectVisible(MoveItemLocator.getLocatorButtonActionFooter("Next"));
        await this.click(MoveItemLocator.getLocatorButtonActionFooter("Next"));
    }

    async expectDisabledTable(roomName: string, tableName: string): Promise<void> {
        await this.expectVisible(MoveItemLocator.tableButton(roomName));
        await this.click(MoveItemLocator.tableButton(roomName));
        await this.expectVisible(MoveItemLocator.tableButtonDisabled(tableName));
    }

    async moveSelectAllItemMenu(): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonSelectAll);
        await this.click(MoveItemLocator.buttonSelectAll);
    }

    async deselectAllMenu(): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonDeselectAll);
        await this.click(MoveItemLocator.buttonDeselectAll);
    }

    async moveAllMenu(menuName: string): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonMoveAll(menuName));
        await this.click(MoveItemLocator.buttonMoveAll(menuName));
    }

    async actionApplyMoveItem(): Promise<void> {
        await this.expectVisible(MoveItemLocator.getLocatorButtonActionFooter("Apply"));
        await this.click(MoveItemLocator.getLocatorButtonActionFooter("Apply"));
        if (await this.isVisible(MoveItemLocator.escapeKeyboard)) {
            await this.click(MoveItemLocator.escapeKeyboard);
            await this.click(MoveItemLocator.buttonApplyBookTable);
        }
    }

    async actionCancelMoveItem(): Promise<void> {
        await this.expectVisible(MoveItemLocator.getLocatorButtonActionFooter("Cancel"));
        await this.click(MoveItemLocator.getLocatorButtonActionFooter("Cancel"));
    }

    async actionVerifyMenuDisplay(menuName: string): Promise<void> {
        await this.wait(5000);
        const buttonYes = await this.isVisible(MoveItemLocator.buttonYes);
        if (buttonYes) {
            console.log("Yes button is visible, click Yes button");
            await this.expectVisible(MoveItemLocator.buttonYes);
            await this.click(MoveItemLocator.buttonYes);
            await this.expectTextVisible("QUICK SERVICE", true);
        } else {
            const isMenuNameVisible = await this.isVisible(MoveItemLocator.verifyMenu(menuName));
            if (isMenuNameVisible) {
                throw new Error(`Menu ${menuName} is still visible on the screen after the operation.`);
            }
            await this.expectVisible(MoveItemLocator.buttonSaveOrder);
            await this.click(MoveItemLocator.buttonSaveOrder);
            await this.expectTextVisible("Select Payment Method", true);
        }
    }

    async movePartialItemMenu(menuName: string, qty?: number): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonPlusMenu(menuName));
        if (typeof qty === "number" && qty > 0) {
            for (let i = 0; i < qty; i++) {
                await this.click(MoveItemLocator.buttonPlusMenu(menuName));
            }
        } else {
            await this.click(MoveItemLocator.buttonPlusMenu(menuName));
        }
    }

    async moveBackPartialItemMenu(menuName: string, qty?: number): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonMinusMenu(menuName));
        if (typeof qty === "number" && qty > 0) {
            for (let i = 0; i < qty; i++) {
                await this.click(MoveItemLocator.buttonMinusMenu(menuName));
            }
        } else {
            await this.click(MoveItemLocator.buttonMinusMenu(menuName));
        }
    }

    async verifyPreviousQty(menuName: string): Promise<void> {
        const locator = MoveItemLocator.verifyQtyMenu(menuName);
        await this.expectVisible(locator);
        const isQtyVisible = await this.isVisible(locator);
        if (!isQtyVisible) {
            throw new Error(`Quantity menu element for menu "${menuName}" is not visible.`);
        }
    }

    async verifyCurrentQty(menuName: string, previousQty: number): Promise<void> {
        const locator = MoveItemLocator.verifyQtyMenu(menuName);
        await this.expectVisible(locator);
        await this.wait(5000);
        const qtyText = await this.getLocator(locator).innerText();
        const currentQty = parseInt(qtyText.trim(), 10);
        if (currentQty === previousQty) {
            throw new Error(`Menu quantity for "${menuName}" did not decrease. Still shows ${currentQty}.`);
        } else {
            console.log(`Menu quantity for "${menuName}" successfully reduced from ${previousQty} to ${currentQty}.`);
        }
    }

    async pagination(action: "next" | "previous"): Promise<void> {
        await this.expectVisible(MoveItemLocator.paginationButtons(action));
        await this.click(MoveItemLocator.paginationButtons(action));
    }

    async selectQuickService(): Promise<void> {
        await this.expectVisible(MoveItemLocator.getLocatorDestinationTable("Quick Service"));
        await this.click(MoveItemLocator.getLocatorDestinationTable("Quick Service"));
    }

    async expectDisabledButtonPlus(menuName:string):Promise<void>{
        await this.expectVisible(MoveItemLocator.disableButtonPlusMenu(menuName))
        console.warn(`Validation passed: Button Plus Disabled in Menu ${menuName}.`);
    }

    async expectDisabledButtonMoveAll(menuName:string):Promise<void>{
        await this.expectVisible(MoveItemLocator.disableButtonMoveAll(menuName))
        console.warn(`Validation passed: Button MoveAll Disabled in Menu ${menuName}.`);
    }
}