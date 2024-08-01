import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import SalesModeScenario from "./salesMode.scenario";
import SalesModeLocator from "./salesMode.locator";


export default class SalesModePage extends BasePage implements SalesModeScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/sales-mode/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesModeLocator.archiveButton),
            Element.ofSelector(SalesModeLocator.addSalesModeButton),
            Element.ofSelector(SalesModeLocator.branchNameSearch),
            Element.ofSelector(SalesModeLocator.salesModeSearch),
            Element.ofSelector(SalesModeLocator.salesModeNameColumn),
            Element.ofSelector(SalesModeLocator.salesModeBranchColumn),

        ];
    }


}