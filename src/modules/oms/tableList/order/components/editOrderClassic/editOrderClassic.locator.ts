import BaseLocator from "../../../../../../base/base-locator";

export default class EditOrderClassicLocator extends BaseLocator {

    static inputQtyMenu = "//input[@placeholder='e.g. 1']";
    static qtyMenu = (qtyMenu: number): string => `//app-qty-spinner//span[normalize-space()='${qtyMenu}']`;
    static inputNotesMenu = "//textarea[contains(@class, 'input-text-notes')]";
    static getLocatorActionButtonFooter = (actionName: string): string => `//button[span[normalize-space()='${actionName}']]`;
    static buttonClearNotesMenu = "//span[normalize-space()='Clear']";
    static buttonArrowLeft = "//div[@class='d-flex justify-content-end']//i[@class='glyphicon glyphicon-arrow-left']";
    static buttonArrowRight = "//div[@class='d-flex justify-content-end']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonArrowUp = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-up']";
    static buttonArrowDown = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-down']";
    static buttonCancel = "//button[contains(@class, 'btn-action') and contains(@class, 'mat-danger')]";
    static buttonNext: string = `//span[normalize-space()='Next']`;
    static buttonBack: string = `//span[normalize-space()='Back']`;
    static buttonApply: string = "//span[normalize-space()='Apply']";
    static escapeKeyboard = "//div[@class='modal-header bg-primary']";

    //Promotion
    static fieldSearchPromotion = "//input[@placeholder='Search....']";
    static selectPromotionType = "//div[@class='mat-select-value']";
    static optionPromotionType = (promoTypeName: string): string => `//span[normalize-space()='${promoTypeName}']`;
    static promotionItemByName = (label: string): string => `//td[normalize-space()='${label}']`;

    //Package Menu
    static searchMenuPackage = "//input[@placeholder='Search menu']";
    private static buttonActionMenu = (menuName: string, action: string): string =>
        `//div[span[normalize-space() = '${menuName}']]/following-sibling::div//i[@class='glyphicon glyphicon-${action}']`;
    static buttonQtyPlusByMenu = (menuName: string): string => this.buttonActionMenu(menuName, "plus");
    static buttonQtyMinusByMenu = (menuName: string): string => this.buttonActionMenu(menuName, "minus");
    static buttonAddNotesByMenu = (menuName: string): string => this.buttonActionMenu(menuName, "pencil");
    static fieldNotes: string = "//app-menu-notes//textarea";
    static popUpNotes: string = "//app-menu-notes";
    static buttonApplyNotes: string = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Apply']";
    static buttonCancelNotes: string = "//button[@type='button']//span[@class='mat-button-wrapper'][normalize-space()='Cancel']";
    static buttonRefresh: string = "//i[@class='glyphicon glyphicon-repeat']";
    static nextPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-right']";
    static backPageItemList: string = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-left']";

    //Extra Menu
    static buttonMenuExtraCategory = (menuName: string): string => `//span[contains(text(),'${menuName}')]`;
    static buttonMenuExtra = (menuName: string): string => `//button[span[contains(text(), '${menuName}')]]`;

    //Open Price
    static inputPriceMenuOpenPrice = "//input[@placeholder='e.g. 1']";
    static inputNotesMenuOpenPrice = "//textarea[@autocomplete='off']";
    static inputCustomMenuOpenPrice = "//input[@placeholder='Input Custom Menu Name']";
    static buttonApplyMenuOpenPrice = "//span[normalize-space()='Apply']";
    static buttonCancelMenuOpenPrice = "//span[normalize-space()='Cancel";

}
