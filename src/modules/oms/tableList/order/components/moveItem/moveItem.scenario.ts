import BaseScenario from "../../../../../../base/base-scenario";

export default interface MoveItemScenario extends BaseScenario {
    moveItemToSectionQuickService(): Promise<void>;

    moveItemToSectionDineIn(roomName: string, tableName: string): Promise<void>;

    expectDisabledTable(roomName: string, tableName: string): Promise<void>;

    moveSelectAllItemMenu(): Promise<void>;

    deselectAllMenu(): Promise<void>;

    moveAllMenu(menuName: string): Promise<void>;

    actionApplyMoveItem(): Promise<void>;

    actionCancelMoveItem(): Promise<void>;

    actionVerifyMenuDisplay(menuName: string): Promise<void>;

    movePartialItemMenu(menuName: string, qty?: number): Promise<void>;

    moveBackPartialItemMenu(menuName: string, qty?: number): Promise<void>;

    verifyPreviousQty(menuName: string): Promise<void>;

    verifyCurrentQty(menuName: string, previousQty: number): Promise<void>;

    pagination(action: "next" | "previous"): Promise<void>;

    selectQuickService(): Promise<void>;

    expectDisabledButtonPlus(menuName: string): Promise<void>;

    expectDisabledButtonMoveAll(menuName: string): Promise<void>;
}