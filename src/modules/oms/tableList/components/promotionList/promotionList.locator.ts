import BaseLocator from "../../../../../base/base-locator";

export default class PromotionListLocator extends BaseLocator {
    static closeButton: string = "//app-promo-edit//button[normalize-space()='Close']";
    static removeButton: string = "//app-promo-edit//button[normalize-space()='Remove Promotion']";
    static escapeKeyboardPromotion: string = "//app-promo-edit//h4[normalize-space()='Promotion List']";
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
    static binField: string = `//app-promo-table//input[@placeholder='Enter a valid BIN']`;
    static btnBinCheck: string = `//app-promo-table//button[normalize-space()='Check']`;
    static btnBinCancel: string = `//app-promo-table//button[img[@src='assets/images/close-bin.png']]`;
    static promotionByName = (promotionName: string) => `//tr//td[normalize-space()='${promotionName}']`;
    static promotionItemPopUp: string = "//app-promo-item-edit[@class='ng-star-inserted']//div//div[@class='modal-header bg-primary']";
    static promotionItemPlusButton: string = "//span[normalize-space()='+']";
    static promotionItemMinusButton: string = "//span[normalize-space()='-']";
    static promotionItemFieldQty: string = "//input[@placeholder='e.g. 1']";
    static promotionItemApplyAllButton: string = "//span[normalize-space()='Apply All']";
    static promotionItemApplyButton: string = "//button[@class='btn-action apply-all-edit-menu mat-raised-button mat-primary']//span[normalize-space()='Apply']";
    static promotionListCategory = (category: "GENERAL" | "CONDITIONAL"): string => `//button//span[contains(text(),'${category}')]`;

}