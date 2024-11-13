import BaseScenario from "../../../../../../base/base-scenario";

export default interface EditOrderScenario extends BaseScenario {
    editQtyInput(qtyMenu: string): Promise<void>;

    editQtySelector(qtySelect: number): Promise<void>;

    inputNotesMenu(notesMenu: string): Promise<void>;

    applyPromotionMenu(promotionName: string): Promise<void>;

    searchPromotionMenu(promotionName: string): Promise<void>;

    searchPackageItems(menuName: string): Promise<void>;

    actionButtonFooter(actionName: string): Promise<void>;

    actionPlusPackageItems(menuName: string): Promise<void>;

    actionMinusPackageItems(menuName: string): Promise<void>;
}