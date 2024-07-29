import BasePage from "../../base/base-page";
import Element from "../../base/objects/Element";
import Urls from "../../configs/urls";
import PromotionScenario from "./promotion.scenario";
import PromotionLocator from "./promotion.locator";

export default class PromotionPage extends BasePage implements PromotionScenario {
    pageUrl = (): string => Urls.promotion;

    shouldHave(): Element[] {
        return [
            Element.ofText("Tipe Promosi"),
            Element.ofSelector(PromotionLocator.discnotepercent),
            Element.ofSelector(PromotionLocator.discnoterupiah),
            Element.ofSelector(PromotionLocator.discmenurupiah),
            Element.ofSelector(PromotionLocator.disccustompercent),
            Element.ofSelector(PromotionLocator.discsavebutton),
            Element.ofSelector(PromotionLocator.disccancelbutton),

        ];
    }


}