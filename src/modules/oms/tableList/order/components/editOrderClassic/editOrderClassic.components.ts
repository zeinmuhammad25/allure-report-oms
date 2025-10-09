import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import EditOrderScenario from "./editOrderClassic.scenario";
import EditOrderLocator from "./editOrderClassic.locator";
import EditOrderV2Locator from "../editOrderV2/editOrderV2.locator";

export default class EditOrderClassicComponents extends BaseOmsPage implements EditOrderScenario {
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
        await this.expectVisible(EditOrderLocator.promotionItemByName(promotionName));
        await this.click(EditOrderLocator.promotionItemByName(promotionName));
    }

    async searchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.fieldSearchPromotion);
        await this.click(EditOrderLocator.fieldSearchPromotion);
        await this.fill(EditOrderLocator.fieldSearchPromotion, promotionName);
    }

    async searchPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.searchMenuPackage);
        await this.click(EditOrderLocator.searchMenuPackage);
        await this.fill(EditOrderLocator.searchMenuPackage, menuName);
    }

    async actionButtonFooter(actionName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.getLocatorActionButtonFooter(actionName));
        await this.click(EditOrderLocator.getLocatorActionButtonFooter(actionName));
        await this.wait(200);
    }

    async actionPlusPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonQtyPlusByMenu (menuName));
        await this.click(EditOrderLocator.buttonQtyPlusByMenu(menuName));
    }

    async actionMinusPackageItems(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonQtyMinusByMenu(menuName));
        await this.click(EditOrderLocator.buttonQtyMinusByMenu(menuName));
    }

    async escapeKeyboard(): Promise<void> {
        await this.expectVisible(EditOrderLocator.escapeKeyboard);
        await this.click(EditOrderLocator.escapeKeyboard);
    }

    async selectMenuExtraCategory(menuName: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonMenuExtraCategory(menuName));
        await this.click(EditOrderLocator.buttonMenuExtraCategory(menuName));
    }

    async selectMenuExtra(menuName: string, qty?: number): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonMenuExtra(menuName));
        if (typeof qty === "number") {
            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderLocator.buttonMenuExtra(menuName));
                await this.wait(200);
            }
        } else {
            await this.click(EditOrderLocator.buttonMenuExtra(menuName));
        }
    }

    async inputNotesMenuInvisible(): Promise<void> {
        await this.expectInvisible(EditOrderLocator.inputNotesMenu);
        await this.expectTextInvisible("Input notes not found", true);
    }

    async inputPriceMenu(price: string): Promise<void> {
        await this.expectVisible(EditOrderLocator.inputPriceMenuOpenPrice);
        await this.click(EditOrderLocator.inputPriceMenuOpenPrice);
        await this.fill(EditOrderLocator.inputPriceMenuOpenPrice, price);
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

    async actionCancel(): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonCancel);
        await this.click(EditOrderLocator.buttonCancel);
    }

    async actionCancelV2(): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonCancelV2);
        await this.click(EditOrderLocator.buttonCancelV2);
    }

    async applyOpenPrice(): Promise<void> {
        await this.wait(100);
        await this.expectVisible(EditOrderLocator.buttonApplyMenuOpenPrice);
        await this.click(EditOrderLocator.buttonApplyMenuOpenPrice);
    }

    async cancelOpenPrice(): Promise<void> {
        await this.expectVisible(EditOrderLocator.buttonCancelMenuOpenPrice);
        await this.click(EditOrderLocator.buttonCancelMenuOpenPrice);
    }

}

