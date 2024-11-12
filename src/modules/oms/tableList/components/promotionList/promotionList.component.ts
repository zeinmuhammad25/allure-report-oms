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
        await this.expectVisible(PromotionListLocator.searchPromoField);
        await this.fill(PromotionListLocator.searchPromoField, keyword);
    }

    async selectPromotion(promotionID: string): Promise<void> {
        // No Data need more data to simulate element
    }

    async selectPromotionType(promotionType: string): Promise<void> {
        await this.expectVisible(PromotionListLocator.promotionTypeDropdown);
        await this.click(PromotionListLocator.promotionTypeDropdown);
        await this.expectVisible(PromotionListLocator.promotionTypeOption(promotionType));
        await this.click(PromotionListLocator.promotionTypeOption(promotionType));
        await this.click(PromotionListLocator.applyButton);
    }

    async gotoPromotionPage(type: "first" | "previous" | "next" | "last"): Promise<void> {
        await this.click(PromotionListLocator.paginationButton(type));
    }
}