import PromotionListScenario from "./promotionList.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";


export default class PromotionListComponent extends BaseOmsPage implements PromotionListScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [];
    }

    async searchPromotion(keyword: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectPromotion(promotionID: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async selectPromotionType(promotionType: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    async gotoPromotionPage(type: "first" | "previous" | "next" | "last"): Promise<void> {
        throw new Error("Method not implemented.");
    }


}