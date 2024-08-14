import BasePage from "../../../../base/base-page";
import Urls from "../../../../configs/urls";
import Element from "../../../../base/objects/Element";

import ReasonCancelScenario from "./reasonCancel.scenario";
import ReasonCancelLocator from "./reasonCancel.locator";


export default class ReasonCancelPage extends BasePosLitePage implements ReasonCancelScenario {


    pageUrl = (): string => Urls.menu;

    // Real URL = https://dev7.esb.co.id/esb-core-lite/catalog/menu-template/index
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