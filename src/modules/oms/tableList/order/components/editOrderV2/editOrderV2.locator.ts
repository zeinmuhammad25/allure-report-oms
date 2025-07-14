import BaseLocator from "../../../../../../base/base-locator";

export default class EditOrderV2Locator extends BaseLocator {

    static editInputQty: string = "//input[@class='qty-input ng-valid ng-star-inserted ng-dirty ng-touched']";
    static editPlusQtyPackageHead: string = "//button[@class='qty-button qty-button-active mat-stroked-button ng-star-inserted']";
    static editMinusQtyPackageHead: string = "//button[@class='qty-button mat-stroked-button ng-star-inserted']";
    static buttonEditSelectPackage = (menuName: string): string =>
        `//div[contains(@class, 'menu-package-group-active')]//span[starts-with(normalize-space(), '${menuName}')]`;
    static fieldEditSearchPackageV2: string = "//input[@placeholder='Search menu']";
    static nextPageEditPackageList: string = "//img[@src='assets/images/icon-chevron-single-right.png']";
    static backPageEditPackageList: string = "//div[@class='cdk-overlay-container']//div[@class='d-flex flex-column']//button[1]";
    static upPageEditPackageItemList: string = "//span//img[@class='prev-paginator-img']";
    static downPageEditPackageItemList: string = "//span//img[@class='next-paginator-img']";

    private static qtyEditButtonDetailMenu = (menuName: string, symbol: string): string =>
        `//div[span[normalize-space()='${menuName}']]/following-sibling::*//button[contains(@class, 'qty-btn')]//span[normalize-space()='${symbol}']`;
    static plusEditQtyPackageDetail = (menuName: string): string => this.qtyEditButtonDetailMenu(menuName, "+");
    static minusEditQtyPackageDetail = (menuName: string): string => this.qtyEditButtonDetailMenu(menuName, "-");

    private static buttonEditNotesFunction = (menuName: string, label: string): string =>
        `//div[span[normalize-space()='${menuName}']]/following-sibling::*//button[.//span[normalize-space()='${label}']]`;
    static notesDetailMenu = (menuName: string): string => this.buttonEditNotesFunction(menuName, "Notes");
    static fieldNotesDetailMenu: string = "//app-menu-notes-v2//textarea";
    static popUpNotesDetailMenu: string = "//app-menu-notes-v2";

    private static editButtonFunction = (label: string): string =>
        `//button[.//span[normalize-space()='${label}']]`;
    private static editButtonFunctionDisabled = (label: string): string =>
        `//button[@disabled and .//span[normalize-space()='${label}']]`;
    static buttonNext: string = this.editButtonFunction("Next");
    static disableButtonNext: string = this.editButtonFunctionDisabled("Next");
    static buttonUpdate: string = this.editButtonFunction("Update");
    static buttonCancel: string = this.editButtonFunction("Cancel");
    static addNotesMenu: string = this.editButtonFunction("Add Menu Notes");
    static fieldNotesMenu: string = "//app-menu-edit-v2//textarea";
    static popUpNotesMenu: string = "//app-menu-edit-v2";
    static buttonApplyNotes: string = "//span[@class='mat-button-wrapper'][normalize-space()='Confirm']";
    static buttonBackNotes: string = "//span[@class='mat-button-wrapper'][normalize-space()='Back']";
    static buttonPromotion: string = this.editButtonFunction("Apply Promotion");
    static editOrderSearchPromotion: string = "//input[@placeholder='Search Promo']";
    static editOrderPromotionType: string = "//div[@class='mat-select-arrow-wrapper']";
    static editOrderPromotionTypeList = (typeName: string) => `//span[@class='mat-option-text'][normalize-space()='${typeName}']`;
    static editOrderPromotionName = (promotionName: string) => `//td[normalize-space()='${promotionName}']`;
    static buttonNextPromotionList = "//mat-icon[normalize-space()='chevron_right']";
    static buttonBackPromotionList = "//mat-icon[normalize-space()='chevron_left']";
    static buttonApplyPromotion: string = this.editButtonFunction("Apply");
    static buttonBackPromotion: string = this.editButtonFunction("Back");
    static inputPriceMenuOpenPrice: string = "//input[@placeholder='e.g. 1']";
    static inputCustomNameMenuOpenPrice: string = "//input[@placeholder='Input Custom Menu Name']";
    static inputNotesMenuOpenPrice: string = "//textarea[@class='form-control ng-untouched ng-pristine ng-valid']";
    static applyOpenPrice: string = "//span[normalize-space()='Apply']";
    static cancelOpenPrice: string = "//span[normalize-space()='Cancel']";

}