import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";
import PromoCodeScenario from "./promoCode.scenario";
import PromoCodeLocator from "./promoCode.locator";


export default class PromoCodePage extends BasePosLitePage implements PromoCodeScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL =
    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromoCodeLocator.promoCodePopUp),
            Element.ofSelector(PromoCodeLocator.closeButtonPopUp),
            Element.ofSelector(PromoCodeLocator.promoCodeField),
            Element.ofSelector(PromoCodeLocator.historyPromoCodeButton),
            Element.ofSelector(PromoCodeLocator.applyPromoCodeButton),
        ];
    }


}