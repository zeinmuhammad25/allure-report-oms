import BaseLocator from "../../../../../base/base-locator";

export default class PromotionListLocator extends BaseLocator {
    static closeButton: string = "//app-promo-edit//button[normalize-space()='Close']";
    static removeButton: string = "//app-promo-edit//button[normalize-space()='Remove Promotion']";
    static applyButton: string = "//app-promo-edit//button[normalize-space()='Apply']";
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-promo-edit//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static promotionTypeDropdown: string = "//app-promo-edit//mat-select";
    static promotionTypeOption = (type: string): string => `//mat-option//span[normalize-space()='${type}']`;
    static searchPromoField: string = `//app-promo-table//input`;
}