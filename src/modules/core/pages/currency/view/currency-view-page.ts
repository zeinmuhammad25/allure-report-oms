import Element from "../../../../../base/objects/Element";
import BaseCorePaginationPage from "../../../base/base-core-pagination-page";
import {CoreFilter, CoreFilterInput, CoreFilterSelect} from "../../../objects/CoreFilter";
import CurrencyViewLocator from "./currency-view-locator";

export default class CurrencyViewPage extends BaseCorePaginationPage {

    pageUrl = (): string => this.urls.get.master.currency.view;

    shouldHave = (): Element[] => [];

    withFilters = (): CoreFilter[] => [
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencyName)
            .withTitle("Currency Name"),
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencyRate)
            .withTitle("Rate"),
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencySign),
        CoreFilterSelect.of(
            CurrencyViewLocator.selectFilterCurrencyActive,
            CurrencyViewLocator.selectFilterCurrencyActiveResultsContainer
        ),
    ];


}