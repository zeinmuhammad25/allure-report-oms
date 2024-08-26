import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import SpecialPriceScenario from "./specialPrice.scenario";
import SpecialPriceLocator from "./specialPrice.locator";

export default class SpecialPricePage extends BasePosLitePage implements SpecialPriceScenario {


    pageUrl = (): string => this.urls.get.catalogue.specialPriceUrl;


    shouldHave(): Element[] {
        return [
            Element.ofSelector(SpecialPriceLocator.guideButton),
            Element.ofSelector(SpecialPriceLocator.addSpecialPrice),
            Element.ofSelector(SpecialPriceLocator.startDateSearch),
            Element.ofSelector(SpecialPriceLocator.endDateSearch),
            Element.ofSelector(SpecialPriceLocator.menuBookSearch),
            Element.ofSelector(SpecialPriceLocator.statusSearch),
            Element.ofSelector(SpecialPriceLocator.startDateColumn),
            Element.ofSelector(SpecialPriceLocator.endDateColumn),
            Element.ofSelector(SpecialPriceLocator.menuBookColumn),
            Element.ofSelector(SpecialPriceLocator.statusNameColumn),

        ];
    }


}