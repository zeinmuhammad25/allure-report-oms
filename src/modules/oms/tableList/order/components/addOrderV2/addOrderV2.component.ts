import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import AddOrderV2Locator from "./addOrderV2.locator";
import AddOrderV2Scenario from "./addOrderV2.scenario";
import AddMenuModel from "../../addMenu.model";
import MenuList from "../../../../objects/menuList";


export default class AddOrderV2Component extends BaseOmsPage implements AddOrderV2Scenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddOrderV2Locator.plusQtyPackageHead),
            Element.ofSelector(AddOrderV2Locator.minusQtyPackageHead),
            Element.ofSelector(AddOrderV2Locator.filedSearchV2),
            Element.ofSelector(AddOrderV2Locator.nextPagePackageList),
            Element.ofSelector(AddOrderV2Locator.backPagePackageList),
            Element.ofSelector(AddOrderV2Locator.addNotesMenu),
            Element.ofSelector(AddOrderV2Locator.buttonPromotion),
            Element.ofSelector(AddOrderV2Locator.buttonCancel)
        ];
    }


    private async menuModifier(menuOrder: AddMenuModel): Promise<void> {

        let qty: number = menuOrder.qty == "max" ? 10 : menuOrder.qty;
        if (qty < 0) {
            qty = qty * -1;

            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderV2Locator.minusQtyPackageDetail(menuOrder.menuName));
            }
        } else {
            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderV2Locator.plusQtyPackageDetail(menuOrder.menuName));
            }
        }

        if (menuOrder.notes != null && menuOrder.notes != "") {
            await this.click(AddOrderV2Locator.notesDetailMenu(menuOrder.menuName));
            await this.click(AddOrderV2Locator.fieldNotesDetailMenu);
            await this.fill(AddOrderV2Locator.fieldNotesDetailMenu, menuOrder.notes);
            await this.expectVisible(AddOrderV2Locator.popUpNotesDetailMenu);
            await this.click(AddOrderV2Locator.popUpNotesDetailMenu);
            await this.expectVisible(AddOrderV2Locator.buttonApplyNotes);
            await this.click(AddOrderV2Locator.buttonApplyNotes);
        }
    }

    private async headModifier(qty: number): Promise<void> {
        if (qty < 0) {
            qty = qty * -1;

            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderV2Locator.minusQtyPackageHead);
            }
        } else {
            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderV2Locator.plusQtyPackageHead);
            }
        }
    }

    async modifyHeadPackage(qty: number[]): Promise<void> {
        for (let i = 0; i < qty.length; i++) {
            await this.headModifier(qty[i]);
        }
    }

    async modifyDetailPackage(menuOrder: AddMenuModel[]): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < menuOrder.length; i++) {
            await this.menuModifier(menuOrder[i]);
        }
    }

    async modifyExtraPackage(menuOrder: AddMenuModel[]): Promise<void> {
        for (let i = 0; i < menuOrder.length; i++) {
            await this.menuModifier(menuOrder[i]);
        }
    }


    async selectPackageGroup(groupName: string): Promise<void> {
        await this.wait(400);
        await this.expectVisible(AddOrderV2Locator.buttonSelectPackage(groupName));
        await this.click(AddOrderV2Locator.buttonSelectPackage(groupName));
    }

    async extraCategory(categoryExtra: MenuList): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.buttonSelectCategoryMenuExtra(categoryExtra));
        await this.click(AddOrderV2Locator.buttonSelectCategoryMenuExtra(categoryExtra));
    }

    async nextMoveOtherMenuDetailPackage(): Promise<void> {
        await this.wait(300);
        await this.expectVisible(AddOrderV2Locator.buttonNext);
        await this.click(AddOrderV2Locator.buttonNext);
        await this.wait(100);
    }

    async addToCartMenuDetailPackage(): Promise<void> {
        await this.wait(1000);
        await this.expectVisible(AddOrderV2Locator.buttonAddToCart);
        await this.click(AddOrderV2Locator.buttonAddToCart);
        await this.wait(1000);
    }

    async cancelMenuDetailPackage(): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.buttonCancel);
        await this.click(AddOrderV2Locator.buttonCancel);
    }

    async addPromotionMenu(): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.buttonPromotion);
        await this.click(AddOrderV2Locator.buttonPromotion);
    }

    async applyViaSearchPromotionMenu(promotionName: string): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.addOrderSearchPromotion);
        await this.click(AddOrderV2Locator.addOrderSearchPromotion);
        await this.fill(AddOrderV2Locator.addOrderSearchPromotion, promotionName);
        await this.expectVisible(AddOrderV2Locator.addOrderPromotionName(promotionName));
        await this.click(AddOrderV2Locator.addOrderPromotionName(promotionName));
        await this.expectVisible(AddOrderV2Locator.buttonApplyPromotion);
        await this.click(AddOrderV2Locator.buttonApplyPromotion);
    }

    async inputMenuNotesSingelMenu(notesSingelMenu: string): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.fieldNotesMenu);
        await this.click(AddOrderV2Locator.fieldNotesMenu);
        await this.fill(AddOrderV2Locator.fieldNotesMenu, notesSingelMenu);
        await this.click(AddOrderV2Locator.popUpNotesMenu);
    }

    async inputMenuNotesPackageHead(notesHeadPackage: string): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.addNotesMenu);
        await this.click(AddOrderV2Locator.addNotesMenu);
        await this.expectVisible(AddOrderV2Locator.fieldNotesMenu);
        await this.fill(AddOrderV2Locator.fieldNotesMenu, notesHeadPackage);
        await this.click(AddOrderV2Locator.popUpNotesMenu);
        await this.expectVisible(AddOrderV2Locator.buttonApplyNotes);
        await this.click(AddOrderV2Locator.buttonApplyNotes);
    }

    async disableInputMenuNotesSingelMenu(): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.fieldNotesMenuDisabled);
    }

    async disableInputMenuNotesPackageHead(): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.addDisabledNotesMenu);
    }

    async escapeKeyboardV2(): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.popUpAddOrder);
        await this.click(AddOrderV2Locator.popUpAddOrder);
    }

}