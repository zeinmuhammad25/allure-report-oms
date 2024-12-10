import BaseScenario from "../../../../base/base-scenario";

export default interface OrderScenario extends BaseScenario {
    // Top Actions
    inputPhoneNumber(phoneNumber: string): Promise<void>;

    addAdditionalInfo(additionalInfo: string): Promise<void>;

    editTable(qty: number, timeOut: number): Promise<void>;

    addPromotion(): Promise<void>;

    // Menu Action
    selectCategoryMenu(categoryName: string): Promise<void>;

    selectCategoryDetailMenu(categoryDetailName: string): Promise<void>;

    selectMenu(menuName: string, qty?: number): Promise<void>;

    deleteMenu(menuName: string): Promise<void>;

    // Bottom Action
    saveOrder(): Promise<void>;

    gotoPayment(): Promise<void>;

    printBill(): Promise<void>;

    printChecker(): Promise<void>;

    mergeTable(): Promise<void>;

    moveTable(): Promise<void>;

    expectDisabledMoveTable(): Promise<void>;

    moveItem(): Promise<void>;

    linkTable(): Promise<void>;

    cancelTable(notes: string): Promise<void>;

    clickMenuDetail(menu: string): Promise<void>;

    cancelMenuAfterSave(notes: string): Promise<void>;

    confirmationCloseTable(action: "Yes" | "No"): Promise<void>;

    validateMenuNotVisible(menu: string): Promise<void>;

    disabledMergeTable(): Promise<void>;

    splitBill(): Promise<void>;

    disabledSplitBill(): Promise<void>;

    disabledLinkTable(): Promise<void>;

    validateMenuVisible(menu: string): Promise<void>;

    holdMenu(menuName: string): Promise<void>;

    fireMenu(menuName: string): Promise<void>;

    holdAllMenu(): Promise<void>;

    fireAllMenu(): Promise<void>;

    cancelTableSelectNotes(notes: string): Promise<void>;

    disabledCancelTable(): Promise<void>;

    cancelTableApplyDisabled(): Promise<void>;

    UndoCancelTable(notes: string): Promise<void>;

    cancelMenuButtonIsNotVisible(menuName: string): Promise<void>;

    tableInfo(): Promise<void>;

    detailInfoHoldTable(tableName: string): Promise<void>;

    validateMenuInHoldTable(tableName: string, menuName: string): Promise<void>;

    expectDisabledPayment(): Promise<void>;

    holdMenuButtonNotDisplayed(menuName: string): Promise<void>;

    holdAllMenuButtonNotDisplayed(): Promise<void>;

    fireMenuButtonNotDisplayed(menuName: string): Promise<void>;

    fireAllMenuButtonNotDisplayed(): Promise<void>;

    activateKitchenFireManagement(): Promise<void>;

    notActivateKitchenFireManagement(): Promise<void>;

}