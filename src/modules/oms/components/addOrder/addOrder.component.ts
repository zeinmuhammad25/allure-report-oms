import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import AddOrderLocator from "./addOrder.locator";
import addOrderScenario from "./addOrder.scenario";

export default class AddOrderComponent extends BaseOmsPage implements addOrderScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(AddOrderLocator.buttonPackage("ISIAN PAKET MAHAL")),
            Element.ofSelector(AddOrderLocator.filedSearch),
            Element.ofSelector(AddOrderLocator.refreshButton),
            Element.ofSelector(AddOrderLocator.nextPageItemList),
            Element.ofSelector(AddOrderLocator.backPageItemList),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Bombay Sapphire Dry Gin")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Gilbeys Whisky 350ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Sababay White Velvet 750")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Batavia Blended 700ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Baileys Original 700ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Captain Morgan 200ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyPlusByMenu("[21+] Iceland Vodka 250ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Bombay Sapphire Dry Gin")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Gilbeys Whisky 350ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Sababay White Velvet 750")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Batavia Blended 700ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Baileys Original 700ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Captain Morgan 200ml")),
            Element.ofSelector(AddOrderLocator.buttonQtyMinusByMenu("[21+] Iceland Vodka 250ml")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Bombay Sapphire Dry Gin")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Gilbeys Whisky 350ml")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Sababay White Velvet 750")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Batavia Blended 700ml")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Baileys Original 700ml")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Captain Morgan 200ml")),
            Element.ofSelector(AddOrderLocator.buttonAddNotesByMenu("[21+] Iceland Vodka 250ml")),
            Element.ofSelector(AddOrderLocator.buttonNextOrBackInPopupAddOrder("Next")),
            Element.ofSelector(AddOrderLocator.buttonNextOrBackInPopupAddOrder("Back")),
            Element.ofSelector(AddOrderLocator.applyButton),
            Element.ofSelector(AddOrderLocator.CancelButton)
        ];
    }

    async userAddOneMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userAddMultiMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userAddNotesMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userMinusQtyInDetailMenuPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async userAddMakQtyInOneMenuDetailPackage(): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async useraddMenuDetailPackageViaSearch(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}