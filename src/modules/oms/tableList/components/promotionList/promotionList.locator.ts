import BaseLocator from "../../../../../base/base-locator";

export default class PromotionListLocator extends BaseLocator {
    static closeButton: string = "//app-promo-edit//button[normalize-space()='Close']";
    static removeButton: string = "//app-promo-edit//button[normalize-space()='Remove Promotion']";
    static openBillDiscountPanel: string = "//app-open-bill-discount";
    static openBillDiscountField: string = "//app-open-bill-discount//input";
    static openBillDiscountCancelButton: string = "(//app-open-bill-discount//button)[1]";
    static openBillDiscountApplyButton: string = "(//app-open-bill-discount//button)[2]";
    static applyButton: string = "//app-promo-edit//button[normalize-space()='Apply']";
    static paginationButton = (type: "first" | "previous" | "next" | "last"): string =>
        `//app-promo-edit//button[contains(@class, 'mat-paginator-navigation-${type}')]`;
    static promotionTypeDropdown: string = "//app-promo-edit//mat-select";
    static promotionTypeOption = (type: string): string => `//mat-option//span[normalize-space()='${type}']`;
    static searchPromoField: string = `//app-promo-table//input[@placeholder='Search....']`;
    static promotionByName = (promotionName: string) => `//tr//td[normalize-space()='${promotionName}']`;
}