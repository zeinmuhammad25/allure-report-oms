import BaseScenario from "../../../../../../base/base-scenario";
import AddMenuModel from "../../addMenu.model";


export default interface AddOrderV2Scenario extends BaseScenario {

    modifyHeadPackage(qty: number[]): Promise<void>;

    modifyDetailPackage(menuOrder: AddMenuModel[]): Promise<void>;

    selectPackageGroup(groupName: string): Promise<void>;

    nextMoveOtherMenuDetailPackage(): Promise<void>;

    addToCartMenuDetailPackage(): Promise<void>;

    cancelMenuDetailPackage(): Promise<void>;

    extraCategory(categoryExtra: string): Promise<void>;

    modifyExtraPackage(menuOrder: AddMenuModel[]): Promise<void>;

    addPromotionMenu(): Promise<void>;

    applyViaSearchPromotionMenu(promotionName: string): Promise<void>;

    inputMenuNotesSingelMenu(notesSingelMenu: string): Promise<void>;

    inputMenuNotesPackageHead(notesHeadPackage: string): Promise<void>;

    disableInputMenuNotesSingelMenu(): Promise<void>;

    disableInputMenuNotesPackageHead(): Promise<void>;

    escapeKeyboardV2(): Promise<void>;
}