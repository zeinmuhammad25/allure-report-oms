import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import SalesSummaryScenario from "./salesSummary.scenario";
import SalesSummaryLocator from "./salesSummary.locator";


export default class SalesSummaryPage extends BasePage implements SalesSummaryScenario {


    pageUrl = (): string => Urls.salessum;

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