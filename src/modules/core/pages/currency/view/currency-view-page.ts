import Element from "../../../../../base/objects/Element";
import BaseCorePaginationPage from "../../../base/base-core-pagination-page";
import {CoreAction, CoreActionClear, CoreActionRefresh} from "../../../objects/CoreAction";
import {
    CoreFilter,
    CoreFilterActions,
    CoreFilterInput,
    CoreFilterNumber,
    CoreFilterSelect
} from "../../../objects/CoreFilter";
import CurrencyViewLocator from "./currency-view-locator";

export default class CurrencyViewPage extends BaseCorePaginationPage {

    pageUrl = (): string => this.urls.get.master.currency.view;

    shouldHave = (): Element[] => [];

    withActions = (): CoreAction[] => [
        CoreActionClear.of(CurrencyViewLocator.actionClear),
        CoreActionRefresh.of(CurrencyViewLocator.actionRefresh),
    ];

    withFilters = (): CoreFilter[] => [
        CoreFilterNumber.of(CurrencyViewLocator.inputFilterCurrencyNumber),
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencyName)
            .withTitle("Currency Name"),
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencySign),
        CoreFilterInput.of(CurrencyViewLocator.inputFilterCurrencyRate)
            .withTitle("Rate"),
        CoreFilterSelect.of(
            CurrencyViewLocator.selectFilterCurrencyActive,
            CurrencyViewLocator.selectFilterCurrencyActiveResultsContainer
        ),
        CoreFilterActions.of(CurrencyViewLocator.inputFilterCurrencyActions),
    ];


}