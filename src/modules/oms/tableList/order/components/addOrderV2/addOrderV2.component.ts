import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import AddOrderV2Locator from "./addOrderV2.locator";
import AddOrderV2Scenario from "./addOrderV2.scenario";
import AddMenuModel from "../../addMenu.model";


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

    async selectPackageGroup(groupName: string): Promise<void> {
        await this.expectVisible(AddOrderV2Locator.buttonSelectPackage(groupName));
        await this.click(AddOrderV2Locator.buttonSelectPackage(groupName));
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

}