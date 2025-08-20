import BaseScenario from "../../../../../base/base-scenario";

export default interface PromotionListScenario extends BaseScenario {
    searchPromotion(keyword: string): Promise<void>;

    selectPromotion(promotionName: string, value?: number): Promise<void>;

    selectPromotionType(promotionType: string): Promise<void>;

    selectPromotionDetail(promotionName: string): Promise<void>;

    applyInputQtyPromoItem(value: number): Promise<void>;

    applyAllQtyPromoItem(): Promise<void>;

    gotoPromotionPage(type: "first" | "previous" | "next" | "last"): Promise<void>;

    selectPromotionListCategory(category: "GENERAL" | "CONDITIONAL"): Promise<void>;
}