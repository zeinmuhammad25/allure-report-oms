import Element from "../../../base/objects/Element";
import PromotionScenario from "./promotion.scenario";
import PromotionLocator from "./promotion.locator";
import BasePosLitePage from "../base-pos-lite-page";

export default class PromotionPage extends BasePosLitePage implements PromotionScenario {
    pageUrl = (): string => this.urls.get.promotion.promotionUrl;

    shouldHave(): Element[] {
        return [
            Element.ofText("Tipe Promosi"),
            Element.ofSelector(PromotionLocator.discPercent),
            Element.ofSelector(PromotionLocator.discNoteRupiah),
            Element.ofSelector(PromotionLocator.discMenuRupiah),
            Element.ofSelector(PromotionLocator.discCustomPercent),
            Element.ofSelector(PromotionLocator.discSaveButton),
            Element.ofSelector(PromotionLocator.discCancelButton),
            Element.ofSelector(PromotionLocator.discNameField),
            Element.ofSelector(PromotionLocator.discDiscField),
            Element.ofSelector(PromotionLocator.discBranchField),
            Element.ofSelector(PromotionLocator.discPercentField),
            Element.ofSelector(PromotionLocator.minTransField),
            Element.ofSelector(PromotionLocator.maxDiscField),
            Element.ofSelector(PromotionLocator.paymentMethodField),

        ];
    }


}