import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import BusinessTipsScenario from "./businessTips.scenario";
import BusinessTipsLocator from "./businessTips.locator";


export default class BusinessTipsPage extends BasePosLitePage implements BusinessTipsScenario {
    pageUrl = (): string => this.urls.get.dashboard.onlinePaymentUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BusinessTipsLocator.businessTipsTittle),
            Element.ofSelector(BusinessTipsLocator.businessTipsFooter),
        ];
    }


}