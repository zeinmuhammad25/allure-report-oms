import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesModeScenario from "./salesMode.scenario";
import SalesModeLocator from "./salesMode.locator";


export default class SalesModePage extends BasePosLitePage implements SalesModeScenario {


    pageUrl = (): string => this.urls.get.catalogue.salesModeUrl;


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