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

    async editQtyInput(qtyMenu: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editInputQty);
        await this.click(EditOrderV2Locator.editInputQty);
        await this.fill(EditOrderV2Locator.editInputQty, qtyMenu);
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
    }

    async inputMenuNotesSingelMenu(notesSingelMenu: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.fieldNotesMenu);
        await this.click(EditOrderV2Locator.fieldNotesMenu);
        await this.fill(EditOrderV2Locator.fieldNotesMenu, notesSingelMenu);
    }

    async inputMenuNotesPackageHead(notesHeadPackage: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.addNotesMenu);
        await this.click(EditOrderV2Locator.addNotesMenu);
        await this.expectVisible(EditOrderV2Locator.addNotesMenu);
        await this.fill(EditOrderV2Locator.fieldNotesMenu, notesHeadPackage);
        await this.click(EditOrderV2Locator.popUpNotesMenu);
        await this.expectVisible(EditOrderV2Locator.buttonApplyNotes);
        await this.click(EditOrderV2Locator.buttonApplyNotes);
    }

    async editSelectPackageGroup(groupName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.buttonEditSelectPackage(groupName));
        await this.click(EditOrderV2Locator.buttonEditSelectPackage(groupName));
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

    async addPromotionMenu(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.buttonPromotion);
        await this.click(EditOrderV2Locator.buttonPromotion);
    }

    async applyViaSearchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.editOrderSearchPromotion);
        await this.click(EditOrderV2Locator.editOrderSearchPromotion);
        await this.fill(EditOrderV2Locator.editOrderSearchPromotion, promotionName);
        await this.expectVisible(EditOrderV2Locator.buttonApplyPromotion);
        await this.click(EditOrderV2Locator.buttonApplyPromotion);
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
        await this.expectVisible(EditOrderV2Locator.applyOpenPrice);
        await this.click(EditOrderV2Locator.applyOpenPrice);
    }

    async cancelOpenPrice(): Promise<void> {
        await this.expectVisible(EditOrderV2Locator.cancelOpenPrice);
        await this.click(EditOrderV2Locator.cancelOpenPrice);
    }

}