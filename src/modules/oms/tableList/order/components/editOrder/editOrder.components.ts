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

    async selectMenuExtra(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.selectMenuExtra(menuName));
        await this.click(EditOrderLocator.selectMenuExtra(menuName));
    }
}

