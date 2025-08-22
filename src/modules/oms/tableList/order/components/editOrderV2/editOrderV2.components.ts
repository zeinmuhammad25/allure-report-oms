import BaseOmsPage from "../../../../base-oms-page";
import EditOrderV2Scenario from "./editOrderV2.scenario";
import Element from "../../../../../../base/objects/Element";
import EditOrderV2Locator from "./editOrderV2.locator";
import AddMenuModel from "../../addMenu.model";

export default class EditOrderV2Components extends BaseOmsPage implements EditOrderV2Scenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(EditOrderV2Locator.editMinusQtyPackageHead),
            Element.ofSelector(EditOrderV2Locator.editPlusQtyPackageHead),
            Element.ofSelector(EditOrderV2Locator.editInputQty)
        ];
    }

    private async editMenuModifier(menuOrder: AddMenuModel): Promise<void> {

        let qty: number = menuOrder.qty == "max" ? 10 : menuOrder.qty;
        if (qty < 0) {
            qty = qty * -1;

            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderV2Locator.minusEditQtyPackageDetail(menuOrder.menuName));
            }
        } else {
            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderV2Locator.plusEditQtyPackageDetail(menuOrder.menuName));
            }
        }

        if (menuOrder.notes != null && menuOrder.notes != "") {
            await this.click(EditOrderV2Locator.notesDetailMenu(menuOrder.menuName));
            await this.click(EditOrderV2Locator.fieldNotesDetailMenu);
            await this.fill(EditOrderV2Locator.fieldNotesDetailMenu, menuOrder.notes);
            await this.expectVisible(EditOrderV2Locator.popUpNotesDetailMenu);
            await this.click(EditOrderV2Locator.popUpNotesDetailMenu);
            await this.expectVisible(EditOrderV2Locator.buttonApplyNotes);
            await this.click(EditOrderV2Locator.buttonApplyNotes);
        }
    }

    async modifyEditDetailPackage(menuOrder: AddMenuModel[]): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < menuOrder.length; i++) {
            await this.editMenuModifier(menuOrder[i]);
        }
    }

    private async editHeadModifier(qty: number): Promise<void> {
        if (qty < 0) {
            qty = qty * -1;

            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderV2Locator.editMinusQtyPackageHead);
            }
        } else {
            for (let i = 0; i < qty; i++) {
                await this.click(EditOrderV2Locator.editPlusQtyPackageHead);
            }
        }
    }

    async modifyEditHeadPackage(qty: number[]): Promise<void> {
        for (let i = 0; i < qty.length; i++) {
            await this.editHeadModifier(qty[i]);
        }
        await this.wait(300);
    }

    async editSelectPackageGroup(groupName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.buttonEditSelectPackage(groupName));
        await this.click(EditOrderV2Locator.buttonEditSelectPackage(groupName));
    }

    async editQtyInput(qtyMenu: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editInputQty);
        await this.click(EditOrderV2Locator.editInputQty);
        await this.fill(EditOrderV2Locator.editInputQty, qtyMenu);
    }

    async inputMenuNotesSingelMenu(notesSingelMenu: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.fieldNotesMenu);
        await this.click(EditOrderV2Locator.fieldNotesMenu);
        await this.fill(EditOrderV2Locator.fieldNotesMenu, notesSingelMenu);
        await this.click(EditOrderV2Locator.popUpNotesMenu);
    }

    async inputMenuNotesPackageHead(notesHeadPackage: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.addNotesMenu);
        await this.click(EditOrderV2Locator.addNotesMenu);
        await this.expectVisible(EditOrderV2Locator.fieldNotesMenu);
        await this.fill(EditOrderV2Locator.fieldNotesMenu, notesHeadPackage);
        await this.click(EditOrderV2Locator.popUpNotesMenu);
        await this.expectVisible(EditOrderV2Locator.buttonApplyNotes);
        await this.click(EditOrderV2Locator.buttonApplyNotes);
    }

    async selectSuggestionNotes(notesCategory: string, notes: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.suggestionNotes(notesCategory));
        await this.click(EditOrderV2Locator.suggestionNotes(notesCategory));
        await this.expectVisible(EditOrderV2Locator.suggestionNotes(notes));
    }

    async disableInputMenuNotesSingelMenu(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.fieldNotesMenuDisabled);
    }

    async disableInputMenuNotesPackageHead(): Promise<void> {
        await this.wait(800);
        await this.expectVisible(EditOrderV2Locator.addDisabledNotesMenu);
    }

    async disableInputMenuNotesAddedPackageHead(): Promise<void> {
        await this.wait(800);
        await this.expectVisible(EditOrderV2Locator.addDisabledNotesMenuAdded);
    }

    async addPromotionMenu(): Promise<void> {
        await this.wait(300)
        await this.expectVisible(EditOrderV2Locator.buttonPromotion);
        await this.click(EditOrderV2Locator.buttonPromotion);
    }

    async searchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editOrderSearchPromotion);
        await this.click(EditOrderV2Locator.editOrderSearchPromotion);
        await this.fill(EditOrderV2Locator.editOrderSearchPromotion, promotionName);
    }

    async clickPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editOrderPromotionName(promotionName));
        await this.click(EditOrderV2Locator.editOrderPromotionName(promotionName));
    }

    async applyPromotion(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.buttonApplyPromotion);
        await this.click(EditOrderV2Locator.buttonApplyPromotion);
    }

    async applyViaSearchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editOrderSearchPromotion);
        await this.click(EditOrderV2Locator.editOrderSearchPromotion);
        await this.fill(EditOrderV2Locator.editOrderSearchPromotion, promotionName);
        await this.expectVisible(EditOrderV2Locator.editOrderPromotionName(promotionName));
        await this.click(EditOrderV2Locator.editOrderPromotionName(promotionName));
        await this.expectVisible(EditOrderV2Locator.buttonApplyPromotion);
        await this.click(EditOrderV2Locator.buttonApplyPromotion);
        await this.wait(800)
    }

    async inputPriceMenuOpenPrice(price: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.inputPriceMenuOpenPrice);
        await this.click(EditOrderV2Locator.inputPriceMenuOpenPrice);
        await this.fill(EditOrderV2Locator.inputPriceMenuOpenPrice, price);
    }

    async inputCustomNameMenuOpenPrice(nameMenu: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.inputCustomNameMenuOpenPrice);
        await this.click(EditOrderV2Locator.inputCustomNameMenuOpenPrice);
        await this.fill(EditOrderV2Locator.inputCustomNameMenuOpenPrice, nameMenu);
    }

    async inputNoteMenuOpenPrice(valueNotes: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.inputNotesMenuOpenPrice);
        await this.click(EditOrderV2Locator.inputNotesMenuOpenPrice);
        await this.fill(EditOrderV2Locator.inputNotesMenuOpenPrice, valueNotes);
    }

    async applyOpenPrice(): Promise<void> {
        await this.wait(100);
        await this.expectVisible(EditOrderV2Locator.applyOpenPrice);
        await this.click(EditOrderV2Locator.applyOpenPrice);
    }

    async cancelOpenPrice(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.cancelOpenPrice);
        await this.click(EditOrderV2Locator.cancelOpenPrice);
    }

    async actionButtonFooter(actionName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.getLocatorActionButtonFooter(actionName));
        await this.click(EditOrderV2Locator.getLocatorActionButtonFooter(actionName));
        await this.wait(200);
    }

    async actionCancel(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.buttonCancel);
        await this.click(EditOrderV2Locator.buttonCancel);
    }

    async actionUpdate(): Promise<void> {
        await this.wait(300);
        await this.expectVisible(EditOrderV2Locator.buttonUpdate);
        await this.click(EditOrderV2Locator.buttonUpdate);
    }

    async escapeKeyboard(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.escapeKeyboard);
        await this.click(EditOrderV2Locator.escapeKeyboard);
    }

    async escapeKeyboardV2(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.popUpEditOrder);
        await this.click(EditOrderV2Locator.popUpEditOrder);
    }
}
