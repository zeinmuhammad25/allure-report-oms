import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesMenuScenario from "./salesMenu.scenario";
import SalesMenuLocator from "./salesMenu.locator";


export default class SalesMenuPage extends BasePosLitePage implements SalesMenuScenario {


    pageUrl = (): string => this.urls.get.report.salesMenuUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesMenuLocator.salesMenuOrderDate),
            Element.ofSelector(SalesMenuLocator.salesMenuBranchDropdown),
            Element.ofSelector(SalesMenuLocator.salesMenuViewButton),
            Element.ofSelector(SalesMenuLocator.salesMenuSoldAmount),
            Element.ofSelector(SalesMenuLocator.salesMenuReportTypeDropdown),
            Element.ofSelector(SalesMenuLocator.salesMenuCompanyDropdown),

        ];
    }


}