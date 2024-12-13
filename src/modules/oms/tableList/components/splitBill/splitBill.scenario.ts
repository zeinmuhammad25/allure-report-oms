import BaseScenario from "../../../../../base/base-scenario";

export default interface SplitBillScenario extends BaseScenario {
    setMainBillName(billName: string): Promise<void>;

    addBill(billName: string): Promise<void>;

    deleteBill(billName: string): Promise<void>;

    selectBill(billName: string): Promise<void>;

    moveMenu(toBillName: string, menuName: string, menuQty: string): Promise<void>;

    returnMenu(billName: string, menuName: string): Promise<void>;

    closeSplitBill(): Promise<void>;

    billNameVisible(billName: string): Promise<void>;

    billNameInvisible(billName: string): Promise<void>;

    moveMenuButtonInvisible(menuName: string): Promise<void>;
}