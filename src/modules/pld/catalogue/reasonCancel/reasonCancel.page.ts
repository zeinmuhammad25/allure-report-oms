import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";

import ReasonCancelScenario from "./reasonCancel.scenario";
import ReasonCancelLocator from "./reasonCancel.locator";


export default class ReasonCancelPage extends BasePosLitePage implements ReasonCancelScenario {


    pageUrl = (): string => this.urls.get.catalogue.reasonCancelUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReasonCancelLocator.addCancelDescriptionButton),
            Element.ofSelector(ReasonCancelLocator.cancelDescriptionTab),
            Element.ofSelector(ReasonCancelLocator.cancelDescriptionColumn),
            Element.ofSelector(ReasonCancelLocator.statusNameColumn),
            Element.ofSelector(ReasonCancelLocator.cancelDescriptionSearch),
            Element.ofSelector(ReasonCancelLocator.statusSearch),

        ];
    }


}