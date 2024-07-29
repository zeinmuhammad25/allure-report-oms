import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import SalesSummaryScenario from "./salesSummary.scenario";
import SalesSummaryLocator from "./salesSummary.locator";


export default class SalesSummaryPage extends BasePage implements SalesSummaryScenario {


    pageUrl = (): string => Urls.salessum;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesSummaryLocator.salesdatefield),
            Element.ofSelector(SalesSummaryLocator.salescompfield),
            Element.ofSelector(SalesSummaryLocator.salesbrandfield),
            Element.ofSelector(SalesSummaryLocator.salesbranchfield),
            Element.ofSelector(SalesSummaryLocator.salesdownloadbutton),
            Element.ofSelector(SalesSummaryLocator.salesviewbutton),
        ];
    }


}