import BaseLocator from "../../../../../../base/base-locator";

export default class AddOrderClassicLocator extends BaseLocator {

    static buttonPackage = (selectPackage: string): string => `//span[contains(text(),'${selectPackage}')]`;
    static fieldSearch: string = "//input[@placeholder='Search menu']";
    static buttonRefresh: string = "//i[@class='glyphicon glyphicon-repeat']";
    static nextPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-right']";
    static backPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-left']";

    static buttonNext: string = `//span[normalize-space()='Next']`;
    static buttonBack: string = `//span[normalize-space()='Back']`;
    static buttonApply: string = "//span[normalize-space()='Apply']";
    static buttonCancel: string = "//div[@class='modal-footer ng-star-inserted']//button[@type='button']//span[1]";

    //Package Menu
    private static buttonModifier = (menuName: string, icon: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-${icon}']`;
    static buttonQtyPlusByMenu = (menuName: string): string => this.buttonModifier(menuName, "plus");
    static buttonQtyMinusByMenu = (menuName: string): string => this.buttonModifier(menuName, "minus");
    static buttonAddNotesByMenu = (menuName: string): string => this.buttonModifier(menuName, "pencil");
    static fieldNotes: string = "//app-menu-notes//textarea";
    static popUpNotes: string = "//app-menu-notes";
    static buttonApplyNotes: string = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Apply']";
    static buttonCancelNotes: string = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Cancel']";

    //Promotion
    static fieldSearchPromotion: string = "//input[@placeholder='Search....']";
    static selectPromotionType = "//div[@class='mat-select-value']";
    static optionPromotionType = (promoTypeName: string): string => `//span[normalize-space()='${promoTypeName}']`;
    static promotionItemByName  = (label: string): string => `//td[normalize-space()='${label}']`;

    //Extra
    static buttonMenuExtra = (menuName: string): string => `//button[span[contains(text(), '${menuName}')]]`;
}