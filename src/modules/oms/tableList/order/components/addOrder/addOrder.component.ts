import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import AddOrderLocator from "./addOrder.locator";
import AddOrderScenario from "./addOrder.scenario";
import AddMenuModel from "../../addMenu.model";


export default class AddOrderComponent extends BaseOmsPage implements AddOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddOrderLocator.filedSearch),
            Element.ofSelector(AddOrderLocator.refreshButton),
            Element.ofSelector(AddOrderLocator.nextPageItemList),
            Element.ofSelector(AddOrderLocator.backPageItemList),
            Element.ofSelector(AddOrderLocator.buttonNext),
            Element.ofSelector(AddOrderLocator.buttonBack),
            Element.ofSelector(AddOrderLocator.applyButton),
            Element.ofSelector(AddOrderLocator.cancelButton)
        ];
    }

    private async menuModifier(menuOrder: AddMenuModel): Promise<void> {

        let qty: number = menuOrder.qty == "max" ? 10 : menuOrder.qty;
        if (qty < 0) {
            qty = qty * -1;

            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderLocator.buttonQtyMinusByMenu(menuOrder.menuName));
            }
        } else {
            for (let i = 0; i < qty; i++) {
                await this.click(AddOrderLocator.buttonQtyPlusByMenu(menuOrder.menuName));
            }
        }

        if (menuOrder.notes != null && menuOrder.notes != "") {
            await this.click(AddOrderLocator.buttonAddNotesByMenu(menuOrder.menuName));
            await this.click(AddOrderLocator.fieldNotes);
            await this.fill(AddOrderLocator.fieldNotes, menuOrder.notes);
            await this.expectVisible(AddOrderLocator.popUpNotes);
            await this.click(AddOrderLocator.popUpNotes);
            await this.expectVisible(AddOrderLocator.buttonApplyNotes);
            await this.click(AddOrderLocator.buttonApplyNotes);
        }
    }

    async modifyMenuDetailPackage(menuOrder: AddMenuModel[]): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < menuOrder.length; i++) {
            await this.menuModifier(menuOrder[i]);
        }
    }

    async applyMenuDetailPackage(): Promise<void> {
        await this.wait(1000);
        await this.expectVisible(AddOrderLocator.applyButton);
        await this.click(AddOrderLocator.applyButton);
        await this.wait(1000);
    }

    async cancelMenuDetailPackage(): Promise<void> {
        await this.expectVisible(AddOrderLocator.cancelButton);
        await this.click(AddOrderLocator.cancelButton);
    }

}