import BasePage from "../../../../base/base-page";
import Element from "../../../../base/objects/Element";
import Urls from "../../../../configs/urls";
import BusinessTipsScenario from "./businessTips.scenario";
import BusinessTipsLocator from "./businessTips.locator";


export default class BusinessTipsPage extends BasePosLitePage implements BusinessTipsScenario {
    pageUrl = (): string => Urls.dashboard;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(BusinessTipsLocator.businessTipsTittle),
            Element.ofSelector(BusinessTipsLocator.businessTipsFooter),
        ];
    }


}