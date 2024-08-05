import BasePage from "../../../base/base-page";
import Element from "../../../base/objects/Element";
import PromotionScenario from "./promotion.scenario";
import PromotionLocator from "./promotion.locator";

export default class PromotionPage extends BasePage implements PromotionScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromotionLocator.salesDateField),
            Element.ofSelector(PromotionLocator.salesCompanyField),
            Element.ofSelector(PromotionLocator.salesBrandField),
            Element.ofSelector(PromotionLocator.salesBranchField),
            Element.ofSelector(PromotionLocator.reportMode),
            Element.ofSelector(PromotionLocator.promotionType),
            Element.ofSelector(PromotionLocator.promotionName),
            Element.ofSelector(PromotionLocator.transactionNumber),
            Element.ofSelector(PromotionLocator.salesViewButton),


        ];
    }


}