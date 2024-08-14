import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ReportPromotionScenario from "./reportPromotion.scenario";
import ReportPromotionLocator from "./reportPromotion.locator";

export default class ReportPromotionPage extends BasePosLitePage implements ReportPromotionScenario {


    pageUrl = (): string => '';

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReportPromotionLocator.salesDateField),
            Element.ofSelector(ReportPromotionLocator.salesCompanyField),
            Element.ofSelector(ReportPromotionLocator.salesBrandField),
            Element.ofSelector(ReportPromotionLocator.salesBranchField),
            Element.ofSelector(ReportPromotionLocator.reportMode),
            Element.ofSelector(ReportPromotionLocator.promotionType),
            Element.ofSelector(ReportPromotionLocator.promotionName),
            Element.ofSelector(ReportPromotionLocator.transactionNumber),
            Element.ofSelector(ReportPromotionLocator.salesViewButton),


        ];
    }


}