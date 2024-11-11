import Element from "../../../../../../base/objects/Element";
import BaseOmsPage from "../../../../base-oms-page";
import AddOrderLocator from "./addOrder.locator";
import AddOrderScenario from "./addOrder.scenario";


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

    async addOneMenuDetailPackage(menuName:string,qty:number): Promise<void> {
        await this.waitForResponse("/get-menu-package");

        for (let i = 0; i < qty; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu(menuName));
        }
        await this.click(AddOrderLocator.applyButton);

    }

    async addMultiMenuDetailPackage(): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        const clickCountPlus = 4;
        for (let i = 0; i < clickCountPlus; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Captain Morgan 200ml"));
        }
        const clickCountPlus1 = 2;
        for (let i = 0; i < clickCountPlus1; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Batavia Blended 700ml"));
        }
        const clickCountPlus2 = 2;
        for (let i = 0; i < clickCountPlus2; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Baileys Original 700ml"));
        }
        const clickCountPlus3 = 2;
        for (let i = 0; i < clickCountPlus3; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Iceland Vodka 250ml"));
        }
        await this.click(AddOrderLocator.applyButton);
    }

    // async inputNotes(notes: string): Promise<void> {
    //     await this.isVisible(AddOrderLocator.filedNotes);
    //     await this.click(AddOrderLocator.filedNotes);
    //     await this.fill(AddOrderLocator.filedNotes, notes);
    //     await this.click(AddOrderLocator.buttonApplyNotes)
    //
    // }

    async addNotesMenuDetailPackage(menuName:string,qty:number): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < qty; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu(menuName));
        }
        await this.expectVisible(AddOrderLocator.buttonAddNotesByMenu(menuName));
        await this.click(AddOrderLocator.buttonAddNotesByMenu(menuName));
        await this.expectVisible(AddOrderLocator.fieldNotes);
        await this.click(AddOrderLocator.fieldNotes);
        await this.fill(AddOrderLocator.fieldNotes,"test")
        await this.expectVisible(AddOrderLocator.popUpNotes)
        await this.click(AddOrderLocator.popUpNotes)
        await this.expectVisible(AddOrderLocator.buttonApplyNotes);
        await this.click(AddOrderLocator.buttonApplyNotes);

    }

    async minusQtyInDetailMenuPackage(menuName:string,qty:number): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < qty; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu(menuName));
        }
        await this.wait(2000);
        for (let i = 0; i < qty; i++) {
            await this.click(AddOrderLocator.buttonQtyMinusByMenu(menuName));
        }

        await this.click(AddOrderLocator.applyButton);
    }

    async addMaxQtyInOneMenuDetailPackage(menuName:string,qty:number): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        for (let i = 0; i < qty; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu(menuName));
        }
        await this.click(AddOrderLocator.applyButton);
    }

    async cancelAddMenuDetailPackage(menuName:string,qty:number): Promise<void> {
        await this.waitForResponse("/get-menu-package");
        const clickCountPlus = 4;
        for (let i = 0; i < clickCountPlus; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Captain Morgan 200ml"));
        }
        const clickCountPlus1 = 2;
        for (let i = 0; i < clickCountPlus1; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Batavia Blended 700ml"));
        }
        const clickCountPlus2 = 2;
        for (let i = 0; i < clickCountPlus2; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Baileys Original 700ml"));
        }
        const clickCountPlus3 = 2;
        for (let i = 0; i < clickCountPlus3; i++) {
            await this.click(AddOrderLocator.buttonQtyPlusByMenu("[21+] Iceland Vodka 250ml"));
        }
        await this.click(AddOrderLocator.cancelButton);
    }

}