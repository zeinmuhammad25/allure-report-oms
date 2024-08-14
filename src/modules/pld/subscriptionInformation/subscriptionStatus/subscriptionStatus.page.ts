import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import SubscriptionStatusScenario from "./subscriptionStatus.scenario";
import SubscriptionStatusLocator from "./subscriptionStatus.locator";


export default class SubscriptionStatusPage extends BasePosLitePage implements SubscriptionStatusScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/plan/index?tabIndex=0
    shouldHave(): Element[] {
        return [
            Element.ofSelector(SubscriptionStatusLocator.mySubscriptionTab),
            Element.ofSelector(SubscriptionStatusLocator.invoicesHistoryTab),
            Element.ofSelector(SubscriptionStatusLocator.estimatePaymentBadge),
            Element.ofSelector(SubscriptionStatusLocator.balanceBadge),
            Element.ofSelector(SubscriptionStatusLocator.numberColumn),
            Element.ofSelector(SubscriptionStatusLocator.branchNameColumn),
            Element.ofSelector(SubscriptionStatusLocator.subscriptionPeriodColumn),
            Element.ofSelector(SubscriptionStatusLocator.expireDateColumn),
            Element.ofSelector(SubscriptionStatusLocator.nextExtensionPeriodColumn),
            Element.ofSelector(SubscriptionStatusLocator.nextBillingColumn),
            Element.ofSelector(SubscriptionStatusLocator.autoExtensionColumn),
            Element.ofSelector(SubscriptionStatusLocator.autoExtensionBranchColumn),
            Element.ofSelector(SubscriptionStatusLocator.autoExtensionInventoryColumn),
            Element.ofSelector(SubscriptionStatusLocator.balanceTopUpButton),
            Element.ofSelector(SubscriptionStatusLocator.addBranchButton),

        ];
    }


}