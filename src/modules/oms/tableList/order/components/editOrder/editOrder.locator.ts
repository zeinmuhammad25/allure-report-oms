import BaseLocator from "../../../../../../base/base-locator";

export default class EditOrderLocator extends BaseLocator {

    static inputQtyMenu = "//input[@placeholder='e.g. 1']";
    static inputNotesMenu = "//textarea[@class='form-control input-text-notes ng-untouched ng-pristine ng-valid']";
    static getLocatorActionButtonFooter = (actionName: string): string => `//button[span[normalize-space()='${actionName}']]`;
    static buttonClearNotesMenu = "//span[normalize-space()='Clear']";
    static buttonArrowLeft = "//div[@class='d-flex justify-content-end']//i[@class='glyphicon glyphicon-arrow-left']";
    static buttonArrowRight = "//div[@class='d-flex justify-content-end']//i[@class='glyphicon glyphicon-arrow-right']";
    static buttonArrowUp = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-up']";
    static buttonArrowDown = "//div[@class='d-flex']//i[@class='glyphicon glyphicon-arrow-down']";
    static buttonSelectPromotionType = "//div[@class='mat-select-value']";
    static searchPromotionMenu = "//input[@placeholder='Search....']";
    static searchMenuPackage = "//input[@placeholder='Search menu']";
    static promotionType = (promoTypeName: string): string => `//span[normalize-space()='${promoTypeName}']`;
    static QtyMenu = (qtyMenu: number): string => `//span[normalize-space()='${qtyMenu}']`;
}
