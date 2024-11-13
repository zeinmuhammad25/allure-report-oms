import SplitBillScenario from "./splitBill.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";
import SplitBillLocator from "./splitBill.locator";


export default class SplitBillComponent extends BaseOmsPage implements SplitBillScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SplitBillLocator.renameBillButton),
            Element.ofSelector(SplitBillLocator.addBillButton),
            Element.ofSelector(SplitBillLocator.closeButton)
        ];
    }

    async setMainBillName(billName: string): Promise<void> {
        await this.expectVisible(SplitBillLocator.renameBillButton);
        await this.click(SplitBillLocator.renameBillButton);
        await this.expectVisible(SplitBillLocator.dialogInputNameField);
        await this.fill(SplitBillLocator.dialogInputNameField, billName);
        await this.click(SplitBillLocator.dialogInputNameApplyButton);
    }

    async addBill(billName: string): Promise<void> {
        await this.expectVisible(SplitBillLocator.addBillButton);
        await this.click(SplitBillLocator.addBillButton);
        await this.expectVisible(SplitBillLocator.dialogInputNameField);
        await this.fill(SplitBillLocator.dialogInputNameField, billName);
        await this.click(SplitBillLocator.dialogInputNameApplyButton);
    }

    async deleteBill(billName: string): Promise<void> {
        await this.selectBill(billName);
        await this.expectVisible(SplitBillLocator.deleteBillButton);
        await this.click(SplitBillLocator.deleteBillButton);
    }

    async selectBill(billName: string): Promise<void> {
        await this.expectVisible(SplitBillLocator.selectBillButton(billName));
        await this.click(SplitBillLocator.selectBillButton(billName));
    }

    async moveMenu(toBillName: string, menuName: string, menuQty: string): Promise<void> {
        await this.selectBill(toBillName);
        await this.expectVisible(SplitBillLocator.moveMenuButton(menuName));
        await this.click(SplitBillLocator.moveMenuButton(menuName));
        await this.expectVisible(SplitBillLocator.dialogSplitBillQtyField);
        await this.click(SplitBillLocator.dialogSplitBillQtyField);
        await this.fill(SplitBillLocator.dialogSplitBillQtyField, menuQty);
        await this.click(SplitBillLocator.dialogSplitBillQtyApply);
    }

    async returnMenu(billName: string, menuName: string): Promise<void> {
        await this.selectBill(billName);
        await this.expectVisible(SplitBillLocator.returnMenuButton(menuName));
        await this.click(SplitBillLocator.returnMenuButton(menuName));
        await this.waitForResponse("/order/delete-sales-menu-child");
    }

    async closeSplitBill(): Promise<void> {
        await this.expectVisible(SplitBillLocator.closeButton);
        await this.click(SplitBillLocator.closeButton);

    }

}