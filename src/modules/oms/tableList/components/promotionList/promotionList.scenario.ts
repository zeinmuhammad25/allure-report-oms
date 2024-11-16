import BaseScenario from "../../../../../base/base-scenario";

export default interface PromotionListScenario extends BaseScenario {
    searchPromotion(keyword: string): Promise<void>;

    selectPromotion(promotionName: string, value?: number): Promise<void>;

    selectPromotionType(promotionType: string): Promise<void>;

    gotoPromotionPage(type: "first" | "previous" | "next" | "last"): Promise<void>;
}