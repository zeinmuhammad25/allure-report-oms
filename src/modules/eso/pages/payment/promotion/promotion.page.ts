import Element from "../../../../../base/objects/Element";
import BaseEsoPage from "../../../base/base-eso-page";
import PromotionScenario from "./promotion.scenario";
import PromotionLocator from "./promotion.locator";


export default class PromotionPage extends BaseEsoPage implements PromotionScenario {

    private apiPaymentValidate: string = '/eso-api/web/qsv1/payment/validate';
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromotionLocator.searchField)
        ]
    }

    async searchPromo(promoName: string): Promise<void> {
        await this.expectVisible(PromotionLocator.searchField);
        await this.fill(PromotionLocator.searchField, promoName);
        await this.expectVisible(PromotionLocator.applySearchButton);
        await this.click(PromotionLocator.applySearchButton);
    }

    async selectPromo(promoName: string): Promise<void> {
        await this.expectVisible(PromotionLocator.promoCard(promoName));
        await this.click(PromotionLocator.promoCard(promoName));
        await this.expectVisible(PromotionLocator.promotionDialogUseButton);
        await this.click(PromotionLocator.promotionDialogUseButton);
    }

    async selectPromoAndCancel(promoName: string): Promise<void> {
        await this.expectVisible(PromotionLocator.promoCard(promoName));
        await this.click(PromotionLocator.promoCard(promoName));
        await this.expectVisible(PromotionLocator.promotionDialogBackButton);
        await this.click(PromotionLocator.promotionDialogBackButton);
    }

    async applyPromo(): Promise<void> {
        await this.expectVisible(PromotionLocator.applyPromotionButton);
        await this.click(PromotionLocator.applyPromotionButton);
    }

    async goBack(): Promise<void> {
        throw new Error("Method not implemented.");
    }

}