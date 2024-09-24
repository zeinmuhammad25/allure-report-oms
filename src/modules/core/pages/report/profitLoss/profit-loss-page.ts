import Element from "../../../../../base/objects/Element";
import BaseCorePage from "../../../base/base-core-page";
import {Page} from "@playwright/test";
import Branch from "../../../objects/data/branch";
import assert = require("node:assert");
import Arrays from "../../../../../base/utils/arrays";

export default class ProfitLossPage extends BaseCorePage {

    constructor(page: Page) {
        super(page);
    }

    pageUrl = (): string => this.urls.get.report.profitLoss;

    shouldHave(): Element[] {
        return [];
    }

    public async validateBranch(branches: Branch[]): Promise<void> {
        await this.getLocator("div#multipleBranchIDHead")
            .locator('div')
            .locator("input.select2-search__field")
            .click();

        const options = await this.getLocator("//ul[@id='select2-branchIDHead-results']").locator('li').all();
        const branchOptions: string[] = [];
        for (const option of options) {
            branchOptions.push(await option.textContent());
        }
        branchOptions.sort();
        const branchNames = branches.map(branch => branch.name).sort();
        assert(Arrays.equals(branchOptions, branchNames));
    }
}