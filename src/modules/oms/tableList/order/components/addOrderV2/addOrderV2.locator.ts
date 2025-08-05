import BaseLocator from "../../../../../../base/base-locator";
import MenuList from "../../../../objects/menuList";

export default class AddOrderV2Locator extends BaseLocator {
    static popUpAddOrder: string = "//mat-dialog-container//app-menu-edit-v2[@class='ng-star-inserted']";
    static InputQty: string = "//input[@class='qty-input ng-valid ng-star-inserted ng-dirty ng-touched']";
    static plusQtyPackageHead: string = "//button//span[contains(text(),'+')]";
    static minusQtyPackageHead: string = "//button//span[contains(text(),'-')]";

    static buttonSelectPackage = (menuName: string): string =>
        `//div[contains(@class, 'menu-package-group')]//span[starts-with(normalize-space(), '${menuName}')]`;
    static buttonSelectCategoryMenuExtra = (categoryExtra: MenuList): string => `//app-grid-package-v2//div//span[contains(text(),'${categoryExtra}')]`;
    static filedSearchV2: string = "//input[@placeholder='Search menu']";
    static nextPagePackageList: string = "//img[@src='assets/images/icon-chevron-single-right.png']";
    static backPagePackageList: string = "//div[@class='cdk-overlay-container']//div[@class='d-flex flex-column']//button[1]";
    static upPagePackageItemList: string = "//span//img[@class='prev-paginator-img']";
    static downPagePackageItemList: string = "//span//img[@class='next-paginator-img']";

    private static qtyButtonDetailMenu = (menuName: string, symbol: string): string =>
        `//div[span[normalize-space()='${menuName}']]/following-sibling::*//button[contains(@class, 'qty-btn')]//span[normalize-space()='${symbol}']`;
    static plusQtyPackageDetail = (menuName: string): string => this.qtyButtonDetailMenu(menuName, "+");
    static minusQtyPackageDetail = (menuName: string): string => this.qtyButtonDetailMenu(menuName, "-");

    private static buttonFunction = (label: string): string =>
        `//button[.//span[normalize-space()='${label}']]`;
    private static buttonFunctionDisabled = (label: string): string =>
        `//button[@disabled and .//span[normalize-space()='${label}']]`;
    static buttonNext: string = this.buttonFunction("Next");
    static disableButtonNext: string = this.buttonFunctionDisabled("Next");
    static buttonAddToCart: string = this.buttonFunction("Add to cart");
    static buttonCancel: string = this.buttonFunction("Cancel");
    private static buttonNotesFunction = (menuName: string, label: string): string =>
        `//div[span[normalize-space()='${menuName}']]/following-sibling::*//button[.//span[normalize-space()='${label}']]`;

    static notesDetailMenu = (menuName: string): string => this.buttonNotesFunction(menuName, "Notes");
    static disableNotesDetailMenu: string = this.buttonFunctionDisabled("Notes");
    static fieldNotesDetailMenu: string = "//app-menu-notes-v2//textarea";
    static fieldNotesDetailMenuDisabled: string = "//app-menu-notes-v2//textarea[@disabled]";
    static popUpNotesDetailMenu: string = "//app-menu-notes-v2";
    static addNotesMenu: string = this.buttonFunction("Add Menu Notes");
    static addDisabledNotesMenu: string = this.buttonFunctionDisabled("Add Menu Notes");
    static fieldNotesMenu: string = "//app-menu-edit-v2//textarea";
    static fieldNotesMenuDisabled: string = "//app-menu-edit-v2//textarea[@disabled]";
    static popUpNotesMenu: string = "//app-menu-edit-v2";
    static buttonApplyNotes: string = "//span[@class='mat-button-wrapper'][normalize-space()='Confirm']";
    static buttonBackNotes: string = "//span[@class='mat-button-wrapper'][normalize-space()='Back']";
    static buttonPromotion: string = this.buttonFunction("Apply Promo");

    static addOrderSearchPromotion: string = "//input[@placeholder='Search Promo']";
    static addOrderPromotionType: string = "//div[@class='mat-select-arrow-wrapper']";
    static addOrderPromotionTypeList = (typeName: string) => `//span[@class='mat-option-text'][normalize-space()='${typeName}']`;
    static addOrderPromotionName = (promotionName: string) => `//td[normalize-space()='${promotionName}']`;
    static buttonNextPromotionList = "//mat-icon[normalize-space()='chevron_right']";
    static buttonBackPromotionList = "//mat-icon[normalize-space()='chevron_left']";
    static buttonApplyPromotion: string = this.buttonFunction("Apply");
    static buttonBackPromotion: string = this.buttonFunction("Back");

}