import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import RemainingFundsScenario from "./remainingFunds.scenario";
import RemainingFundsLocator from "./remainingFunds.locator";


export default class RemainingFundsPage extends BasePage implements RemainingFundsScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/disbursement/disbursement-report/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(RemainingFundsLocator.incomeSummaryTab),
            Element.ofSelector(RemainingFundsLocator.incomeListTab),
            Element.ofSelector(RemainingFundsLocator.withdrawalFundsInformation),
            Element.ofSelector(RemainingFundsLocator.currentBalanceCard),
            Element.ofSelector(RemainingFundsLocator.lastWithdrawalBalanceCard),
            Element.ofSelector(RemainingFundsLocator.incomeTitle),
            Element.ofSelector(RemainingFundsLocator.salesIncomeValue),
            Element.ofSelector(RemainingFundsLocator.referralIncomeValue),
            Element.ofSelector(RemainingFundsLocator.incomeTotalInIncomeCard),
            Element.ofSelector(RemainingFundsLocator.outcomeTitle),
            Element.ofSelector(RemainingFundsLocator.mdrOutcomeValue),
            Element.ofSelector(RemainingFundsLocator.deliveryFeeValue),
            Element.ofSelector(RemainingFundsLocator.esoFeeValue),
            Element.ofSelector(RemainingFundsLocator.platformFeeValue),
            Element.ofSelector(RemainingFundsLocator.promotionValue),
            Element.ofSelector(RemainingFundsLocator.outcomeTotalInOutcomeCard),
            Element.ofSelector(RemainingFundsLocator.balanceCanBeWithdrawnTitle),
            Element.ofSelector(RemainingFundsLocator.incomeTotalValue),
            Element.ofSelector(RemainingFundsLocator.outcomeTotalValue),
            Element.ofSelector(RemainingFundsLocator.balanceCanBeWithdrawnValue),
        ];
    }


}