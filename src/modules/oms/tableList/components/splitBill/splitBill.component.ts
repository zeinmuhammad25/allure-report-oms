import SplitBillScenario from "./splitBill.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class SplitBillComponent extends BaseOmsPage implements SplitBillScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async setMainBillName(billName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async addBill(billName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async deleteBill(billName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async selectBill(billName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async moveMenu(toBillName: string, menuName: string, menuQty: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async returnMenu(billName: string, menuName: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
    async closeSplitBill(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}