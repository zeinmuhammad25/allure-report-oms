import Element from "../../../../../base/objects/Element";
import BaseCorePage from "../../../base/base-core-page";
import BaseCorePaginationPage from "../../../base/base-core-pagination-page";
import {CoreAction, CoreActionClear, CoreActionRefresh} from "../../../objects/CoreAction";
import {
    CoreFilter,
    CoreFilterActions,
    CoreFilterInput,
    CoreFilterNumber,
    CoreFilterSelect
} from "../../../objects/CoreFilter";
import CurrencyViewLocator from "../../currency/view/currency-view-locator";
import BranchViewLocator from "./branch-view-locator";
import Branch from "../../../objects/data/branch";

export default class BranchViewPage extends BaseCorePaginationPage {

    pageUrl = (): string => this.urls.get.master.branch.view;

    protected wCode = "w1";

    withActions = (): CoreAction[] => [
        CoreActionClear.of(BranchViewLocator.actionRefresh),
    ];

    withFilters = (): CoreFilter[] => [
        CoreFilterNumber.of(BranchViewLocator.inputFilterBranchNumber),
        CoreFilterInput.of(BranchViewLocator.inputFilterBranchName),
        CoreFilterInput.of(BranchViewLocator.inputFilterBranchCodeName),
        CoreFilterSelect.of(BranchViewLocator.selectFilterBranchType, BranchViewLocator.selectFilterBranchTypeResultsContainer),
        CoreFilterSelect.of(BranchViewLocator.selectFilterBranchBrand, BranchViewLocator.selectFilterBranchBrandResultsContainer),
        CoreFilterNumber.of(BranchViewLocator.inputFilterBranchAddressName),
        CoreFilterInput.of(BranchViewLocator.inputFilterBranchPhoneName),
        CoreFilterInput.of(BranchViewLocator.inputFilterBranchOMSVersionName),
        CoreFilterSelect.of(BranchViewLocator.selectFilterBranchActive, BranchViewLocator.selectFilterBranchActiveResultsContainer),
        CoreFilterActions.of(BranchViewLocator.inputFilterBranchActions),
    ];

    shouldHave(): Element[] {
        return [];
    }

    public async getBranchData(): Promise<Branch[]> {
        await CoreFilterSelect.of(
            BranchViewLocator.selectFilterBranchActive,
            BranchViewLocator.selectFilterBranchActiveResultsContainer
        ).click(this, 0);
        await this.wait(600);
        await this.doScraping();
        const result: Promise<Branch[]> = new Promise(resolve => {
            const branches: Branch[] = [];
            for (const row of this.rows) {
                branches.push(new Branch(row.getItem(1).content, row.getItem(8).content));
            }
            resolve(branches);
        })
        await CoreActionClear.of(BranchViewLocator.actionRefresh).click(this);
        return result.then(async value => {
            await CoreActionClear.of(BranchViewLocator.actionRefresh).click(this);
            return value;
        });
    }
}