import Element from "../../../base/objects/Element";
import PromotionScenario from "./promotion.scenario";
import PromotionLocator from "./promotion.locator";
import BasePosLitePage from "../base-pos-lite-page";

export default class PromotionPage extends BasePosLitePage implements PromotionScenario {
    pageUrl = (): string => this.urls.get.promotion.promotionUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromotionLocator.promotionStatusDropdown),
            Element.ofSelector(PromotionLocator.promotionSearchByName),
            Element.ofSelector(PromotionLocator.promotionTypeDropdown),
            Element.ofSelector(PromotionLocator.promotionStartDateDropdown),
            Element.ofSelector(PromotionLocator.promotionEndDateDropdown),

        ];
    }


}