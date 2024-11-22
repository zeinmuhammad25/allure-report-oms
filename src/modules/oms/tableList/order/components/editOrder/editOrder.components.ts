import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import EditOrderScenario from "./editOrder.scenario";
import EditOrderLocator from "./editOrder.locator";

export default class EditOrderComponents extends BaseOmsPage implements EditOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async editQtyInput(qtyMenu: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputQtyMenu);
        await this.click(EditOrderLocator.inputQtyMenu);
        await this.fill(EditOrderLocator.inputQtyMenu, qtyMenu);
    }

    async editQtySelector(qtySelect: number): Promise<void> {
        await this.expectVisible(EditOrderLocator.qtyMenu(1));
        await this.expectVisible(EditOrderLocator.qtyMenu(2));
        await this.click(EditOrderLocator.qtyMenu(qtySelect));
    }

    async inputNotesMenu(notesMenu: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputNotesMenu);
        await this.click(EditOrderLocator.inputNotesMenu);
        await this.fill(EditOrderLocator.inputNotesMenu, notesMenu);
    }

    async applyPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.getLocatorPromotionName(promotionName));
        await this.click(EditOrderLocator.getLocatorPromotionName(promotionName));
    }

    async searchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.searchPromotionMenu);
        await this.click(EditOrderLocator.searchPromotionMenu);
        await this.fill(EditOrderLocator.searchPromotionMenu, promotionName);
    }

    async searchPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.searchMenuPackage);
        await this.click(EditOrderLocator.searchMenuPackage);
        await this.fill(EditOrderLocator.searchMenuPackage, menuName);
    }

    async actionButtonFooter(actionName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.getLocatorActionButtonFooter(actionName));
        await this.click(EditOrderLocator.getLocatorActionButtonFooter(actionName));
    }

    async actionPlusPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonPlusMenu(menuName));
        await this.click(EditOrderLocator.buttonPlusMenu(menuName));
    }

    async actionMinusPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonMinusMenu(menuName));
        await this.click(EditOrderLocator.buttonMinusMenu(menuName));
    }

    async escapeKeyboard(): Promise<void> {
        await this.expectVisible(EditOrderLocator.escapeKeyboard);
        await this.click(EditOrderLocator.escapeKeyboard);
    }

    async selectMenuExtraCategory(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.selectMenuExtraCategory(menuName));
        await this.click(EditOrderLocator.selectMenuExtraCategory(menuName));
    }

    async selectMenuExtra(menuName: string, qty?: number): Promise<void> {
        await this.expectVisible(EditOrderLocator.selectMenuExtra(menuName));
        if (typeof qty === "number") {
            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderLocator.selectMenuExtra(menuName));
                await this.wait(200);
            }
        } else {
            await this.click(EditOrderLocator.selectMenuExtra(menuName));
        }
    }

    async inputNotesMenuInvisible(): Promise<void> {
        await this.expectInvisible(EditOrderLocator.inputNotesMenu);
        await this.expectTextInvisible("Input notes not found", true);
    }

    async inputPriceMenu(price: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputPrice);
        await this.click(EditOrderLocator.inputPrice);
        await this.fill(EditOrderLocator.inputPrice, price);
    }

    async inputCustomMenuName(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputCustomMenuOpenPrice);
        await this.click(EditOrderLocator.inputCustomMenuOpenPrice);
        await this.fill(EditOrderLocator.inputCustomMenuOpenPrice, menuName);

    }

    async inputNotesOpenPrice(notes: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputNotesMenuOpenPrice);
        await this.click(EditOrderLocator.inputNotesMenuOpenPrice);
        await this.fill(EditOrderLocator.inputNotesMenuOpenPrice, notes);

    }

}

