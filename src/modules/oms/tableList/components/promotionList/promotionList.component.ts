import PromotionListScenario from "./promotionList.scenario";
import BaseOmsPage from "../../../base-oms-page";
import Element from "../../../../../base/objects/Element";
import PromotionListLocator from "./promotionList.locator";


export default class PromotionListComponent extends BaseOmsPage implements PromotionListScenario {
    pageUrl: () => string;

    shouldHave(): Element[] {
        return [
            Element.ofSelector(PromotionListLocator.paginationButton("first")),
            Element.ofSelector(PromotionListLocator.paginationButton("last")),
            Element.ofSelector(PromotionListLocator.paginationButton("next")),
            Element.ofSelector(PromotionListLocator.paginationButton("previous"))
        ];
    }

    async searchPromotion(keyword: string): Promise<void> {
        await this.wait(800);
        await this.expectVisible(PromotionListLocator.searchPromoField);
        await this.fill(PromotionListLocator.searchPromoField, keyword);
    }

    private formatNumber(value: number): string {
        const number = parseInt(value.toString(), 10);
        return new Intl.NumberFormat("de-DE").format(number);
    };

    async selectPromotion(promotionName: string, value?: number): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionByName(promotionName));
        await this.click(PromotionListLocator.promotionByName(promotionName));
        await this.wait(200);
        const hasOpenBillDialog = await this.isVisible(PromotionListLocator.openBillDiscountPanel);
        if (hasOpenBillDialog && typeof value === "number") {
            await this.expectVisible(PromotionListLocator.openBillDiscountField);
            await this.click(PromotionListLocator.openBillDiscountField);
            await this.fill(PromotionListLocator.openBillDiscountField, this.formatNumber(value));
            await this.click(PromotionListLocator.openBillDiscountApplyButton);
        }
        await this.click(PromotionListLocator.applyButton);
    }

    async selectPromotionDetail(promotionName: string): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionByName(promotionName));
        await this.click(PromotionListLocator.promotionByName(promotionName));
        await this.wait(200);
    }

    async applyAllQtyPromoItem(): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionItemPopUp);
        await this.click(PromotionListLocator.promotionItemPopUp);
        await this.expectVisible(PromotionListLocator.promotionItemApplyAllButton);
        await this.click(PromotionListLocator.promotionItemApplyAllButton);
        await this.wait(500);
    }

    async applyInputQtyPromoItem(value: number): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionItemPopUp);
        await this.click(PromotionListLocator.promotionItemPopUp);
        await this.expectVisible(PromotionListLocator.promotionItemFieldQty);
        await this.click(PromotionListLocator.promotionItemFieldQty);
        await this.click(PromotionListLocator.promotionItemPopUp);
        await this.fill(PromotionListLocator.promotionItemFieldQty, this.formatNumber(value));
        await this.expectVisible(PromotionListLocator.promotionItemApplyButton);
        await this.click(PromotionListLocator.promotionItemApplyButton);
        await this.wait(500);
    }

    async selectPromotionType(promotionType: string): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionTypeDropdown);
        await this.click(PromotionListLocator.promotionTypeDropdown);
        await this.expectVisible(PromotionListLocator.promotionTypeOption(promotionType));
        await this.click(PromotionListLocator.promotionTypeOption(promotionType));
    }

    async gotoPromotionPage(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.click(PromotionListLocator.paginationButton(type));
    }
}