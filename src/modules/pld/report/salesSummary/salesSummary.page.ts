import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SalesSummaryScenario from "./salesSummary.scenario";
import SalesSummaryLocator from "./salesSummary.locator";


export default class SalesSummaryPage extends BasePosLitePage implements SalesSummaryScenario {


    pageUrl = (): string => this.urls.get.report.salesSummaryUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesSummaryLocator.salesDateField),
            Element.ofSelector(SalesSummaryLocator.salesCompanyField),
            Element.ofSelector(SalesSummaryLocator.salesBrandField),
            Element.ofSelector(SalesSummaryLocator.salesBranchField),
            Element.ofSelector(SalesSummaryLocator.salesDownloadButton),
            Element.ofSelector(SalesSummaryLocator.salesViewButton),
        ];
    }


}