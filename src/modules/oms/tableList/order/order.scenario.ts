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

    selectMenu(menuName: string): Promise<void>;

    deleteMenu(menuName: string): Promise<void>;

    // Bottom Action
    saveOrder(): Promise<void>;

    gotoPayment(): Promise<void>;

    printBill(): Promise<void>;

    printChecker(): Promise<void>;

    cancelTable(notes: string): Promise<void>;

}