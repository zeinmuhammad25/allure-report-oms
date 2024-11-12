import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import MoveItemScenario from "./moveItem.scenario";

export default class MoveItemComponents extends BaseOmsPage implements MoveItemScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async moveSelectAllItemMenu(): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonSelectAll);
        await this.click(MoveItemLocator.buttonSelectAll);
    }

    async moveAllMenu(menuName: string): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonMoveAll(menuName));
        await this.click(MoveItemLocator.buttonMoveAll(menuName));
    }

    async actionApplyMoveItem(): Promise<void> {
        await this.expectVisible(MoveItemLocator.getLocatorButtonActionFooter("Apply"));
        await this.click(MoveItemLocator.getLocatorButtonActionFooter("Apply"));
        await this.click(MoveItemLocator.escapeKeyboard);
        await this.click(MoveItemLocator.buttonApplyBookTable);
    }

    async actionVerifyMenu(menuName: string): Promise<void> {
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

    async movePartialItemMenu(menuName: string): Promise<void> {
        await this.expectVisible(MoveItemLocator.buttonPlusMenu(menuName));
        await this.click(MoveItemLocator.buttonPlusMenu(menuName));
    }

    async moveItemToSectionDineIn(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async moveItemToSectionQuickService(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}