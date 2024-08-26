import Element from "../../../../base/objects/Element";
import BaseCorePage from "../../base-core-page";
import PurchaseOrderCreateLocator from "./purchase-order-create-locator";

export default class PurchaseOrderCreatePage extends BaseCorePage {
    pageUrl = (): string => this.urls.get.purchaseOrder.create;

    shouldHave = (): Element[] => [
        // Element.ofText("Create Purchase - New"),
        // Element.ofText("Transaction Information"),
    ];

    public async performFieldValidation() {
        await this.click(PurchaseOrderCreateLocator.comboBoxBranch);
        await this.expectVisible(PurchaseOrderCreateLocator.comboBoxBranchResult);
        await this.click(PurchaseOrderCreateLocator.comboBoxBranch);
        await this.expectInvisible(PurchaseOrderCreateLocator.comboBoxBranchResult);
        // await this.wait(20000);
    }
}