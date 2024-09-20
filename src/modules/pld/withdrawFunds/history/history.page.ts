import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import HistoryScenario from "./history.scenario";
import HistoryLocator from "./history.locator";


export default class HistoryPage extends BasePosLitePage implements HistoryScenario {


    pageUrl = (): string => this.urls.get.withdrawFunds.historyUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(HistoryLocator.dateFilter),
            Element.ofSelector(HistoryLocator.reportMode),
            Element.ofSelector(HistoryLocator.showReport),
            Element.ofSelector(HistoryLocator.withdrawalFundsInformation),

        ];
    }


}