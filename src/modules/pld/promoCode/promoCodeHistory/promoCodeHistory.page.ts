import BasePosLitePage from "../../base-pos-lite-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import PromoCodeHistoryScenario from "./promoCodeHistory.scenario";
import PromoCodeHistoryLocator from "./promoCodeHistory.locator";


export default class PromoCodeHistoryPage extends BasePosLitePage implements PromoCodeHistoryScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/promotion-reward/index
    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromoCodeHistoryLocator.codePromoInputButton),
            Element.ofSelector(PromoCodeHistoryLocator.startDateSearch),
            Element.ofSelector(PromoCodeHistoryLocator.endDateSearch),
            Element.ofSelector(PromoCodeHistoryLocator.promoCodeNameSearch),
            Element.ofSelector(PromoCodeHistoryLocator.statusSearch),
            Element.ofSelector(PromoCodeHistoryLocator.promoNameColumn),
            Element.ofSelector(PromoCodeHistoryLocator.promoCodeColumn),
            Element.ofSelector(PromoCodeHistoryLocator.benefitColumn),
            Element.ofSelector(PromoCodeHistoryLocator.startDateColumn),
            Element.ofSelector(PromoCodeHistoryLocator.endDateColumn),
            Element.ofSelector(PromoCodeHistoryLocator.statusNameColumn),
        ];
    }


}