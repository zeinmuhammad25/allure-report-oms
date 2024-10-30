import PromotionListScenario from "./promotionList.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class PromotionListComponent extends BaseOmsPage implements PromotionListScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        throw new Error("Method not implemented.");
    }

}