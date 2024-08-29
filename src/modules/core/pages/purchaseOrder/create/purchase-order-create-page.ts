import Element from "../../../../../base/objects/Element";
import BaseCorePage from "../../../base/base-core-page";
import PurchaseOrderCreateLocator from "./purchase-order-create-locator";
import Branch from "../../../objects/data/branch";
import Arrays from "../../../../../base/utils/arrays";
import assert = require("node:assert");

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

    async validateBranch(branches: Branch[]) {
        await this.click(PurchaseOrderCreateLocator.comboBoxBranch);
        await this.expectVisible(PurchaseOrderCreateLocator.comboBoxBranchResult);

        const options = await this.getLocator(PurchaseOrderCreateLocator.comboBoxBranchResult).locator('li').all();
        const branchOptions: string[] = [];
        for (const option of options) {
            branchOptions.push(await option.textContent());
        }
        branchOptions.sort();
        const branchNames = branches.filter(branches => branches.status == "Active")
            .map(branch => branch.name)
            .sort();
        assert(Arrays.equals(branchOptions, branchNames));
    }
}