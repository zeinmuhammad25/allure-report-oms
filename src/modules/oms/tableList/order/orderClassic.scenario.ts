import BaseScenario from "../../../../base/base-scenario";

export default interface OrderClassicScenario extends BaseScenario {
    // Top Actions
    inputPhoneNumber(phoneNumber: string): Promise<void>;

    addAdditionalInfo(additionalInfo: string): Promise<void>;

    editTable(qty: number, timeOut: number): Promise<void>;

    addPromotion(): Promise<void>;

    editSalesMode(modeName: string): Promise<void>;

    applySalesMode(): Promise<void>;

    // Menu Action
    selectCategoryMenu(categoryName: string): Promise<void>;

    selectCategoryDetailMenu(categoryDetailName: string): Promise<void>;

    selectMenu(menuName: string, qty?: number): Promise<void>;

    deleteMenu(menuName: string): Promise<void>;

    // Bottom Action
    saveOrder(): Promise<void>;

    printBill(): Promise<void>;

    printChecker(): Promise<void>;


    cancelOrder(notes: string): Promise<void>;

    clickMenuDetail(menu: string): Promise<void>;

    cancelMenuAfterSave(notes: string): Promise<void>;

    confirmationCloseOrder(action: "Yes" | "No"): Promise<void>;

    confirmationClose(action: "Yes" | "No"): Promise<void>;

    validateMenuNotVisible(menu: string): Promise<void>;

    validateMenuVisible(menu: string): Promise<void>;


    cancelOrderSelectNotes(notes: string): Promise<void>;

    disabledCancelOrder(): Promise<void>;

    cancelOrderApplyDisabled(): Promise<void>;

    UndoCancelOrder(notes: string): Promise<void>;

    cancelMenuButtonIsNotVisible(menuName: string): Promise<void>;


    activateKitchenFireManagement(): Promise<void>;

    notActivateKitchenFireManagement(): Promise<void>;

    expectVisibleCustomerName(name: string): Promise<void>;


    validateQtyOrderWithMenu(menuNames: string | string[]): Promise<void>;

    validatePriceExclusiveWithSubtotal(menuNames: string[], extraPackageNames: string[]): Promise<void>;

    printNowPrintingSetting(): Promise<void>;

    printSplitPerPaxPrintingSetting(pax: number): Promise<void>;

    cancelPrintSplitPerPaxPrintingSetting(pax: number): Promise<void>;

    activatePosFilterAccess(): Promise<void>;

    activateOrderingV2(): Promise<void>;

    activatePaymentV2(): Promise<void>


    calculationBeforeDiscount(branchId: number): Promise<void>;

    calculationAfterDiscount(branchId: number): Promise<void>;

    categoryNext(categoryName: string): Promise<void>;

    goHere(): Promise<void>;

    paginationOrder(arrow: "up" | "down"): Promise<void>;

}