import BaseScenario from "../../../../../base/base-scenario";

export default interface PromotionScenario extends BaseScenario {
    goBack(): Promise<void>

    searchPromo(promoName: string): Promise<void>

    selectPromo(promoName: string): Promise<void>

    selectPromoAndCancel(promoName: string): Promise<void>

    applyPromo(): Promise<void>
}