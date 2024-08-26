import BasePosLitePage from "../../base-pos-lite-page";
import Element from "../../../../base/objects/Element";
import ReasonCancelScenario from "./reasonCancel.scenario";
import ReasonCancelLocator from "./reasonCancel.locator";


export default class ReasonCancelPage extends BasePosLitePage implements ReasonCancelScenario {


    pageUrl = (): string => this.urls.get.catalogue.reasonCancelUrl;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(ReasonCancelLocator.reasonCancelAddButton),
            Element.ofSelector(ReasonCancelLocator.reasonCancelSearchBar),
            Element.ofSelector(ReasonCancelLocator.reasonCancelStatusDropdown),

        ];
    }


}