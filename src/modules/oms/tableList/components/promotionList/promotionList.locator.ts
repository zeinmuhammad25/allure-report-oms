import BaseLocator from "../../../../../base/base-locator";

export default class PromotionListLocator extends BaseLocator {
    static buttonClose: string = "//app-promo-edit//button[normalize-space()='Close']";
    static buttonRemove: string = "//app-promo-edit//button[normalize-space()='Remove Promotion']";
    static buttonApply: string = "//app-promo-edit//button[normalize-space()='Apply']";
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-promo-edit//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static promotionTypeDropdown: string = "//app-promo-edit//mat-select";
    static promotionTypeOption = (type: string): string => `//mat-option//span[normalize-space()='${type}']`;
}