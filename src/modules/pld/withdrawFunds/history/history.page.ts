import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import HistoryScenario from "./history.scenario";
import HistoryLocator from "./history.locator";


export default class HistoryPage extends BasePosLitePage implements HistoryScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/disbursement/disbursement-report-history/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(HistoryLocator.dateFilter),
            Element.ofSelector(HistoryLocator.reportMode),
            Element.ofSelector(HistoryLocator.showReport),
            Element.ofSelector(HistoryLocator.withdrawalFundsInformation),

        ];
    }


}