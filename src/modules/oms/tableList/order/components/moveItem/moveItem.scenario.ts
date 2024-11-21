import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveItemScenario extends BaseScenario {
    moveItemToSectionQuickService(): Promise<void>;

    moveItemToSectionDineIn(): Promise<void>;

    moveSelectAllItemMenu(): Promise<void>;

    moveAllMenu(menuName: string): Promise<void>;

    actionApplyMoveItem(): Promise<void>;

    actionVerifyMenuDisplay(menuName: string): Promise<void>;

    movePartialItemMenu(menuName: string): Promise<void>;

    verifyPreviousQty(menuName: string): Promise<void>;

    verifyCurrentQty(menuName: string, previousQty: number): Promise<void>;

    pagination(action: "next" | "previous"): Promise<void>;

    selectQuickService(): Promise<void>;
}