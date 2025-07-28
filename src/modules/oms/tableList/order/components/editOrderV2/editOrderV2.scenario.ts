import BaseScenario from "../../../../../../base/base-scenario";
import AddMenuModel from "../../addMenu.model";

export default interface EditOrderV2Scenario extends BaseScenario {

    editQtyInput(qtyMenu: string): Promise<void>;

    modifyEditHeadPackage(qty: number[]): Promise<void>;

    modifyEditDetailPackage(menuOrder: AddMenuModel[]): Promise<void>;

    inputMenuNotesSingelMenu(notesSingelMenu: string): Promise<void>;

    inputMenuNotesPackageHead(notesHeadPackage: string): Promise<void>;

    editSelectPackageGroup(groupName: string): Promise<void>;

    addPromotionMenu(): Promise<void>;

    applyViaSearchPromotionMenu(promotionName: string): Promise<void>;

    inputPriceMenuOpenPrice(price: string): Promise<void>;

    inputCustomNameMenuOpenPrice(nameMenu: string): Promise<void>;

    inputNoteMenuOpenPrice(valueNotes: string): Promise<void>;

    applyOpenPrice(): Promise<void>;

    cancelOpenPrice(): Promise<void>;

    selectSuggestionNotes(notesCategory: string, notes: string): Promise<void>;

    actionButtonFooter(actionName: string): Promise<void>;

    actionCancel(): Promise<void>;

    actionUpdate(): Promise<void>;

    escapeKeyboard(): Promise<void>;

    disableInputMenuNotesSingelMenu(): Promise<void>;

    disableInputMenuNotesPackageHead(): Promise<void>;

    escapeKeyboardV2(): Promise<void>;

    disableInputMenuNotesAddedPackageHead(): Promise<void>;

}
