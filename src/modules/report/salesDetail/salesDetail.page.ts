import BasePage from "../../../base/base-page";
import Urls from "../../../configs/urls";
import Element from "../../../base/objects/Element";
import SalesDetailScenario from "./salesDetail.scenario";
import SalesDetailLocator from "./salesDetail.locator";


export default class SalesDetailPage extends BasePage implements SalesDetailScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(SalesDetailLocator.salesDateField),
            Element.ofSelector(SalesDetailLocator.salesCompanyField),
            Element.ofSelector(SalesDetailLocator.salesBrandField),
            Element.ofSelector(SalesDetailLocator.salesBranchField),
            Element.ofSelector(SalesDetailLocator.salesMode),
            Element.ofSelector(SalesDetailLocator.salesType),
            Element.ofSelector(SalesDetailLocator.paymentMethod),
            Element.ofSelector(SalesDetailLocator.transactionNumber),
            Element.ofSelector(SalesDetailLocator.cashierName),
            Element.ofSelector(SalesDetailLocator.salesViewButton),
            Element.ofSelector(SalesDetailLocator.salesDownloadButton),


        ];
    }


}