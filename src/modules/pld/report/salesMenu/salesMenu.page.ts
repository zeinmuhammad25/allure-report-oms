import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesMenuScenario from "./salesMenu.scenario";
import SalesMenuLocator from "./salesMenu.locator";


export default class SalesMenuPage extends BasePosLitePage implements SalesMenuScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofText("Laporan Penjualan Menu"),
            Element.ofSelector(SalesMenuLocator.salesDateField),
            Element.ofSelector(SalesMenuLocator.businessField),
            Element.ofSelector(SalesMenuLocator.businessFieldClear),
            Element.ofSelector(SalesMenuLocator.businessSearchField),
            Element.ofSelector(SalesMenuLocator.reportTypeDropdown),

        ];
    }


}