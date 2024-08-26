import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import PlatformIntegrationScenario from "./platformIntegration.scenario";
import PlatformIntegrationLocator from "./platformIntegration.locator";


export default class PlatformIntegrationPage extends BasePosLitePage implements PlatformIntegrationScenario {


    pageUrl = (): string => this.urls.get.onlinePlatform.platformIntegrationUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(PlatformIntegrationLocator.ruleOneImage),
            Element.ofSelector(PlatformIntegrationLocator.ruleTwoImage),
            Element.ofSelector(PlatformIntegrationLocator.ruleThreeImage),
            Element.ofSelector(PlatformIntegrationLocator.ruleFourImage),

        ];
    }


}