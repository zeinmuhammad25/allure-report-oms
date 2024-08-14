import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import TopUpBalanceScenario from "./topUpBalance.scenario";
import TopUpBalanceLocator from "./topUpBalance.locator";


export default class TopUpBalancePage extends BasePosLitePage implements TopUpBalanceScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/account-balance/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(TopUpBalanceLocator.inputBalanceAmount),
            Element.ofSelector(TopUpBalanceLocator.option100KAmount),
            Element.ofSelector(TopUpBalanceLocator.topUpBalanceButton),
            Element.ofSelector(TopUpBalanceLocator.paymentHistoryDateFilter),
            Element.ofSelector(TopUpBalanceLocator.allTransactionButton),
            Element.ofSelector(TopUpBalanceLocator.paymentTransactionButton),
            Element.ofSelector(TopUpBalanceLocator.topUpBalanceTransactionButton),

        ];
    }


}