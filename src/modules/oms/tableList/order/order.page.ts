import Element from "../../../../base/objects/Element";
import BaseOmsPage from "../../base-oms-page";
import OrderScenario from "./order.scenario";
import OrderLocator from "./order.locator";

export default class OrderPage extends BaseOmsPage implements OrderScenario {

    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async inputPhoneNumber(phoneNumber: string): Promise<void> {
        await this.expectVisible(OrderLocator.memberPhoneButton);
        await this.click(OrderLocator.memberPhoneButton);
        await this.expectVisible(OrderLocator.memberPhoneField);
        await this.click(OrderLocator.memberPhoneField);
        await this.fill(OrderLocator.memberPhoneField, phoneNumber);
        await this.click(OrderLocator.memberPhoneApplyButton);
    }

    async addAdditionalInfo(additionalInfo: string): Promise<void> {
        await this.expectVisible(OrderLocator.additionalInfoField);
        await this.click(OrderLocator.additionalInfoField);
        await this.fill(OrderLocator.additionalInfoField, additionalInfo);
        await this.click(OrderLocator.orderPanel);
    }

    async editTable(qty: number, timeOut: number): Promise<void> {
        await this.expectVisible(OrderLocator.editTableButton);
        await this.click(OrderLocator.editTableButton);
        await this.expectVisible(OrderLocator.editTablePaxField);
        await this.click(OrderLocator.editTablePaxField);
        await this.fill(OrderLocator.editTablePaxField, qty.toString());
        await this.expectVisible(OrderLocator.editTableTimeOutField);
        await this.click(OrderLocator.editTableTimeOutField);
        await this.fill(OrderLocator.editTableTimeOutField, timeOut.toString());
        await this.click(OrderLocator.editTableButton);
    }

    async addPromotion(): Promise<void> {
        await this.expectVisible(OrderLocator.addPromotionButton);
        await this.click(OrderLocator.addPromotionButton);
    }

    async selectCategoryMenu(categoryName: string): Promise<void> {
        await this.expectVisible(OrderLocator.categoryButton(categoryName));
        await this.click(OrderLocator.categoryButton(categoryName));
    }

    async selectCategoryDetailMenu(categoryDetailName: string): Promise<void> {
        await this.expectVisible(OrderLocator.categoryButton(categoryDetailName));
        await this.click(OrderLocator.categoryButton(categoryDetailName));
    }

    async selectMenu(menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.menuButton(menuName));
        await this.click(OrderLocator.menuButton(menuName));
    }

    async deleteMenu(menuName: string): Promise<void> {
        await this.expectVisible(OrderLocator.deleteMenuButton(menuName));
        await this.click(OrderLocator.deleteMenuButton(menuName));
    }

    async saveOrder(): Promise<void> {
        await this.expectVisible(OrderLocator.saveOrderButton);
        await this.click(OrderLocator.saveOrderButton);
        await this.waitForResponse("/order");
    }

    async gotoPayment(): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.waitForResponse("/order/print-bill");
    }

    async printBill(): Promise<void> {
        await this.expectVisible(OrderLocator.printBillButton);
        await this.click(OrderLocator.printBillButton);
        await this.waitForResponse("/order/print-bill");
    }

    async printChecker(): Promise<void> {
        await this.expectVisible(OrderLocator.printCheckerButton);
        await this.click(OrderLocator.printCheckerButton);
        await this.waitForResponse("/order/print-all-checker");
    }

    async cancelTable(notes: string): Promise<void> {
        await this.expectVisible(OrderLocator.cancelTableButton);
        await this.click(OrderLocator.cancelTableButton);
        await this.expectVisible(OrderLocator.cancelReasonTextArea);
        await this.click(OrderLocator.cancelReasonTextArea);
        await this.fill(OrderLocator.cancelReasonTextArea, notes);
        await this.click(OrderLocator.cancelTablePanel);
        await this.click(OrderLocator.cancelReasonApplyButton);
    }

}