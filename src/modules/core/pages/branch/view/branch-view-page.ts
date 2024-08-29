import Element from "../../../../../base/objects/Element";
import BaseCorePage from "../../../base/base-core-page";
import BaseCorePaginationPage from "../../../base/base-core-pagination-page";
import {CoreAction} from "../../../objects/CoreAction";
import {
    CoreFilter,
    CoreFilterActions,
    CoreFilterInput,
    CoreFilterNumber,
    CoreFilterSelect
} from "../../../objects/CoreFilter";
import CurrencyViewLocator from "../../currency/view/currency-view-locator";
import BranchViewLocator from "./branch-view-locator";

export default class BranchViewPage extends BaseCorePaginationPage {

    pageUrl = (): string => this.urls.get.master.branch.view;

    protected wCode = "w1";

    withActions(): CoreAction[] {
        return [];
    }

    withFilters(): CoreFilter[] {
        return [
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
    }

    shouldHave(): Element[] {
        return [];
    }

}