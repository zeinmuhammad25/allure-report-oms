import Element from "../../../../../base/objects/Element";
import BaseCorePaginationPage from "../../../base/base-core-pagination-page";
import {CoreAction} from "../../../objects/CoreAction";
import {
    CoreFilter,
    CoreFilterActions,
    CoreFilterInput,
    CoreFilterNumber,
    CoreFilterSelect
} from "../../../objects/CoreFilter";
import SupplierViewLocator from "./supplier-view-locator";
import CurrencyViewLocator from "../../currency/view/currency-view-locator";

export default class SupplierViewPage extends BaseCorePaginationPage {
    withActions = (): CoreAction[] => [];

    withFilters = (): CoreFilter[] => [
        CoreFilterNumber.of(SupplierViewLocator.inputFilterSupplierNumber),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierName),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierCode),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierDueDate),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierAddress),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierPICName),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierPICPhone),
        CoreFilterInput.of(SupplierViewLocator.inputFilterSupplierCategory),
        CoreFilterSelect.of(
            SupplierViewLocator.inputFilterSupplierActive,
            SupplierViewLocator.inputFilterSupplierActiveContainer
        ),
        CoreFilterActions.of(SupplierViewLocator.inputFilterSupplierActions),
    ];

    pageUrl = (): string => this.urls.get.master.supplier.view;

    shouldHave = (): Element[] => [];

}